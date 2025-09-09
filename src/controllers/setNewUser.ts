import type { Request, Response } from "express";

import { users } from "../datamodels/userDataModel.js";

export async function setNewUser(req: Request, res: Response) {
  users.Create({});
}
