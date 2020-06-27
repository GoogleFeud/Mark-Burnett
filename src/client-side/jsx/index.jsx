
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
                    this.setState({data: saveFile});
                }
            });
       }
        this.state = {
            saveChosen: save,
            data: {players: []}
        }
     }

     componentDidMount() {
      /**    const url = window.location.href.replace(window.location.port, "").replace(window.location.protocol, "ws")
         this.socket = new WebSocket(window.location.href.replace(/http|https/, "ws") + "ws");
         this.socket.onmessage = (data) => {
                 data = JSON.parse(data);
                 switch(data.e) {
                     case "playerUpdate": {
                        if (this.state.data.players.some(p => p.id === data.id)) this.setState(prev => {
                            const p = prev.data.players.find(p => p.id === id);
                            for (let key in data.c) {
                                p[key] = data.c[key];
                            }
                            return prev;
                        });
                     }
                 }
        } **/
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

    async post(endpoint, data = {}) {
        Object.assign(data, {method: "POST"});
        if (!data.headers) data.headers = {"Content-Type": "application/json"}
        const res = await fetch(endpoint, data);
        if (!res.ok) return {err: res.statusText}
        return res.json();
    }

    async delete(endpoint, data = {}) {
        Object.assign(data, {method: "DELETE"});
        if (!data.headers) data.headers = {"Content-Type": "application/json"}
        const res = await fetch(endpoint, data);
        if (!res.ok) return {err: res.statusText}
        return res.json();
    }

    async patch(endpoint, data = {}) {
        Object.assign(data, {method: "PATCH"});
        if (!data.headers) data.headers = {"Content-Type": "application/json"}
        const res = await fetch(endpoint, data);
        if (!res.ok) return {err: res.statusText}
        return res.json();
    }

    resolveValue(val) {
        if (!isNaN(val)) return Number.parseFloat(val);
        if (val === "true") return true;
        if (val === "false") return false;
        if (val === "null" || val === "undefined") return null;
        return val;
    }

    updatePlayer(id, key, value, internal = true) {
        value = this.resolveValue(value);
        this.setState(prev => {
            if (prev.data && prev.data.players && prev.data.players.some(p => p.id === id)) prev.data.players.find(p => p.id === id)[key] = value;
            return prev;
        });
        if (internal) return this.patch(`/api/saves/${this.state.saveChosen}/players/${id}`, {body: JSON.stringify({[key]: value})});
    }

    removeField(collection, fieldName) {
        console.log(collection, fieldName);
        return this.delete(`/api/saves/${this.state.saveChosen}/${collection}/${fieldName}`);
    }

}

window.addEventListener("load", () => {
    ReactDOM.render(<App />, document.getElementById("main"))
})