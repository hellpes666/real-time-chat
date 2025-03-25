import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type"],
		credentials: true,
	},
});

type UserId = string;
type SocketId = string;
const onlineUsersSocketMap: Record<UserId, SocketId> = {};

export function getReceiverSocketId(userId: UserId) {
	return onlineUsersSocketMap[userId];
}

io.on("connection", (socket) => {
	console.log("A user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId) {
		onlineUsersSocketMap[userId as UserId] = socket.id;
	}

	// send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(onlineUsersSocketMap));

	socket.on("disconnect", () => {
		console.log("A user disconnected", socket.id);
		delete onlineUsersSocketMap[userId as UserId];
		io.emit("getOnlineUsers", Object.keys(onlineUsersSocketMap));
	});
});

export { io, app, server };
