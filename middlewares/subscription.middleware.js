import Subscription from "../models/subscription.model.js"

export const verifySubsCriptionOwner = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if(!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        if(subscription.user.toString() !== req.user._id.toString()){
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }
        req.subscription = subscription;
        next();
    } catch (error) {
        next(error);
    }
}