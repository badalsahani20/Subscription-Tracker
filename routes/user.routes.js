import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", (res, req) => {
  res.send({ title: "GET all users" });
});

userRouter.get("/:id", (res, req) => {
  res.send({ title: "GET user details" });
});
userRouter.post("/", (res, req) => {
  res.send({ title: "CREATE new user" });
});
userRouter.put("/:id", (res, req) => {
  res.send({ title: "UPDATE user" });
});
userRouter.delete("/:id", (res, req) => {
  res.send({ title: "DELETE user" });
});

export default userRouter;
