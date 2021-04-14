import './App.css';
import Home from './Page/Home';
import StoreHistory from './Page/Store/StoreHistory';
import StoreSetting from './Page/Store/StoreSetting';
import StoreAddCase from './Page/Store/StoreAddCase';
import StoreBrowseCase from './Page/Store/StoreBrowseCase';
import Login from './Page/Login';
import Nav from './Container/Nav';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {authenticated: false};
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        this.setState({authenticated: true});
        console.log(this.props.history);
    }

    render() {
        return (
            <Router>
                <div className="App">
                    {!this.state.authenticated ? 
                    <Login handleLogin={this.handleLogin}/> 
                    :
                    <>
                        <Nav />
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/store-history" component={StoreHistory}/>
                            <Route path="/store-setting" component={StoreSetting}/>
                            <Route path="/store-add-case" component={StoreAddCase}/>
                            <Route path="/store-browse-case" component={StoreBrowseCase}/>
                        </Switch>
                    </>
                    }
                </div>
            </Router>
        );
    }
}

export default App;

// import React from 'react';
// import './App.css';
// import { Todopage } from './Page/Todopage';

// function App(){
//     return (
//         <div className="App">
//             <Todopage />
//         </div>
//     );
// }

// export default App;