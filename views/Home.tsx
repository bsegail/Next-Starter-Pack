import View from "../components/View";
import Button from "../elements/Button";
import Form, {Fields} from "../components/Form";

const Home = () => {
    const fields = [
        {
            type: Fields.Input,
            name: 'myInput',
        }
    ]

    const onSubmit = (...args: any) => {
        console.log('values', args)
    }
    return (
        <View>
            <h1>My starter pack</h1>
            <h2>TODO:</h2>
            <ul>
                <li><del>Buttons</del></li>
                <li><del>Loading state</del></li>
                <li>Forms</li>
                <li>Mailchimp Integration</li>
                <li>Carts</li>
                <li>Payment (Stripe/PayPal)</li>
                <li>State Management</li>
                <li>CMS Service</li>
                <li>Error handling</li>
            </ul>
            <Form fields={fields} onSubmit={onSubmit}>
                <Button type='submit'>Do thing</Button>
            </Form>
        </View>
    )
}

export default Home
