import React, { Component } from 'react';
import "../../Styles/StoreAddCase.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormCaseItem from "../../Component/FormCaseItem";
import { serverConn } from '../../utils';
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';
import { FormattedMessage } from "react-intl";

class StoreAddCase extends Component {
    /*
    This is StoreAddCase Page, user should be able to:
        1. add new item and amout of item
    */
    constructor(props) {
        super(props);
        this.state = {formCaseItems: [], errMsg: "", redirect: false, loading: false};
        // this.handleAdd = this.handleAdd.bind(this);
    }
    componentDidMount() {
        var list = this.state.formCaseItems;
        list.push(<FormCaseItem />);
        this.setState({formCaseItems: list});
    }
    load_pic = async() => {
        const reader = new FileReader();
        const file = document.getElementById('AC_pic').files[0];
        if(file) {
            return new Promise((resolve, reject) => {
                reader.onload = () => {
                    resolve(reader.result);
                }
                reader.onerror = () => {
                    reader.abort();
                    reject(new Error('Error when loading file'));
                }
                reader.readAsDataURL(file);
            })
        }
        return;
    }

    // submit form data to server
    handleSubmit = async() => {
        let item = document.getElementById('AC_item').value;
        let amout = document.getElementById('AC_amount').value;
        let price = document.getElementById('AC_price').value;
        let due = document.getElementById('AC_due').value;
        // let pic = document.getElementById('AC_pic').files[0];
        let pic = await this.load_pic();
        let cookies = new Cookies();
        let data = {item: item, 
                    amount: parseInt(amout), 
                    price: parseInt(price),
                    due: due,
                    pic: pic,
                    store: cookies.get('store'),
                    apid: cookies.get('apid'),
                    LaL: cookies.get('LaL'), 
                    phone: cookies.get('phone'),
                    address: cookies.get('address')};
        this.setState({loading: true});
        let response;
        try {
            response = await serverConn('/api/store/addGoods', data);
        } catch(error) {
            console.log('error has occurred when submitting form to server', error);
        }
        this.setState({loading: false});
        
        if(response.msg === "success") {
            alert('成功送出');
            this.setState({redirect: true});
        }
        else {
            alert('請檢查您的資料然後再試一次');
            this.setState({redirect: true});
            window.history.replaceState({}, '', '/');
        }
    }
    render() {
        if(this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div className="Container addCase">
                <h1><FormattedMessage id="sAdd.add" defaultMessage="新增一筆媒合資訊"/></h1>
                <div className="formContainer">
                    <form>
                        <FormCaseItem />
                        {/* <button type="button" onClick={this.handleAdd}>新增食物</button> */}
                        <div className="errMsg">
                            {this.state.errMsg}
                        </div>
                        <button type="button" onClick={this.handleSubmit} disabled={this.state.loading}>
                            <FormattedMessage id="sAdd.submit" defaultMessage="送出"/> 
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default StoreAddCase;