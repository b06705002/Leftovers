import { Component } from "react";

class CaseItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li className={this.props.class} onClick={() => this.props.onClick(this.props.index)}>
                <h3>{this.props.store}</h3>
                <p>{this.props.item}</p>
                <p>{this.props.time}</p>
            </li>
        )
    }
}

export default CaseItem;