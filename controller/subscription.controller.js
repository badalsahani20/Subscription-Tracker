import Subscription from "../models/subscription.model.js";
export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}

export const getUserSubscription = async (req, res, next) => {
    try {
        // check if the user is the same as the user that created the subscription
        if(req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this subscription');
            error.statusCode = 401; // Unauthorized
            throw error;
        }

        const subscription = await Subscription.find({user: req.params.id});

        if(!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404; // Not Found
            throw error;
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}

// TODO: update subscription, cancel subscription, delete subscription, getAllSubscriptions, getUpcomingRenewals