import {MailchimpService} from "../../../api/mailchimp/Mailchimp";

const service = new MailchimpService()

const SubscribeRoute = async (req: any, res: any) => {
    if (req.method === 'POST') {
        await service.subscribeToList(req.body?.listId, req.body.email)
        res.send(200)
    }
}

export default SubscribeRoute
