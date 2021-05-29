import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { serverConn } from '../../utils';
import "../../Styles/StoreSetting.css";
import Modal from 'react-modal';
import {Redirect} from 'react-router-dom';

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
                    , old_pwd: ''
                    , new_pwd: ''
                    , con_pwd: ''
                    , errMsg: ''
                    , changePwd: false
                    , redirect: false};
    }
    handleSubmit = async() => {
        let data = {mail: this.state.mail, phone: this.state.phone};
        let response = await serverConn('/api/store/settings', data);
        if(response.msg === 'success') {
            console.log('success');
            alert("更改成功");
            this.props.setCookies({phone: this.state.phone});
            this.setState({redirect: true})
        }
        else {
            console.log('fail');
            alert("更改失敗");
            this.setState({redirect: true});
        }
    }
    handleChangePwd = async() => {
        if(this.state.new_pwd !== this.state.con_pwd) {
            return;
        }
        let data = {mail: this.state.mail, old_pwd: this.state.old_pwd, new_pwd: this.state.new_pwd};
        let response = await serverConn('/api/store/password', data);
        if(response.msg === 'success') {
            alert("更改密碼成功");
        }
        else {
            alert("更改密碼失敗");
        }
        this.setState({changePwd: false, redirect: true})
    }
    render() {
        if(this.state.redirect) {
            return <Redirect to="/" />
        }
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
                        <button type="button" onClick={this.handleSubmit}>送出</button>
                        <button type="button" onClick={() => this.setState({changePwd: true})}>修改密碼</button>
                    </form>
                    <Modal 
                        isOpen={this.state.changePwd}
                        ariaHideApp={false}
                        onRequestClose={() => this.setState({changePwd: false})}
                        onAfterClose={() => this.setState({old_pwd: '', new_pwd: '', con_pwd: ''})}
                        >
                            <form>
                                <div className="formBlock">
                                    <label>原密碼</label>
                                    <input type="password" value={this.state.old_pwd} onChange={(event) => this.setState({old_pwd: event.target.value})} />
                                </div>
                                <div className="formBlock">
                                    <label>新密碼</label>
                                    <input type="password" value={this.state.new_pwd} onChange={(event) => this.setState({new_pwd: event.target.value})} />
                                </div>
                                <div className="formBlock">
                                    <label>確認密碼</label>
                                    <input type="password" value={this.state.con_pwd} onChange={(event) => this.setState({con_pwd: event.target.value})} />
                                </div>
                                <div>
                                    {this.state.new_pwd === this.state.con_pwd ? "" : "密碼不一致"}
                                </div>
                                <button type="button" onClick={this.handleChangePwd}>送出</button>
                            </form>
                    </Modal>
                </div>
                <div>{this.state.errMsg}</div>
            </div>
        );
    }
}

export default StoreSetting;