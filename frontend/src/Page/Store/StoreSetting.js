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
        this.state = {store: this.allCookies['store'], name: this.allCookies['name'], phone: this.allCookies['phone'], address: this.allCookies['address'], pwd: this.allCookies['pwd']};
    }
    handleSubmit() {
    }
    render() {
        return (
            <div className="Container setting">
                <h1>店家基本資料設定</h1>
                <div className="formContainer">
                    <form>
                        <div className="formBlock">
                            <label>店名</label>
                            <input type="text" value={this.state.store} onChange={(event) => this.setState({store: event.target.value})}/>
                        </div>
                        <div className="formBlock">
                            <label>名字</label>
                            <input type="text" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})}/>
                        </div>
                        <div className="formBlock">
                            <label>連絡電話</label>
                            <input type="text" value={this.state.phone} onChange={(event) => this.setState({phone: event.target.value})}/>
                        </div>
                        <div className="formBlock">
                            <label>地址</label>
                            <input type="text" value={this.state.address} onChange={(event) => this.setState({address: event.target.value})}/>
                        </div>
                        <div className="formBlock">
                            <label>密碼</label>
                            <input type="text" value={this.state.pwd} onChange={(event) => this.setState({pwd: event.target.value})}/>
                        </div>
                        <button type="button" onClick={this.handleSubmit}>送出</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default StoreSetting;