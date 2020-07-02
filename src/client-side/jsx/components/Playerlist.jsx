
import Table from "./Table";
import Input from "./Input";
import util from "../util";

function Player(props) {
    return(
        <tr>
      {props.allProps.map(key => {
          let value = props.player[key];
          if (value === null || value === undefined) value = undefined;
          return <td>
              <Input value={value} receive={(e) => {
                   if (props.player[key] == e.target.value) return;
                  props.update(props.player.id, key, e.target.value)
              }}>{}</Input></td>
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
            cols: allProps,
            players: this.props.players
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.players.length !== this.props.players.length) { //deepCompareArrayOfSimilarObjects(prevProps.players, this.props.players)
            const allProps = [];
            for (let player of this.props.players) {
                for (let key in player) {
                    if (key === "saveId") continue;
                    if (!allProps.includes(key)) allProps.push(key);
                }
            }
            this.setState({players: this.props.players, cols: allProps});
        }
    }


    render() {
    return(
    <React.Fragment>
    <h className="header">Players</h>
    <button className="r-btn" onClick={() => {
        const rng = this.state.players[Math.floor(Math.random() * this.state.players.length)]
        window.alert(`Name: ${rng.name}\n\nId: ${rng.id}`);
    }}>Random</button>
    <Table context={[
        {name: "Delete", action: (colName) => {
            this.props.app.removeField("players", colName);
            this.setState((prev) => {
                prev.cols.splice(prev.cols.indexOf(colName), 1);
                return prev;
            })
        }}
    ]} addCol={this.addCol.bind(this)} cols={this.state.cols} body={(sort) => {
        if (!this.state.players.length) return [];
        const sample = this.state.players[0][sort[0]];
        if (!sort.length) return this.state.players.map((p, i) => <Player allProps={this.state.cols} key={p.id} number={i+1} player={p} update={this.update.bind(this)}></Player>)
        return util.sortArr(sort[1], sort[0], this.state.players, isNaN(sample) ? "string":"number").map((p, i) => <Player key={p.id} allProps={this.state.cols} number={i+1} player={p} update={this.update.bind(this)}></Player>)
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
