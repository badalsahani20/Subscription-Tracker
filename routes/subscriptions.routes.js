import { Router } from "express";

const subscriptionsRouter = Router();

subscriptionsRouter.get("/", (req, res) => {
  res.send({ title: "GET all subscriptions" });
});

subscriptionsRouter.get("/:id", (req, res) => {
  res.send({ title: "GET subscription details" });
});

subscriptionsRouter.post("/", (req, res) => {
  res.send({ title: "CREATE subscriptions" });
});

subscriptionsRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE subscriptions" });
});

subscriptionsRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE subscription" });
});


subscriptionsRouter.get("/user/:id", (req, res) => {
  res.send({ title: "GET all user subscription" });
});

subscriptionsRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "CANCEL subscription" });
});

subscriptionsRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET upcoming renewals" });
});

export default subscriptionsRouter;
