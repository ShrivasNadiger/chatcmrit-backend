import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { MCPclient } from "./mcpclient/mcpclient.js";
import conversationRoutes from "./routes/conversationRoutes.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGODB_STRING!);
const mcpclient = new MCPclient();
mcpclient.connect({
  command: "node",
  args: [
    "C:/Users/user/Desktop/chatcmrit/chatcmrit-mcpserver/src/servers/aboutCmritServer.ts",
  ],
});

app.get("/", (req, res) => {
  res.send(
    "Hello Express...  go to url : https://localhost:5000/conversation for botreply.."
  );
});

app.use("/conversation", conversationRoutes);

app.listen(port, () => {
  console.log(`Server is listening to port:http://localhost:${port}`);
});
