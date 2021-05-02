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

    // navSlide() {
    //     const burger = document.querySelector('.burger');
    //     const nav =  document.querySelector('.nav-links');

    // }

    render() {
        return (
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
        );
    }
}

export default Nav;