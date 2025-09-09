type commandtype = "node" | "python";

export interface serverconfigtype {
  command: commandtype;
  args: string[];
  env?: Record<string, string>;
}

export interface ToolDescription {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
}

export interface ToolDecision {
  tool: string;
  arguments: Record<string, unknown>;
}

export interface AgentResult {
  toolUsed: string;
  toolArgs: Record<string, unknown>;
  toolResult: unknown;
  finalAnswer: string;
}
