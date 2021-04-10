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
                <NavItem path={"/"} text="Home"/>
                <NavItem path={"/store-setting"} text="Setting"/>
                <NavItem path={"/store-history"} text="History"/>
                <NavItem path={"/store-browse-case"} text="Browse Case"/>
                <NavItem path={"/store-add-case"} text="Add Case"/>
            </div>
        );
    }
}

export default Nav;