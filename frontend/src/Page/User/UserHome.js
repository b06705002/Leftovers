import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../../Styles/StoreHome.css";
import Plate from "../Picture/plate.png";
// import Store from "../Picture/store.png";
import Product from "../Picture/product.png";
import Order from "../Picture/order.png";
import Person from "../Picture/person.png";
import Main from "../Picture/main.jpg";



class UserHome extends Component {
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
        this.store = this.cookies.get('store');
        this.name = this.cookies.get('name');
        console.log('at home', this.cookies.getAll());
    }
    render() {
        return (
            <div className="Container home">
                
                <img className="main-user" src={Main} alt="main"></img>
                {/* <h1>主畫面</h1> */}
                
                <div className="square_container-user">
                    <div className="square-user">
                        <a className="square_link" href="/user-search-case">
                            <img className="plate" src={Plate} alt="plate"></img>
                            <h3>查詢即期品</h3>
                        </a>
                    </div>

                    <div className="square-user">
                        <a className="square_link" href="/user-browse-case"> 
                        {/* href to be modified  */}
                            <img className="product" src={Product} alt="product"></img>
                            <h3>預定/追蹤的即期品</h3>
                        </a>
                    </div>

                    <div className="square-user">
                        <a className="square_link" href="/user-history"> 
                            <img className="order" src={Order} alt="order"></img>
                            <h3>歷史訂單紀錄</h3>
                        </a>
                    </div>

                    <div className="square-user">
                        <a className="square_link" href="/user-setting">
                            <img className="person" src={Person} alt="person"></img>
                            <h3>{this.store ? this.store : this.name} 資料設定</h3>
                        </a>
                    </div>
                </div>
                
            </div>

            
        );
    }
}

export default UserHome;
