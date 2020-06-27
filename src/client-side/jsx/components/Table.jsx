
import ContextMenu from "./contextMenu";

//first: ascending (asc)
//second descending (des)
export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: []
        }
    }

    render() {
        let s;
        if (this.props.context) {
            s = this.props.cols.map((k, id) => 
            <ContextMenu type="td" show={k} props={{
                scope: "col",
                key: id,
                onClick: () => {
                        let typ = "asc";
                        if (this.state.sort[0] === k && this.state.sort[1] === "asc") typ = "des";
                        this.setState({sort: [k, typ]})
                }
            }} tabs={this.props.context}></ContextMenu>);
        }else {
            s = this.props.cols.map((k, id) => <td scope="col" key={id} onClick={() => {
                let typ = "asc";
                if (this.state.sort[0] === k && this.state.sort[1] === "asc") typ = "des";
                this.setState({sort: [k, typ]})
            }}>{k}</td>);
        }
        s.push(<td scope="col"><input defaultValue="New" className="inputCh" key={s.length+1} onKeyUp={e => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                if (this.props.cols.includes(e.target.value)) return alert("Column already exists!");
                this.props.addCol(e.target.value);
            }
        }}>
        </input></td>)
        const p = this.props.body(this.state.sort);
        p.push()
        return(
            <React.Fragment>
               <table class="table table-striped table-bordered table-hover table-sm table-responsive">
            <thead class="thead-dark">
            <tr>
            <th scope="col">#</th>
            {s}
           </tr>
         </thead>
         <tbody>
             {this.props.body(this.state.sort)}
         </tbody>
       </table> 
            </React.Fragment>
        )
    }
 }