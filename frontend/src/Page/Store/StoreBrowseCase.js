import React, { Component } from 'react';
import "../../Styles/StoreBrowseCase.css";
import CaseItem from "../../Component/CaseItem";

class StoreBrowseCase extends Component {
    /*
    This is Store Browse Case Page, user should be able to:
        1. browse a list of issued, on going cases
        2. view detail of a case when click on the case
    */
    constructor(props) {
        super(props);
        this.state = {caseList: [], clicked: -1, detail: {}};
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        var list = this.state.caseList;
        for(let i=0; i<10; i++) {
            list.push({store: `store${i}`, item: `item${i}`, time: `time${i}`, onClick: this.handleClick, class: ""});
        }
        this.setState({caseList: list});
    }
    handleClick(index) {
        var list = this.state.caseList;
        var selected;
        for(let i=0; i<list.length; i++) {
            if(i != index) {
                list[i].class = "";
            }
            else {
                list[i].class = "clicked";
                selected = list[i];
            }
        }
        this.setState({caseList: list, detail: selected});
    }
    render() {
        return (
            <div className="Container browseCase">
                {/* <div>jfeowjf</div> */}
                <div className="View cases-View">
                    <div>
                        <h2>Store Case</h2>
                    </div>
                    <ul>
                        {this.state.caseList.map((item, index) => {
                            return <CaseItem store={item.store} item={item.item} time={item.time} onClick={item.onClick} class={item.class} key={index} index={index}/>;
                        })}
                    </ul>
                </div>
                <div className="View detail-View">
                    <h2>Case Detail</h2>
                    <div>
                        <h3>{this.state.detail.store}</h3>
                        <p>{this.state.detail.item}</p>
                        <p>{this.state.detail.time}</p>
                    </div>
                </div>
            </div>
        );
    }
}


export default StoreBrowseCase;