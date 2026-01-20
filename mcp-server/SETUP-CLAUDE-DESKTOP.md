# Setup MongoDB MCP Server with Claude Desktop

## Prerequisites

1. **Install Claude Desktop**: Download from [claude.ai/download](https://claude.ai/download)
2. **MongoDB Running**: Make sure MongoDB is running on your machine
   ```bash
   # Check if MongoDB is running
   mongosh --eval "db.version()"
   ```

## Configuration Steps

### 1. Locate Claude Desktop Config File

The config file location depends on your OS:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

### 2. Edit the Configuration File

Open the config file and add your MongoDB MCP server:

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "node",
      "args": [
        "/Users/daya/Daya/UI/TD-B1-0921/mcp-server/server.js"
      ]
    }
  }
}
```

**Important**: Replace the path with the absolute path to your `server.js` file.

### 3. Restart Claude Desktop

Close and reopen Claude Desktop for the changes to take effect.

### 4. Verify the Connection

In Claude Desktop, you should see a 🔨 (hammer) icon indicating MCP tools are available. Click it to see:
- mongo_connect
- mongo_find
- mongo_insert
- mongo_update
- mongo_delete
- mongo_aggregate
- mongo_list_collections

## Using the MCP Server in Claude Desktop

Once configured, you can chat naturally with Claude and it will use the MongoDB tools automatically:

### Example Conversations:

**You**: "Connect to MongoDB at mongodb://localhost:27017 and use the database 'testdb'"

**Claude**: Will execute `mongo_connect` tool and confirm connection

---

**You**: "Insert a user with name 'Alice', age 28, and email 'alice@example.com' into the users collection"

**Claude**: Will execute `mongo_insert` tool with the data

---

**You**: "Show me all users where age is greater than 25"

**Claude**: Will execute `mongo_find` tool with the query

---

**You**: "List all collections in the current database"

**Claude**: Will execute `mongo_list_collections` tool

## Troubleshooting

### MCP Server Not Showing Up

1. Check the config file path is correct
2. Verify the absolute path to `server.js` in the config
3. Make sure the `node` command is in your PATH
4. Check Claude Desktop logs:
   - macOS: `~/Library/Logs/Claude/`
   - Windows: `%APPDATA%\Claude\logs\`

### Connection Errors

- Ensure MongoDB is running: `mongosh`
- Check the MongoDB URI is correct
- Verify network/firewall settings

### Permissions Issues

On macOS, you might need to grant permissions:
```bash
chmod +x /Users/daya/Daya/UI/TD-B1-0921/mcp-server/server.js
```

## Alternative: Using MCP Inspector for Testing

If you want to test without Claude Desktop:

```bash
npm run inspector
```

This opens a web interface where you can test all the tools manually.

## Example Configuration with Multiple MCP Servers

You can add multiple MCP servers to Claude Desktop:

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "node",
      "args": [
        "/Users/daya/Daya/UI/TD-B1-0921/mcp-server/server.js"
      ]
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/daya/Documents"
      ]
    }
  }
}
```

## Notes

- **ChatGPT** does not support MCP servers (as of January 2026)
- **Claude Desktop** is the primary consumer of MCP servers
- Other MCP-compatible clients may become available in the future
- The MCP server runs as a subprocess when you chat with Claude

## See Also

- [DEMO-PROMPTS.md](DEMO-PROMPTS.md) - Example prompts to try
- [MCP Documentation](https://modelcontextprotocol.io/)
