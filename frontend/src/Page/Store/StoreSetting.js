import React, { Component } from 'react';
import "../../Styles/StoreSetting.css";

class StoreSetting extends Component {
    /*
    This is StoreSetting Page, should implement:
    */
    render() {
        return (
            <div className="Container">
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