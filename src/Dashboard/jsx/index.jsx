
require('regenerator-runtime');
import SaveEnter from "./components/saveEnter";
import Dashboard from "./components/dashboard";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saveChosen: null
        }
        this.data;
        this.changes = {players: {}, tribes: {}, locations: {}}; // {players: [{id: someId, changes: {key: val} }] }
    }

    render() {
        if (!this.state.saveChosen) {
            return <SaveEnter app={this}></SaveEnter>
        }else {
            return <Dashboard app={this}></Dashboard>
        }
    }

    setSaveFile(file) {
        this.data = file;
        this.setState({saveChosen: file.save});
    }

    async get(endpoint) {
        const res = await fetch(endpoint);
        if (!res.ok) return {err: res.statusText}
        return res.json()
    }

    async post(endpoint, data) {
        Object.assign(data, {method: "POST"});
        const res = await fetch(endpoint, data);
        if (!res.ok) return {err: res.statusText}
        return res.json();
    }

    async delete(endpoint, data) {
        Object.assign(data, {method: "DELETE"});
        const res = await fetch(endpoint, data);
        if (!res.ok) return {err: res.statusText}
        return res.json();
    }

    async patch(endpoint, data) {
        Object.assign(data, {method: "PATCH"});
        const res = await fetch(endpoint, data);
        if (!res.ok) return {err: res.statusText}
        return res.json();
    }

    update(objectType, id, key, value) {
        if (this.changes[objectType][id]) this.changes[objectType][id][key] = value;
        else this.changes[objectType][id] = {[key]: value}
    }

}

window.addEventListener("load", () => {
    ReactDOM.render(<App />, document.getElementById("main"))
})