import React, { Component } from "react";

class CaseItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li className={this.props.caseInfo.class} onClick={this.props.caseInfo.onClick} ref={this.props.caseInfo.ref}>
                <h3>{this.props.caseInfo.store}</h3>
                <p>{this.props.caseInfo.item}</p>
                <p>{this.props.caseInfo.amount}</p>
                <p>{this.props.caseInfo.time}</p>
                {this.props.browse ? 
                    <>
                        <button onClick={()=>this.props.onChangeStatus('finish', this.props.index)}>確認</button>
                        <button onClick={()=>this.props.onChangeStatus('cancel', this.props.index)}>取消</button>
                    </>
                    :
                    <></>
                }
            </li>
        )
    }
}

export default CaseItem;