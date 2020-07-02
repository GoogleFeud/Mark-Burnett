

export default function Input(props) {
    return <input defaultValue={props.value || " "} className="inputCh" onBlur={(e) => {
            props.receive(e);
        }}></input>
}