import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../Styles/StoreHome.css";

class Home extends Component {
    /*
    This is Home Page, should implement:
        1. Purpose (text)
        2. Guiadance (text)
        3. Developer intro (text)
        4. Sing in (feature)
            mail, password
        5. Sign up (feature)
            5.1 Store sign up
            5.2 Customer sign up
    */
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        this.name = this.cookies.get('name');
        // console.log('at home', this.cookies.getAll());
    }
    render() {
        return (
            <div className="Container home">
                <h1>主畫面</h1>
                <h2>歡迎回來{this.name}</h2>
            </div>
        );
    }
}

export default Home;