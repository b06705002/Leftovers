import React, { Component } from "react";
import {Link} from "react-router-dom";
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
    componentDidMount() {
        var selected = document.getElementsByClassName("navContainer")[0];
        selected.children[this.state.clicked].classList.add("clicked");
    }
    handleClick(element) {
        var items = document.getElementsByClassName("navContainer")[0].children;
        for(let i=0; i<items.length; i++) {
            if(items[i].textContent == element.target.textContent) {
                items[i].classList.add("clicked");
            }
            else {
                items[i].classList = "navItem";
            }
        }
    }
    render() {
        return (
            <div class="navContainer">
                <NavItem path={"/"} text="Home" onClick={this.handleClick}/>
                <NavItem path={"/store-setting"} text="Setting" onClick={this.handleClick}/>
                <NavItem path={"/store-history"} text="History" onClick={this.handleClick}/>
                <NavItem path={"/store-browse-case"} text="Browse Case" onClick={this.handleClick}/>
                <NavItem path={"/store-add-case"} text="Add Case" onClick={this.handleClick}/>
            </div>
        );
    }
}

export default Nav;