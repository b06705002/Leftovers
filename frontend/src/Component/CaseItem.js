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
                <p>數量{this.props.caseInfo.amount}</p>
                <p>價錢{this.props.caseInfo.price}</p>
                <p>地址{this.props.caseInfo.address}</p>
                <img src={this.props.caseInfo.pic} width="100" height="100"></img>
                {this.props.browse ? 
                    <>
                        <button onClick={()=>this.props.onChangeStatus(this.props.index)}>確認</button>
                        {/* <button onClick={()=>this.props.onChangeStatus('cancel', this.props.index)}>取消</button> */}
                    </>
                    :
                    <></>
                }
            </li>
        )
    }
}

export default CaseItem;