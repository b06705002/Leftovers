import React, { Component } from 'react';
import "../../Styles/StoreAddCase.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormCaseItem from "../../Component/FormCaseItem";
import { serverConn } from '../../utils';
import Cookies from 'universal-cookie';

class StoreAddCase extends Component {
    /*
    This is StoreAddCase Page, user should be able to:
        1. add new item and amout of item
    */
    constructor(props) {
        super(props);
        this.state = {formCaseItems: [], errMsg: ""};
        // this.handleAdd = this.handleAdd.bind(this);
    }
    componentDidMount() {
        var list = this.state.formCaseItems;
        list.push(<FormCaseItem />);
        this.setState({formCaseItems: list});
    }
    // handleAdd() {
    //     var list = this.state.formCaseItems;
    //     list.push(<FormCaseItem />);
    //     this.setState({formCaseItems: list});
    // }

    // submit form data to server
    handleSubmit = async() => {
        let item = document.getElementById('AC_item').value;
        let amout = document.getElementById('AC_amount').value;
        let price = document.getElementById('AC_price').value;
        let pic = document.getElementById('AC_pic').value
        // console.log('submit', item, amout, price, pic);
        let cookies = new Cookies();
        let data = {item: item, amount: parseInt(amout), price: parseInt(price), store: cookies.get('store'), LaL: cookies.get('LaL')};
        let response = await serverConn('/api/store/addGoods', data);
        console.log('submit response', response);
        if(response.msg === "success") {
            let element = document.getElementsByClassName("errMsg")[0];
            element.classList = "errMsg success";
            this.setState({errMsg: "成功送出"});
        }
        else {
            let element = document.getElementsByClassName("errMsg")[0];
            element.classList = "errMsg failed";
            this.setState({errMsg: "請檢查您的資料然後再試一次"});
        }
    }
    render() {
        return (
            <div className="Container addCase">
                <h1>新增一筆媒合資訊</h1>
                <div className="formContainer">
                    <form>
                        <FormCaseItem />
                        {/* <button type="button" onClick={this.handleAdd}>新增食物</button> */}
                        <div className="errMsg">
                            {this.state.errMsg}
                        </div>
                        <button type="button" onClick={this.handleSubmit}>送出</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default StoreAddCase;