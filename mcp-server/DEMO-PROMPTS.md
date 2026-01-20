# MongoDB MCP Server - Demo AI Prompts

This file contains example prompts you can use with an AI assistant that has access to this MongoDB MCP server.

## Getting Started

### 1. Connect to MongoDB
```
Connect to MongoDB at mongodb://localhost:27017 and use the database named "testdb"
```

### 2. List Collections
```
Show me all collections in the current database
```

## Basic CRUD Operations

### Insert Documents
```
Insert a new user into the "users" collection with name "John Doe", age 30, and email "john@example.com"
```

```
Add multiple products to the "products" collection:
- Product 1: name "Laptop", price 999, category "Electronics"
- Product 2: name "Mouse", price 25, category "Electronics"
```

### Find Documents
```
Find all users in the "users" collection
```

```
Find all products in the "products" collection where category is "Electronics"
```

```
Show me the first 5 users from the "users" collection
```

```
Find users where age is greater than 25
```

### Update Documents
```
Update all users with name "John Doe" to set their age to 31
```

```
In the "products" collection, increase the price by 10% for all products in the "Electronics" category
```

### Delete Documents
```
Delete all users where age is less than 18
```

```
Remove all products from the "products" collection that have a price greater than 1000
```

## Advanced Operations

### Aggregation Pipelines
```
In the "orders" collection, group all orders by customer and calculate the total amount spent by each customer
```

```
Find the top 5 most expensive products in the "products" collection
```

```
Calculate the average age of all users in the "users" collection
```

### Complex Queries
```
Find all users who registered in the last 30 days and have made more than 3 purchases
```

```
Get all products that are either in the "Electronics" category with price less than 500, or in the "Books" category
```

## Natural Language Queries

### Using the generate_mongo_query Prompt
```
Generate a query for the "users" collection to find all active users who joined in 2024
```

```
Create a MongoDB query to find products that are out of stock and need reordering
```

```
Generate an aggregation pipeline to calculate monthly sales revenue from the "orders" collection
```

## Example Workflow

Here's a complete workflow example:

```
1. Connect to MongoDB at mongodb://localhost:27017 using database "ecommerce"

2. List all collections to see what we have

3. Insert a new product:
   - name: "Wireless Keyboard"
   - price: 79.99
   - stock: 50
   - category: "Electronics"

4. Find all products in the Electronics category

5. Update the Wireless Keyboard to reduce stock by 10

6. Calculate the total value of inventory using aggregation (price * stock for all products)

7. Delete all products where stock is 0
```

## Testing with MCP Inspector

To test these prompts with the MCP Inspector:

1. Run the inspector:
   ```bash
   npm run inspector
   ```

2. Use the tools directly in the inspector UI, or connect an AI client that supports MCP

3. Try the example prompts above to interact with your MongoDB database

## JSON Format Examples

When using the tools directly, here are the JSON formats:

### mongo_connect
```json
{
  "uri": "mongodb://localhost:27017",
  "database": "testdb"
}
```

### mongo_find
```json
{
  "collection": "users",
  "query": "{\"age\": {\"$gt\": 25}}",
  "limit": 10
}
```

### mongo_insert
```json
{
  "collection": "users",
  "document": "{\"name\": \"John Doe\", \"age\": 30, \"email\": \"john@example.com\"}"
}
```

### mongo_update
```json
{
  "collection": "users",
  "filter": "{\"name\": \"John Doe\"}",
  "update": "{\"$set\": {\"age\": 31}}"
}
```

### mongo_delete
```json
{
  "collection": "users",
  "filter": "{\"age\": {\"$lt\": 18}}"
}
```

### mongo_aggregate
```json
{
  "collection": "orders",
  "pipeline": "[{\"$group\": {\"_id\": \"$customerId\", \"total\": {\"$sum\": \"$amount\"}}}]"
}
```

## Tips for AI Prompts

- Be specific about collection names
- Use clear descriptions for what you want to find/update/delete
- For complex queries, break them down into steps
- Use the `generate_mongo_query` prompt to get help writing MongoDB queries
- Always connect to the database first before running other operations
