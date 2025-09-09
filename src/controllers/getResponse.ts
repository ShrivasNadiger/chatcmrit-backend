import type { Request, Response } from "express";
import { handleUserQuery } from "../llm/callLLM";
import type { AgentResult } from "../types/mcptypes";

export async function getResponse(req: Request, res: Response) {
  const query: string = req.body;
  const response: AgentResult = await handleUserQuery(query);
  res.json({
    text: response.finalAnswer,
    textSource: "bot",
  });
}
