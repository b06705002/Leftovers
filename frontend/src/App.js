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
import Cookies from 'universal-cookie';

class App extends Component {
    constructor(props) {
        super(props);
        this.authenticated = 0;
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.cookies = new Cookies();
        console.log('inside APP', this.cookies.get('mail'));
        if(this.cookies.get('mail') != undefined) {
            this.authenticated = 1
        }
        this.state = {authenticated: this.authenticated};
    }

    handleLogin(type) {
        if(type == 'store') {
            this.setState({authenticated: 1}, function() {
                console.log('authenticated now is ', this.state.authenticated);
            });
        }
        else {
            this.setState({authenticated: 2}, function() {
                console.log('authenticated now is ', this.state.authenticated);
            });
        }
    }

    handleLogout() {
        // var cookies = new Cookies();
        // var allCookies = cookies.getAll();
        this.clearCookies();
        this.setState({authenticated: 0});
    }

    setCookies(obj) {
        var cookies = new Cookies();
        for(let prop in obj) {
            // console.log(prop, obj[prop]);
            if(prop != 'msg') {
                cookies.set(String(prop), obj[prop]);
            }
        }
    }

    clearCookies() {
        var cookies = new Cookies();
        var obj = cookies.getAll();
        for(let prop in obj) {
            cookies.remove(String(prop), obj[prop]);
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    {!this.state.authenticated ? 
                    <Login handleLogin={this.handleLogin} setCookies={this.setCookies}/> 
                    :
                    <>
                        <Nav handleLogout={this.handleLogout}/>
                        <Switch>
                            {/* <Route path="/" exact foo={this.handleLogout} component={Home}/> */}
                            <Route path="/" exact>
                                <Home/>
                            </Route>
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