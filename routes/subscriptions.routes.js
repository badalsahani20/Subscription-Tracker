import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getAllSubscriptions, getUserSubscription, updateSubscription, getSubscriptionDetails, deleteSubscription } from "../controller/subscription.controller.js";

const subscriptionsRouter = Router();

subscriptionsRouter.get("/", authorize, getAllSubscriptions);

subscriptionsRouter.get("/:id", authorize, getSubscriptionDetails);

subscriptionsRouter.post("/", authorize, createSubscription);

subscriptionsRouter.put("/:id",authorize, updateSubscription);

subscriptionsRouter.delete("/:id", authorize, deleteSubscription);


subscriptionsRouter.get("/user/:id", authorize, getUserSubscription);

subscriptionsRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "CANCEL subscription" });
});

subscriptionsRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET upcoming renewals" });
});

export default subscriptionsRouter;
