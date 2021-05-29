import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../../Styles/StoreHome.css";
import Food from "../Picture/food.png";
// import Store from "../Picture/store.png";
import Product from "../Picture/product.png";
import Order from "../Picture/order.png";
import Order_now from "../Picture/order_now.png";
import Person from "../Picture/store.png";
import Main from "../Picture/store.jpg";


class StoreHome extends Component {
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
                <img class="main-store" src={Main} alt="main"></img>
                {/* <h1>主畫面</h1> */}
                
                <div class="square_container-store">
                    <div class="square-store">
                        <a class="square_link" href="/store-add-case">
                            <img class="food" src={Food} alt="food"></img>
                            <h3>新增即期品</h3>
                        </a>
                    </div>

                    <div class="square-store">
                        <a class="square_link" href="/store-browse-good"> 
                        {/* href to be modified  */}
                            <img class="product" src={Product} alt="product"></img>
                            <h3>現有即期品</h3>
                        </a>
                    </div>

                    <div class="square-store">
                        <a class="square_link" href="/store-browse-case"> 
                            <img class="order" src={Order_now} alt="order"></img>
                            <h3>現有媒合資訊</h3>
                        </a>
                    </div>

                    <div class="square-store">
                        <a class="square_link" href="/store-history"> 
                            <img class="order" src={Order} alt="order"></img>
                            <h3>歷史媒合紀錄</h3>
                        </a>
                    </div>

                    <div class="square-store">
                        <a class="square_link" href="/store-setting">
                            <img class="person" src={Person} alt="person"></img>
                            <h3>{this.store ? this.store : this.name} 資料設定</h3>
                        </a>
                    </div>
                </div>
                {/* <h1>店家主畫面</h1>
                <h2>歡迎回來 {this.store ? this.store : this.name}</h2> */}
            </div>
        );
    }
}

export default StoreHome;