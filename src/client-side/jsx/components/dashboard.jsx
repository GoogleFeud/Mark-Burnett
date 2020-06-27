

import Playerlist from "./Playerlist";

export default function Dashboard(props) {
    return(
        <React.Fragment>
        <Playerlist app={props.app} players={props.data.players}></Playerlist>
        <hr></hr>
        </React.Fragment>
    )
}