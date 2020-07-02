

import Playerlist from "./Playerlist";
import Tribelist from "./Tribelist";

export default function Dashboard(props) {
    return(
        <React.Fragment>
        <Playerlist app={props.app} players={props.data.players}></Playerlist>
        <Tribelist app={props.app} tribes={props.data.tribes||[]}></Tribelist>
        <hr></hr>
        </React.Fragment>
    )
}