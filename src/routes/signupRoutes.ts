import express from "express";
import { setNewUser } from "../controllers/setNewUser.js";
const signuprouter = express.Router();

signuprouter.route("/").put(setNewUser);
