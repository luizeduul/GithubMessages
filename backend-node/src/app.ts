import express from "express";
import cors from "cors";
import http from 'http';
import { Server } from 'socket.io'
import { routes } from "./routes";

const app = express();

app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => {
  console.log('Usuario conectado no socket', socket.id);
});

app.use(express.json());

app.use(routes);

export { serverHttp, io }
