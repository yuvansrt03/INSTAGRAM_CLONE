import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from "multer";
import http from "http";
import userRouter from "./Routers/userRouter.js";
import authrouter from "./Routers/authrouter.js";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { createPost } from "./Controllers/postController.js";
import { updateUser } from "./Controllers/userController.js";
import { createUser } from "./Controllers/authController.js";
import postRouter from "./Routers/postRouter.js";
import chatRouter from "./Routers/chatRouter.js";
import commentRouter from "./Routers/commentRouter.js";
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authrouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/chats", chatRouter);
app.use("/comments", commentRouter);

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((error) => {
    console.log({ error: error.message });
  });

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.replace(/\s/g, "");
    cb(null, filename);
  },
});

const upload = multer({ storage: multerStorage });
app.post("/auth/register", upload.single("Image"), createUser);
app.put("/users/:id", upload.single("Image"), updateUser);
app.post("/posts", upload.single("Image"), createPost);

app.get("/", (req, res) => {
  res.send("hey");
});

httpServer.listen(PORT, () => {
  console.log("listening on port ", PORT);
  io.on("connection", (socket) => {
    console.log("connected with", socket.id);
    socket.on("send-message", (data) => {
      socket.broadcast.emit("receive-message", data);
    });
    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);
    });
  });
});
// io.on("connection",(socket)=>{
//   console.log("connected with", socket.id);

// })
// })
