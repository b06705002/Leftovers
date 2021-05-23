import React, { Component } from "react";
import "../Styles/StoreNav.css";
import NavItem from "../Component/NavItem";

/*
This is a fixed navigation bar located at the left of the website.
There links in the navigation bar that allow users to navigate between 
different page.
*/

class UserNav extends Component {
    constructor(props) {
        super(props);
        this.state = {clicked: 0};
    }
    render() {
        return (
            <nav className="navContainer">
                <div className="leftover">
                    <h3>剩杰食堂</h3>
                </div>
                <ul className="nav-links">
                    <NavItem path={"/"} text="主畫面"/>
                    <NavItem path={"/user-setting"} text="基本資料設定"/>
                    <NavItem path={"/user-search-case"} text="搜尋媒合店家"/>
                    <NavItem path={"/user-history"} text="過去媒合資訊"/>
                    <NavItem path={"/user-browse-case"} text="目前媒合資訊" />
                    {/* <NavItem path={"/user-add-case"} text="新增媒合資訊"/> */}
                    {/* <button className="navItem" onClick={this.props.handleLogout}>
                        <div>
                            <div>登出</div>
                        </div>
                    </button> */}
                    <NavItem path={"/logout"} text="登出" handleLogout={this.props.handleLogout} />
                </ul>
                {/* <button onClick={this.props.handleLogout}>登出</button> */}
                <div className="burger">
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        );
    }
}

export default UserNav;