
import Table from "./Table";

function Input(props) {
return <input defaultValue={props.value || " "} className="inputCh" onKeyUp={e => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                props.update(props.player.id, props._key, e.target.value.replace(/\s+/g,' ').trim());
            }
}} onBlur={(e) => {
    props.update(props.player.id, props._key, e.target.value);
}}> 
</input>;
}

function Player(props) {
    return(
        <tr>
      <th scope="row">{props.number}</th>
      {props.allProps.map(key => {
          if (props.player[key] === null || props.player[key] === undefined) return <td><Input player={props.player} _key={key} key={props.player.id} update={props.update}></Input></td>
          return <td><Input value={props.player[key]}  key={props.player.id} player={props.player} _key={key} update={props.update}></Input></td>
      })}
    </tr>
    )
}


export default class PlayerList extends React.PureComponent {
    constructor(props) {
        super(props);

        const allProps = [];
        for (let player of this.props.players) {
            for (let key in player) {
                if (key === "saveId") continue;
                if (!allProps.includes(key)) allProps.push(key);
            }
        }

        this.state = {
            cols: allProps,
            players: this.props.players
        }

    }

    render() {
    return(
    <React.Fragment>
    <h className="header">Players</h>
    <Table addCol={this.addCol.bind(this)} cols={this.state.cols} body={(sort) => {
        if (!this.state.players.length) return [];
        const sample = this.state.players[0][sort[0]];
        if (!sort.length) return this.state.players.map((p, i) => <Player allProps={this.state.cols} key={p.id} number={i+1} player={p} update={this.update.bind(this)}></Player>)
        return sortArr(sort[1], sort[0], this.state.players, isNaN(sample) ? "string":"number").map((p, i) => <Player key={p.id} allProps={this.state.cols} number={i+1} player={p} update={this.update.bind(this)}></Player>)
    }}>
    </Table>
    <p className="smoll">Create players using the bot on discord!</p>
</React.Fragment>
)
}

update(player, key, val) {
    this.props.app.updatePlayer(player, key, val);
}

addCol(name) {
    this.setState((prev) => {
       prev.cols.push(name);
       return prev;
    });
}
 

}

function sortArr(type, prop, arr = [], dataType = "string") {
    if (dataType === "string") {
        if (type === "asc") return arr.sort((a, b) => {
            return (a[prop] ? a[prop].toString():"").localeCompare(b[prop]);
        });
        return arr.sort((a, b) => {
            return (a[prop] ? a[prop].toString():"").localeCompare(b[prop]);
        }).reverse();
    }else if (dataType === "number") {
        if (type === "asc") return arr.sort((a, b) => a[prop] - b[prop]);
        return arr.sort((a, b) => b[prop] - a[prop]);
    }
}
