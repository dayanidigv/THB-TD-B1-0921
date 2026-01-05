// ==========================================
// WORKING WITH DIRECTORIES
// ==========================================

const fs = require("fs");

console.log("=== DIRECTORIES ===\n");

// 1. Create Directory
async function createDir() {
  try {
    if (!fs.existsSync("uploads")) {
      await fs.promises.mkdir("uploads");
      console.log("✓ Directory created");
    }
    
    // Nested directories
    await fs.promises.mkdir("/Users/daya/Daya/THB/THB-TD-B1-0921/Node-js/01-Introduction/data/users/profiles", { recursive: true });
    console.log("✓ Nested directories created");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// 2. Read Directory
async function readDir() {
  try {
    const files = await fs.promises.readdir(".");
    console.log("\n✓ Files:", files.slice(0, 5).join(", "));
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// 3. Check if Directory
async function checkDir() {
  try {
    const stats = await fs.promises.stat("/Users/daya/Daya/THB/THB-TD-B1-0921/Node-js/02-Modules/01-math-module.js");
    console.log("\n✓ Is Directory:", stats.isDirectory());
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// 4. Delete Directory
async function deleteDir() {
  try {
    if (fs.existsSync("uploads")) {
      await fs.promises.rmdir("uploads");
      console.log("\n✓ Directory deleted");
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Run all
(async () => {
  // await createDir();
  // await readDir();
  // await checkDir();
  await deleteDir(); // Uncomment to delete
  console.log("\n✅ Completed!");
})();
