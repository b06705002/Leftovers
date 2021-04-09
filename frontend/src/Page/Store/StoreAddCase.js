import React, { Component } from 'react';
import "../../Styles/StoreAddCase.css";
import FormCaseItem from "../../Component/FormCaseItem";

class StoreAddCase extends Component {
    /*
    This is StoreAddCase Page, user should be able to:
        1. add new item and amout of item
    */
    constructor(props) {
        super(props);
        this.state = {formCaseItems: []};
        this.handleAdd = this.handleAdd.bind(this);
    }
    componentDidMount() {
        var list = this.state.formCaseItems;
        list.push(<FormCaseItem />);
        this.setState({formCaseItems: list});
    }
    handleAdd() {
        var list = this.state.formCaseItems;
        list.push(<FormCaseItem />);
        this.setState({formCaseItems: list});
    }
    render() {
        return (
            <div class="Container addCase">
                <h1>ADD A NEW CASE FOR YOUR STORE</h1>
                <div className="formContainer">
                    <form>
                        {this.state.formCaseItems.map((item, index) => {
                            return item;
                        })}
                        <button type="button" onClick={this.handleAdd}>Add</button>
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default StoreAddCase;