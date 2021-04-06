import './App.css';
import Home from './Page/Home';
import UserCase from './Page/UserCase';
import StoreCase from './Page/StoreCase';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/user-case" component={UserCase}/>
                    <Route path="/store-case" component={StoreCase}/>
                </Switch>
            </div>
        </Router>
    );
}


export default App;
