import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { serverConn } from '../../utils';
import "../../Styles/StoreSetting.css";

class UserSetting extends Component {
    /*
    This is StoreSetting Page, user should be able to:
        1. change account information
        2. change store information
    */
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        this.allCookies = this.cookies.getAll();
        this.state = {name: this.allCookies['name']
                    , mail: this.allCookies['mail']
                    , phone: this.allCookies['phone']
                    , pwd: this.allCookies['pwd']
                    , errMsg: ''};
    }
    handleSubmit = async() => {
        let data = {mail: this.state.mail, pwd: this.state.pwd, phone: this.state.phone};
        let response = await serverConn('api/user/settings', data);
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
                <h1>使用者基本資料設定</h1>
                <div className="formContainer">
                    <form>
                        <div className="formBlock">
                            <label>名字</label>
                            <input type="text" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} disabled/>
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

export default UserSetting;