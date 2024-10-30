import cors from "cors";
import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import http from "http";
import { WebSocket } from "ws";
import collaborationRoutes from "./routes/collaborationRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { connectToDatabase } from "./utils/database";

dotenv.config({ path: path.resolve(__dirname, "./.env") });

connectToDatabase();

const port = process.env.PORT || 3004;
const app: Express = express();

const server = http.createServer(app);

app.use(express.json());

app.use("/api/collab", collaborationRoutes);

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(errorHandler);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("New WebSocket client connected");
});

// Start the server
server.listen(port, () => {
    console.log(`Collaboration service running on http://localhost:${port}`);
});
