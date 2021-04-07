import { Component } from "react";

class CaseItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li onClick={this.props.onClick}>
                <h3>{this.props.store}</h3>
                <p>{this.props.item}</p>
                <p>{this.props.time}</p>
            </li>
        )
    }
}

export default CaseItem;