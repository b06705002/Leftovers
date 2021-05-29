import React, { Component } from 'react';

class UserMatchCase extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
    }
    render() {
        return (
            <div>
                this is matching page with case id {this.id}
            </div>
        );
    }
}

export default UserMatchCase;