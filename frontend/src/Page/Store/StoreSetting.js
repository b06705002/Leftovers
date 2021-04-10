import React, { Component } from 'react';
import "../../Styles/StoreSetting.css";

class StoreSetting extends Component {
    /*
    This is StoreSetting Page, user should be able to:
        1. change account information
        2. change store information
    */
    render() {
        return (
            <div className="Container setting">
                <h1>店家基本資料設定</h1>
                <div className="formContainer">
                    <form>
                        <div className="formBlock">
                            <label>店名</label>
                            <input type="text" />
                        </div>
                        <div className="formBlock">
                            <label>連絡電話</label>
                            <input type="text" />
                        </div>
                        <div className="formBlock">
                            <label>電子郵件</label>
                            <input type="text" />
                        </div>
                        <div className="formBlock">
                            <label>地址</label>
                            <input type="text" />
                        </div>
                        <div className="formBlock">
                            <label>其他</label>
                            <input type="text" />
                        </div>
                        <button type="button">送出</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default StoreSetting;