import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import type { serverconfigtype } from "../types/mcptypes";

export class MCPclient {
  private client: Client | null = null;

  async connect(serverlanch: serverconfigtype) {
    const transport = new StdioClientTransport({
      command: serverlanch.command,
      args: serverlanch.args,
      env: serverlanch.env,
    });

    this.client = new Client(
      { name: "mcp-clent", version: "1.0.0" },
      { capabilities: { tools: {}, resources: {}, prompts: {} } }
    );

    await this.client.connect(transport);
  }

  private get c(): Client {
    if (!this.client) throw new Error("Client not connected");
    return this.client;
  }

  async listTools() {
    const { tools } = await this.c.listTools();
    return tools;
  }

  async callTool(name: string, args: Record<string, unknown> = {}) {
    const result = await this.c.callTool({ name, arguments: args });
    return result;
  }

  async listResources() {
    const { resources } = await this.c.listResources();
    return resources;
  }

  async readResource(uri: string) {
    const res = await this.c.readResource({ uri });
    return res; // { contents: [...] }
  }

  async listPrompts() {
    const { prompts } = await this.c.listPrompts();
    return prompts;
  }
  async getPrompt(name: string, args: Record<string, string> = {}) {
    const res = await this.c.getPrompt({
      name,
      arguments: args,
    });
    return res;
  }
}
