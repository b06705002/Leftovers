import {NavLink} from "react-router-dom";

/*
Simple component in navigation bar using NavLink from react-router-dom
*/

export default (props) => {
    return (
        <NavLink to={props.path} className="navItem" activeClassName="clicked" exact>
            <div>
                <div>{props.text}</div>
            </div>
        </NavLink>
    );
}