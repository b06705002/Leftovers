import React, { Component } from "react";
import "../Styles/Nav.css";
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
    render() {
        return (
            <div className="navContainer">
                <NavItem path={"/"} text="主畫面"/>
                <NavItem path={"/store-setting"} text="基本資料設定"/>
                <NavItem path={"/store-history"} text="過去媒合資訊"/>
                <NavItem path={"/store-browse-case"} text="公開媒合資訊"/>
                <NavItem path={"/store-add-case"} text="新增媒合資訊"/>
            </div>
        );
    }
}

export default Nav;