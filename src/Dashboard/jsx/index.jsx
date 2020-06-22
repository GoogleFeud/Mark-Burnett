
require('regenerator-runtime');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saveChosen: null
        }
    }

    render() {
        if (!saveChosen) {
            //
        }else {

        }
    }

    setSaveFile(file) {
        this.setState({saveChosen: file});
    }

    async get(endpoint) {
        const res = await fetch(endpoint);
        return res.json()
    }

    async post(endpoint, data) {
        Object.assign(data, {method: "POST"});
        const res = await fetch(endpoint, data);
        return res.json();
    }

    async delete(endpoint, data) {
        Object.assign(data, {method: "DELETE"});
        const res = await fetch(endpoint, data);
        return res.json();
    }

    async patch(endpoint, data) {
        Object.assign(data, {method: "PATCH"});
        const res = await fetch(endpoint, data);
        return res.json();
    }

}

window.addEventListener("load", () => {
    console.log(1);
})