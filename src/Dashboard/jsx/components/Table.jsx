

export default class Table extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const s = this.props.cols.map(k => <td scope="col">{k}</td>);
        s.push(<td scope="col"><input defaultValue="New" className="inputCh" onKeyUp={e => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                this.props.addCol(e.target.value);
            }
        }}>
        </input></td>)
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
             {this.props.body}
         </tbody>
       </table> 
            </React.Fragment>
        )
    }
 }