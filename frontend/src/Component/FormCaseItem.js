import { Component } from "react";

class FormCaseItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="formCaseItem">
                <label>食物</label>
                <input type="text"/>
                <label>數量</label>
                <input type="number" step="1" min="1" />
            </div>
        )
    }
}

export default FormCaseItem;