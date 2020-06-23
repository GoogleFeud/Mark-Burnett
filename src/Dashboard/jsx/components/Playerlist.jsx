
import Table from "./Table";

function Input(props) {
return <input defaultValue={props.value} className="inputCh" onKeyUp={e => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                props.update(props.player.id, props._key, e.target.value);
            }
}}> 
</input>;
}

function Player(props) {
    return(
        <tr>
      <th scope="row">{props.number}</th>
      {props.allProps.map(key => {
          if (props.player[key] === null || props.player[key] === undefined) return <td><Input player={props.player} _key={key} update={props.update}></Input></td>
          return <td><Input value={props.player[key]} player={props.player} _key={key} update={props.update}></Input></td>
      })}
    </tr>
    )
}


export default class PlayerList extends React.Component {
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
            cols: allProps
        }

    }

    render() {
    return(
    <React.Fragment>
    <h className="header">Players</h>
    <Table addCol={this.addCol.bind(this)} cols={this.state.cols} body={this.props.players.map((p, i) => <Player allProps={this.state.cols} number={i+1} player={p} update={this.update.bind(this)}></Player>)}>
    </Table>
</React.Fragment>
)
}

update(player, key, val) {
    this.props.app.update("players", player, key, val);
    console.log(this.props.app.changes);
}

addCol(name) {
    this.setState((prev) => {
       prev.cols.push(name);
       return prev;
    })
}
 

}
