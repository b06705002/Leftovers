import React, { Component } from "react";

class CaseItem extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    render() {
        return (
            <li className={this.props.caseInfo.class} onClick={() => this.props.caseInfo.onClick(this.props.index)} ref={this.props.caseInfo.ref}>
                <h3>{this.props.caseInfo.store}</h3>
                <p>{this.props.caseInfo.item}</p>
                <p>{this.props.caseInfo.time}</p>
            </li>
        )
    }
}

export default CaseItem;