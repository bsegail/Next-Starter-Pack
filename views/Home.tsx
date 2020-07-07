import View from "../components/View";
import Button from "../elements/Button";
import Form from "../components/Form";
import Link from "next/link";
import {atom, useRecoilState} from "recoil/dist";

export const textState = atom({
    key: 'textState',
    default: '',
})

const Home = () => {
    const [text, setText] = useRecoilState(textState);

    const fields = [
        {
            type: 'text',
            name: 'myInput',
            value: 'hi'
        },
        {
            type: 'select',
            name: 'select',
            value: 'hi',
            props: {
                options: [{ label: 'Hi', value: 'hi' }, { label: 'You', value: 'there' }]
            }
        }
    ]

    const onSubmit = (values: any) => {
        console.log('values', values)
        setText(values.myInput)
    }
    return (
        <View>
            <h1>My starter pack</h1>
            <h2>TODO:</h2>
            <ul>
                <li><del>Buttons</del></li>
                <li><del>Loading state</del></li>
                <li><del>Forms</del></li>
                <li><del>Form errors</del></li>
                <li><del>Form validation</del></li>
                <li><del>On submit doesnt accept defaults</del></li>
                <li><del>Form defaults</del></li>
                <li>Mailchimp Integration</li>
                <li>Carts</li>
                <li>Payment (Stripe/PayPal)</li>
                <li>State Management</li>
                <li>CMS Service</li>
                <li>Error handling</li>
                <li>Testing</li>
            </ul>
            <p>My text state: { text }</p>
            <Link href='/state'><a>Test state</a></Link>
            <Form fields={fields} onSubmit={onSubmit}>
                <Button type='submit'>Do thing</Button>
            </Form>
        </View>
    )
}

export default Home
