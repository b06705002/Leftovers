import React from "react";
import {Link} from "react-router-dom";
import "../Styles/Nav.css";

const linkStyle = {
    textDecoration: "none",
    
}

export default (props) => {
    return (
        <div class="navContainer">
            <Link to="/" className="pageLink">
                <div>home</div>
            </Link>
            <Link to="store-setting" className="pageLink">
                <div>setting</div>
            </Link>
            <Link to="store-history" className="pageLink">
                <div>history</div>
            </Link>
            <Link to="/store-browse-case" className="pageLink">
                <div>browse case</div>
            </Link>
            <Link to="/store-add-case" className="pageLink">
                <div>add case</div>
            </Link>
        </div>
    );
}