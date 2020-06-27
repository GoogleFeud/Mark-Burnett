

export default class ContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shown: false
        }
    }

    render() {
        const Type = this.props.type;
        return(
            <React.Fragment>
                <Type {...this.props.props} onContextMenu={(e) => {
                this.setState({shown: true});
                window.addEventListener("click", () => {
                    this.setState({shown: false});
              }, {once: true});
                e.preventDefault();
            }} onBlur={() => {
                this.setState({shown: false});
            }}>
            <span>{this.props.show}</span>
            </Type>
            {this.state.shown ? (
                    <div className="dropdown ontop" role="menu" aria-labelledby="dropdownMenu">
                    {this.props.tabs.map(t => <button className="dropdown-btn ontop" onClick={() => t.action(this.props.show)}>{t.name}</button>)}
                  </div>
            ):null}
            </React.Fragment>
        )
    }
}