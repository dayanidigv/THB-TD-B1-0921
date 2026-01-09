// ==========================================
// MULTI-DOCUMENT TRANSACTION
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function multiDocumentTransaction() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const orders = db.collection("orders");
    const inventory = db.collection("inventory");
    const accounts = db.collection("accounts");

    // Setup
    await orders.deleteMany({});
    await inventory.deleteMany({});
    await accounts.deleteMany({});

    await inventory.insertMany([
      { productId: "P001", name: "Laptop", stock: 10, price: 1000 },
      { productId: "P002", name: "Mouse", stock: 50, price: 25 }
    ]);

    await accounts.insertOne({ 
      accountId: "CUST001", 
      customer: "Alice", 
      balance: 2000 
    });

    console.log("=== INITIAL STATE ===");
    const initInventory = await inventory.find({}).toArray();
    initInventory.forEach(i => console.log(`${i.name}: ${i.stock} units`));
    const initAccount = await accounts.findOne({ accountId: "CUST001" });
    console.log(`Customer balance: $${initAccount.balance}`);

    // COMPLEX TRANSACTION: Create Order + Update Inventory + Deduct Balance
    console.log("\n=== PLACE ORDER TRANSACTION ===");
    const session = client.startSession();

    try {
      await session.withTransaction(async () => {
        // Step 1: Create order
        const orderItems = [
          { productId: "P001", quantity: 2, price: 1000 },
          { productId: "P002", quantity: 5, price: 25 }
        ];

        const totalAmount = orderItems.reduce((sum, item) => 
          sum + (item.quantity * item.price), 0
        );

        const order = await orders.insertOne({
          orderId: "ORD001",
          customerId: "CUST001",
          items: orderItems,
          totalAmount: totalAmount,
          status: "processing",
          createdAt: new Date()
        }, { session });

        console.log(`✅ Created order: ${order.insertedId}`);

        // Step 2: Update inventory for each item
        for (const item of orderItems) {
          const result = await inventory.updateOne(
            { 
              productId: item.productId,
              stock: { $gte: item.quantity }
            },
            { $inc: { stock: -item.quantity } },
            { session }
          );

          if (result.modifiedCount === 0) {
            throw new Error(`Insufficient stock for ${item.productId}`);
          }
        }

        console.log("✅ Updated inventory");

        // Step 3: Deduct from customer balance
        const balanceResult = await accounts.updateOne(
          { 
            accountId: "CUST001",
            balance: { $gte: totalAmount }
          },
          { $inc: { balance: -totalAmount } },
          { session }
        );

        if (balanceResult.modifiedCount === 0) {
          throw new Error("Insufficient balance");
        }

        console.log("✅ Deducted from balance");

        // Step 4: Update order status
        await orders.updateOne(
          { orderId: "ORD001" },
          { $set: { status: "completed" } },
          { session }
        );

        console.log("✅ Order completed");
      });

      console.log("\n✅ Transaction successful!");

    } catch (error) {
      console.error("❌ Transaction failed:", error.message);
    } finally {
      await session.endSession();
    }

    // Verify final state
    console.log("\n=== FINAL STATE ===");
    const finalInventory = await inventory.find({}).toArray();
    finalInventory.forEach(i => console.log(`${i.name}: ${i.stock} units`));
    
    const finalAccount = await accounts.findOne({ accountId: "CUST001" });
    console.log(`Customer balance: $${finalAccount.balance}`);
    
    const finalOrder = await orders.findOne({ orderId: "ORD001" });
    console.log(`Order status: ${finalOrder?.status}`);

    console.log("\n✅ Multi-Document Transaction Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

multiDocumentTransaction();

// NOTE: This ensures all operations succeed or all fail together
