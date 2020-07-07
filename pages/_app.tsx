import '../styles.scss'
import Input from "../elements/Input";
import {formService} from "../services/form/FormService";
import { RecoilRoot } from "recoil/dist";
import Select from "../elements/Select";

formService.registerFieldType({
    type: 'text',
    component: Input,
})
formService.registerFieldType({
    type: 'select',
    component: Select,
})

// This default export is required in a new `pages/_app.js` file.
const App: React.FC<{
    Component: React.FC<any>,
    pageProps: any
}> = ({ Component, pageProps }) => {
    return (
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    )
}

export default App;
