

import Playerlist from "./Playerlist";

export default function Dashboard(props) {
    return(
        <Playerlist app={props.app} players={props.app.data.players}></Playerlist>
    )
}