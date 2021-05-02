import React, { Component } from "react";
import "../Styles/StoreNav.css";
import NavItem from "../Component/NavItem";


/*
This is a fixed navigation bar located at the left of the website.
There links in the navigation bar that allow users to navigate between 
different page.
*/

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {clicked: 0};
    }

    // navSlide() {
    //     const burger = document.querySelector('.burger');
    //     const nav =  document.querySelector('.nav-links');

    // }

    render() {
        return (
<<<<<<< HEAD:frontend/src/Container/Nav.js
            <nav className="navContainer">
                <div class="leftover">
                    <h3>剩杰食堂</h3>
                </div>
                <ul className="nav-links">
                    <NavItem path={"/"} text="Main"/>
                    <NavItem path={"/store-setting"} text="Self Info"/>
                    <NavItem path={"/store-history"} text="History Order"/>
                    <NavItem path={"/store-browse-case"} text="Current Order"/>
                    <NavItem path={"/store-add-case"} text="Add"/>
                </ul>
                <div class="burger">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
            </nav>
=======
            <div className="navContainer">
                <NavItem path={"/"} text="主畫面"/>
                <NavItem path={"/store-setting"} text="基本資料設定"/>
                <NavItem path={"/store-history"} text="過去媒合資訊"/>
                <NavItem path={"/store-browse-case"} text="公開媒合資訊"/>
                <NavItem path={"/store-add-case"} text="新增媒合資訊"/>
                {/* <button className="navItem" onClick={this.props.handleLogout}>
                    <div>
                        <div>登出</div>
                    </div>
                </button> */}
                <NavItem path={"/logout"} text="登出" handleLogout={this.props.handleLogout} />
                {/* <button onClick={this.props.handleLogout}>登出</button> */}
            </div>
>>>>>>> demo2Frontend:frontend/src/Container/StoreNav.js
        );
    }
}

export default Nav;