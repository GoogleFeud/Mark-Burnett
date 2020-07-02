

import Table from "./Table";
import util from "../util";


function Tribe(props) {
    return(
        <tr>
      {props.allProps.map(key => {
          let value = props.tribe[key];
          if (value === null || value === undefined) value = undefined;
          return <td>
              <Input value={value} receive={(e) => {
                   if (props.tribe[key] == e.target.value) return;
                  props.update(props.tribe.id, key, e.target.value)
              }}>{}</Input></td>
      })}
    </tr>
    )
}

export default class TribeList extends React.Component {
    constructor(props) {
        super(props);

        const allProps = [];
        for (let tribe of this.props.tribes) {
            for (let key in tribe) {
                if (key === "saveId") continue;
                if (!allProps.includes(key)) allProps.push(key);
            }
        }

        this.state = {
            cols: allProps,
            tribes: this.props.tribes
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.tribes.length !== this.props.tribes.length) { 
            const allProps = [];
            for (let tribe of this.props.tribes) {
                for (let key in tribe) {
                    if (key === "saveId") continue;
                    if (!allProps.includes(key)) allProps.push(key);
                }
            }
            this.setState({tribes: this.props.tribes, cols: allProps});
        }
    }


    render() {
    return(
    <React.Fragment>
    <h className="header">Tribes</h>
    <button className="r-btn" onClick={() => {
        const rng = this.state.tribes[Math.floor(Math.random() * this.state.tribes.length)]
        window.alert(`Name: ${rng.name}\n\nId: ${rng.id}`);
    }}>Random</button>
    <Table context={[
        {name: "Delete", action: (colName) => {
            this.props.app.removeField("tribes", colName);
            this.setState((prev) => {
                prev.cols.splice(prev.cols.indexOf(colName), 1);
                return prev;
            })
        }}
    ]} addCol={this.addCol.bind(this)} cols={this.state.cols} body={(sort) => {
        if (!this.state.tribes.length) return [];
        const sample = this.state.tribes[0][sort[0]];
        if (!sort.length) return this.state.tribes.map((p, i) => <Tribe allProps={this.state.cols} key={p.id} number={i+1} tribe={p} update={this.update.bind(this)}></Tribe>)
        return util.sortArr(sort[1], sort[0], this.state.tribes, isNaN(sample) ? "string":"number").map((p, i) => <Tribe key={p.id} allProps={this.state.cols} number={i+1} tribe={p} update={this.update.bind(this)}></Tribe>)
    }} addRow={() => {
        this.addRow();
    }}>
    </Table>
    <p className="smoll">Create players using the bot on discord!</p>
</React.Fragment>
)
}

update(tribe, key, val) {
    this.props.app.updateTribe(tribe, key, val);
}

addRow() {
    this.setState(prev => {
        prev.tribes.push({id: `tribe${util.randomId()}`})
    })
}

addCol(name) {
    this.setState((prev) => {
       prev.cols.push(name);
       return prev;
    });
}

 

}