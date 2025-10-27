import Subscription from "../models/subscription.model.js";
export const createSubscription = async (req, res, next) => {
  try {
    const {name} = req.body;
    const existingSubscription = await Subscription.findOne({
      user: req.user._id,
      name,
      status: "ACTIVE",
    });

    if(existingSubscription) {
      return res.status(400).json({
        success: false,
        message: `You already have an active ${name} plan.`
      });
    }

    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    // check if the user is the same as the user that created the subscription
    if (req.user.id.toString() !== req.params.id) {
      const error = new Error("You are not the owner of this subscription");
      error.statusCode = 401; // Unauthorized
      throw error;
    }

    const subscription = await Subscription.find({ user: req.params.id });

    // Find method returns an array -> if no subscription is found -> still returns an empty array -> so we check if the array is empty
    if(subscription.length === 0) {
        const error = new Error ("No subscriptions found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

// TODO: update subscription, cancel subscription, delete subscription, getAllSubscriptions, getUpcomingRenewals

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = req.subscription;

    /*update logic - dirty way
        // if(req.body.name) {
        //     subscription.name = req.body.name.trim();
        // }

        // if(req.body.price) {
        //     subscription.price = req.body.price;
        // }

        // if(req.body.frequency) {
        //     subscription.frequency = req.body.frequency;
        // }

        // if(req.body.paymentMethod) {
        //     subscription.paymentMethod = req.body.paymentMethod;
        // }  */

    //Clean way to Update
    const updatableFields = ["name", "price", "frequency", "paymentMethod"];
    const { name, price, frequency, paymentMethod } = req.body;

    //Validate fields before saving fields
    if (price !== undefined && price < 0) {
      const error = new Error("Price should be greater than 0");
      error.statusCode = 400; // Bad Request
      throw error;
    }

    if (name && name.trim().length < 2) {
      const error = new Error(
        "Subscription name must be at least 2 character long"
      );
      error.statusCode = 400;
      throw error;
    }

    const allowedFrequencies = ["Daily", "Weekly", "Monthly", "Yearly"];
    if (frequency && !allowedFrequencies.includes(frequency.toUpperCase())) {
      const error = new Error("Invalid frequency");
      error.statusCode = 400;
      throw error;
    }

    if (paymentMethod && typeof paymentMethod !== "string") {
      const error = new Error("Payment method should be a string");
      error.statusCode = 400;
      throw error;
    }
    // Loops over every field name (like "name", "price", etc).
    updatableFields.forEach((field) => {
      // Checks if that field is present in the request body (the user is trying to update it).
      if (req.body[field] !== undefined) {
        subscription[field] = req.body[field].trim?.() || req.body[field];
      }
    });

    await subscription.save();
    res.status(200).json({
      success: true,
      data: subscription,
      message: "Subscription updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscription = await Subscription.find({
      user: req.user._id,
      status: "ACTIVE",
    });

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionDetails = async (req, res, next) => {
  try {
    const subscription = req.subscription;

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = req.subscription;

    await req.subscription.deleteOne();

    res
      .status(200)
      .json({
        success: true,
        message: "Subscription deleted successfully",
        data: subscription,
      });

  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = req.subscription;

    const { cancelAtPeriodEnd } = req.body;
    if (cancelAtPeriodEnd) {
      subscription.cancelAtPeriodEnd = true;
      subscription.status = "CANCELED";
      subscription.canceledAt = subscription.renewalDate;
    } else {
      // Cancel Immediately
      subscription.status = "CANCELED";
      subscription.canceledAt = new Date();
      subscription.cancelAtPeriodEnd = false;
    }

    await subscription.save();
    res
      .status(200)
      .json({
        success: true,
        message: cancelAtPeriodEnd
          ? "Subscription will be cancelled at the end of the current period"
          : "Subscription cancelled successfully",
        data: subscription,
      });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);

        const subscriptions = await Subscription.find({
            user: req.params._id,
            status: "ACTIVE",
            renewalDate: {$gte: now, $lte: nextWeek},
        });

        res.status(200).json({ success: true, count: subscriptions.length, data: subscriptions });
    } catch (error) {
        next(error);
    }
}
