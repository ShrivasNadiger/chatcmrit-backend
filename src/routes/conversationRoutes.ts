import express from "express";
import { getResponse } from "../controllers/getResponse.js"; // add .js if running ESM

const conversationRouter = express.Router();

conversationRouter.route("/").put(getResponse);

export default conversationRouter;
