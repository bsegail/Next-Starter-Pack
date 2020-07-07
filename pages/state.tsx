import Home, {textState} from "../views/Home";
import {useRecoilState} from "recoil/dist";

export default function StatePage() {
    const [text, setText] = useRecoilState(textState);

    return (
        <div>
            <h1>Does state work?</h1>
            <p>Text state: {text}</p>
        </div>
    )
}
