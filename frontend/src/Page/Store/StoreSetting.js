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
                <h1>StoreSetting Page</h1>
                <div className="formContainer">
                    <form className="formBlock">
                        <label>Store Name</label>
                        <input type="text" />
                    </form>
                    <form className="formBlock">
                        <label>Phone</label>
                        <input type="text" />
                    </form>
                    <form className="formBlock">
                        <label>Mail Address</label>
                        <input type="text" />
                    </form>
                    <form className="formBlock">
                        <label>Address</label>
                        <input type="text" />
                    </form>
                    <form className="formBlock">
                        <label>Other</label>
                        <input type="text" />
                    </form>
                </div>
            </div>
        );
    }
}

export default StoreSetting;