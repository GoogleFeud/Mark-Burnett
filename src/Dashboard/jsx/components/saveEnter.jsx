

export default class SaveEnter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
        this.input = "";
    }

    render() {
        return(
            <div className="saveBod">
                <img src="./logo.png" className="survivorLogo"></img><br></br>
                <span>Save ID:  </span> <input type="text" placeholder="ID here..." onInput={(e) => {
                    this.err("");
                    this.input = e.target.value;
                }}></input>
                <button onClick={async () => {
                    const save = await this.props.app.get(`api/saves/${this.input}`);
                    if (save.err) return this.err(save.err);
                    console.log(save);
                    this.props.app.setSaveFile(save);
                }}>Go</button>
                <p class="saveErr">{this.state.error}</p>
            </div>
        )
    }

    err(msg) {
        this.setState({error: msg})
    }

}