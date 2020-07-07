import axios, {AxiosInstance} from 'axios';

enum SubscriberStatus {
    Subscribed = 'subscribed',
    Unsubscribed = 'unsubscribed',
    Cleaned = 'cleaned',
    Pending = 'pending',
}

const MailchimpClient = axios.create({
    baseURL: 'https://us10.api.mailchimp.com/3.0',
    auth: {
        username: 'anystring',
        password: process.env.MAILCHIMP_API_KEY || ''
    }
})

export class MailchimpService {
    private client: AxiosInstance = MailchimpClient

    async subscribeToList(listId: string, email: string) {
        const {data} = await this.client.post(`/lists/${listId}`, {
            members: [{
                email_address: email,
                status: SubscriberStatus.Subscribed,
            }]
        });
        return data;
    }
}
