import React, { Component } from 'react';
import "../Styles/StoreCase.css";
import CaseItem from "../Component/CaseItem";

class StoreCase extends Component {
    f
    /*
    This is Store Case Page, should implement:
        1. Store Add Case Page
            itme, amount
        2. Store Browser Case Page
            2.1 Store Case Details Page
    */
    constructor(props) {
        super(props);
        this.state = {caseList: [], clicked: -1};
    }
    componentDidMount() {
        var list = this.state.caseList;
        for(let i=0; i<10; i++) {
            list.push({store: `store${i}`, item: `item${i}`, time: `time${i}`, onClick: this.handleClick});
        }
        this.setState({caseList: list});
    }
    handleClick(event) {
        console.log(event);
    }
    render() {
        return (
            <div className="Container">
                <div className="View cases-View">
                    <div>
                        <h2>Store Case</h2>
                    </div>
                    <ul>
                        {this.state.caseList.map((item, index) => {
                            return <CaseItem store={item.store} item={item.item} time={item.time} onClick={item.onClick} key={index}/>;
                        })}
                    </ul>
                </div>
                <div className="View detail-View">
                    <h2>Case Detail</h2>
                    <div>
                        <p>Apple</p>
                        <p>5</p>
                    </div>
                </div>
            </div>
        );
    }
}


export default StoreCase;