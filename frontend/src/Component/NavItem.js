import {Link} from "react-router-dom";

export default (props) => {
    return (
        <Link to={props.path} class="navItem">
            <div onClick={props.onClick}>
                <div>
                    {props.text}
                </div>
            </div>
        </Link>
    );
}