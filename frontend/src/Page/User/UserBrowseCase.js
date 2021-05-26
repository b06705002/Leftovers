import React, { Component } from 'react';
import "../../Styles/StoreBrowseCase.css";
import CaseItem from "../../Component/CaseItem";
import Cookies from 'universal-cookie';
import { serverConn } from '../../utils';


class UserBrowseCase extends Component {
    /*
    This is Store Browse Case Page, user should be able to:
        1. browse a list of issued, on going cases
        2. view detail of a case when click on the case
    */
    constructor(props) {
        super(props);
        this.state = {caseList: [], clicked: -1, detail: {}};
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }
    componentDidMount() {
        // var list = this.state.caseList;
        // for(let i=0; i<10; i++) {
        //     list.push({store: `資訊${i}`, item: `食物${i}`, time: `時間${i}`, onClick: this.handleClick, class: ""});
        // }
        // this.setState({caseList: list});
        this.retrieveCases();
    }
    handleClick(index) {
        var list = this.state.caseList;
        var selected;
        for(let i=0; i<list.length; i++) {
            if(i !== index) {
                list[i].class = "";
            }
            else {
                list[i].class = "clicked";
                selected = list[i];
            }
        }
        this.setState({caseList: list, detail: selected});
    }
    handleChangeStatus = async(action, index) => {
        if(action === 'finish') {
            let result = window.confirm('要確認訂單嗎');
            if(result) {
                let response = await serverConn('/api/user/caseToHistory', {id: this.state.caseList[index].id});
                if(response.msg === 'success') {
                    let list = this.state.caseList;
                    list.splice(index, 1);
                    this.setState({caseList: list});
                }
            }
        }
        else if(action === 'cancel') {
            console.log(this.state.caseList[index]);
        }
    }
    retrieveCases = async() => {
        var cookies = new Cookies();
        let mail = cookies.get('mail');
        let response = await serverConn('/api/user/showCase', {mail: mail});
        if(response.msg === 'success') {
            this.setState({caseList: response.data}, function() {
                let list = this.state.caseList;
                for(let i=0; i<list.length; i++) {
                    list.onClick = this.handleClick();
                }
                // console.log(list);
                this.setState({caseList: list})
            })
        }
    }
    render() {
        return (
            <div className="Container browseCase">
                <div className="View cases-View">
                    <div className="title">
                        <h2><br />Current Order</h2>
                    </div>
                    <ul>
                        {this.state.caseList.map((item, index) => {
                            return <CaseItem caseInfo={item} onClick={item.onClick} key={index} index={index} onChangeStatus={this.handleChangeStatus} browse/>;
                        })}
                    </ul>

                </div>
            </div>
        );
    }
}


export default UserBrowseCase;