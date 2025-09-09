// agentHandler.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MCPclient } from "../mcpclient/mcpclient";
import type {
  AgentResult,
  ToolDecision,
  ToolDescription,
} from "../types/mcptypes";

// Init Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Init MCP Client
const mcpclient = new MCPclient();

async function setupTools(): Promise<ToolDescription[]> {
  const serverTools = await mcpclient.listTools();
  return serverTools.map((tool: any) => ({
    name: tool.name,
    description: tool.description,
    input_schema: tool.inputSchema,
  }));
}

export async function handleUserQuery(query: string): Promise<AgentResult> {
  const tools = await setupTools();

  const decisionPrompt = `
  User asked: "${query}"
  You have these tools available: ${JSON.stringify(tools, null, 2)}.
  Decide which tool to call and the arguments. 
  Respond ONLY in JSON like:
  {"tool": "toolName", "arguments": {...}}
  `;

  const decisionResponse = await model.generateContent(decisionPrompt);
  const decisionText = decisionResponse.response.text().trim();

  let decision: ToolDecision;
  try {
    decision = JSON.parse(decisionText) as ToolDecision;
  } catch (err) {
    throw new Error(`LLM decision not valid JSON: ${decisionText}`);
  }

  // 3. Call the selected tool
  const toolResult = await mcpclient.callTool(
    decision.tool,
    decision.arguments
  );

  // 4. Ask Gemini again for final answer
  const finalPrompt = `
  User asked: "${query}".
  You chose tool "${decision.tool}" with args: ${JSON.stringify(
    decision.arguments
  )}.
  The tool returned: ${JSON.stringify(toolResult)}.
  Based on this, provide the final helpful answer for the user.
  `;

  const finalResponse = await model.generateContent(finalPrompt);
  const finalAnswer = finalResponse.response.text();

  return {
    toolUsed: decision.tool,
    toolArgs: decision.arguments,
    toolResult,
    finalAnswer,
  };
}
