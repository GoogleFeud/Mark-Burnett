
require('regenerator-runtime');
import SaveEnter from "./components/saveEnter";
import Dashboard from "./components/dashboard";

class App extends React.Component {
    constructor(props) {
        super(props);
        let save = localStorage.getItem("save");
        if (save) {
            this.get(`api/saves/${save}`).then(saveFile => {
                if (saveFile.err) {
                    save = null;
                    this.setState({saveChosen: null});
                    window.alert(saveFile.err);
                }else {
                    console.log(saveFile);
                    this.setState({data: saveFile});
                }
            });
       }
        this.state = {
            saveChosen: save,
            data: {players: []}
        }
     }

    render() {
        if (!this.state.saveChosen) {
            return <SaveEnter app={this} data={this.state.data}></SaveEnter>
        }else {
            return <Dashboard app={this} data={this.state.data}></Dashboard>
        }
    }

    setSaveFile(file) {
        localStorage.setItem("save", file.save.id);
        this.setState({saveChosen: file.save, data: file});
    }

    async get(endpoint) {
        const res = await fetch(endpoint);
        if (!res.ok) return {err: res.statusText}
        return res.json()
    }

    async post(endpoint, data) {
        Object.assign(data, {method: "POST"});
        if (!data.headers) data.headers = {"Content-Type": "application/json"}
        const res = await fetch(endpoint, data);
        if (!res.ok) return {err: res.statusText}
        return res.json();
    }

    async delete(endpoint, data) {
        Object.assign(data, {method: "DELETE"});
        if (!data.headers) data.headers = {"Content-Type": "application/json"}
        const res = await fetch(endpoint, data);
        if (!res.ok) return {err: res.statusText}
        return res.json();
    }

    async patch(endpoint, data) {
        Object.assign(data, {method: "PATCH"});
        if (!data.headers) data.headers = {"Content-Type": "application/json"}
        const res = await fetch(endpoint, data);
        if (!res.ok) return {err: res.statusText}
        return res.json();
    }

    updatePlayer(id, key, value) {
        if (!isNaN(value)) value = Number.parseFloat(value);
        this.setState(prev => {
            if (prev.players && prev.players[id]) prev.players[id][key] = value;
            return prev;
        })
        return this.patch(`/api/saves/${this.state.saveChosen}/players/${id}`, {body: JSON.stringify({[key]: value})});
    }

}

window.addEventListener("load", () => {
    ReactDOM.render(<App />, document.getElementById("main"))
})