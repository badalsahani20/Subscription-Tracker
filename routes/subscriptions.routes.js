import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getAllSubscriptions,
  getUserSubscription,
  updateSubscription,
  getSubscriptionDetails,
  deleteSubscription,
  cancelSubscription,
  getUpcomingRenewals,
} from "../controller/subscription.controller.js";
import { verifySubsCriptionOwner } from "../middlewares/subscription.middleware.js";

const subscriptionsRouter = Router();

subscriptionsRouter.get("/", authorize, getAllSubscriptions);

subscriptionsRouter.get("/:id", authorize, verifySubsCriptionOwner, getSubscriptionDetails); //check

subscriptionsRouter.post("/", authorize, createSubscription);

subscriptionsRouter.put("/:id", authorize, verifySubsCriptionOwner, updateSubscription); // check

subscriptionsRouter.delete("/:id", authorize, verifySubsCriptionOwner, deleteSubscription); // check

subscriptionsRouter.get("/user/:id", authorize, getUserSubscription);

subscriptionsRouter.put("/:id/cancel", authorize, verifySubsCriptionOwner,cancelSubscription); // Check

subscriptionsRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);

export default subscriptionsRouter;
