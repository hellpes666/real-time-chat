"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = exports.io = void 0;
exports.getReceiverSocketId = getReceiverSocketId;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    },
});
exports.io = io;
const onlineUsersSocketMap = {};
function getReceiverSocketId(userId) {
    return onlineUsersSocketMap[userId];
}
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
        onlineUsersSocketMap[userId] = socket.id;
    }
    // send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(onlineUsersSocketMap));
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete onlineUsersSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(onlineUsersSocketMap));
    });
});
