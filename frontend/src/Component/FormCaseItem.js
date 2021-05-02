import { Component } from "react";

class FormCaseItem extends Component {
    constructor(props) {
        super(props);
        this.state = {url: null}
        this.loadFile = this.loadFile.bind(this);
    }
    loadFile(event) {
        console.log(URL.createObjectURL(event.target.files[0]));
        this.setState({url: URL.createObjectURL(event.target.files[0])});
    }
    render() {
        return (
            <div className="formCaseItem">
                <label>食物</label>
                <input type="text" name="item" id="AC_item"/>
                <label>數量</label>
                <input type="number" step="1" min="1" name="amount" id="AC_amount"/>
                <label>單價</label>
                <input type="number" step="1" min="0" name="price" id="AC_price"/>
                <div>
                    <label>新增照片</label>
                    <img src={this.state.url} width={this.state.url ? "50%" : "0%"}></img>
                    <input type="file" name="pic" id="AC_pic" accept="image/png, image/jpeg" onChange={this.loadFile}/>
                </div>
            </div>
        )
    }
}

export default FormCaseItem;