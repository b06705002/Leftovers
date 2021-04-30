import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { serverConn } from '../../utils';
import "../../Styles/StoreSetting.css";

class StoreSetting extends Component {
    /*
    This is StoreSetting Page, user should be able to:
        1. change account information
        2. change store information
    */
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        this.allCookies = this.cookies.getAll();
        this.state = {store: this.allCookies['store']
                    , mail: this.allCookies['mail']
                    , phone: this.allCookies['phone']
                    , address: this.allCookies['address']
                    , pwd: this.allCookies['pwd']
                    , errMsg: ''};
    }
    handleSubmit = async() => {
        let data = {mail: this.state.mail, pwd: this.state.pwd, phone: this.state.phone};
        let response = await serverConn('api/store/settings', data);
        if(response.msg === 'success') {
            console.log('success');
            this.props.setCookies({phone: this.state.phone, pwd: this.state.pwd, errMsg: ''});
        }
        else {
            console.log('fail');
            let cookies = new Cookies();
            let allCookies = cookies.getAll();
            this.setState({pwd: allCookies['pwd'], phone: allCookies['phone'], errMsg: 'Something wrong happened, please try again'});
        }
    }
    render() {
        return (
            <div className="Container setting">
                <h1>店家基本資料設定</h1>
                <div className="formContainer">
                    <form>
                        <div className="formBlock">
                            <label>店名</label>
                            <input type="text" value={this.state.store} onChange={(event) => this.setState({store: event.target.value})} disabled/>
                        </div>
                        <div className="formBlock">
                            <label>電子郵件</label>
                            <input type="text" value={this.state.mail} onChange={(event) => this.setState({mail: event.target.value})} disabled/>
                        </div>
                        <div className="formBlock">
                            <label>連絡電話</label>
                            <input type="text" value={this.state.phone} onChange={(event) => this.setState({phone: event.target.value})}/>
                        </div>
                        <div className="formBlock">
                            <label>地址</label>
                            <input type="text" value={this.state.address} onChange={(event) => this.setState({address: event.target.value})} disabled/>
                        </div>
                        <div className="formBlock">
                            <label>密碼</label>
                            <input type="text" value={this.state.pwd} onChange={(event) => this.setState({pwd: event.target.value})}/>
                        </div>
                        <button type="button" onClick={this.handleSubmit}>送出</button>
                    </form>
                </div>
                <div>{this.state.errMsg}</div>
            </div>
        );
    }
}

export default StoreSetting;