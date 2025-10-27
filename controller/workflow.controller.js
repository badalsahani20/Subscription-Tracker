import { createRequire } from 'module';
import dayjs from 'dayjs';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

import Subscription from '../models/subscription.model.js';
export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;

    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'ACTIVE') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopped workflow`);
        return;
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}