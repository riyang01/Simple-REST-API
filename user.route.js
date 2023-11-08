import { Router } from "express";
import controller from "./user.controller.js";
const userRouter = Router();

userRouter
  .get("/", controller.get)
  .post("/", controller.post)
  .put("/:id", controller.put);

export default userRouter;
