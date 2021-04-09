import { Component } from "react";

class FormCaseItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="formCaseItem">
                <label>Item</label>
                <input type="text"/>
                <label>Amount</label>
                <input type="number" step="1" min="1" />
            </div>
        )
    }
}

export default FormCaseItem;