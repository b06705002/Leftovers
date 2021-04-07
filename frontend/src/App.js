import './App.css';
import Home from './Page/Home';
import StoreHistory from './Page/Store/StoreHistory';
import StoreSetting from './Page/Store/StoreSetting';
import StoreAddCase from './Page/Store/StoreAddCase';
import StoreBrowseCase from './Page/Store/StoreBrowseCase';
import Nav from './Container/Nav';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/store-history" component={StoreHistory}/>
                    <Route path="/store-setting" component={StoreSetting}/>
                    <Route path="/store-add-case" component={StoreAddCase}/>
                    <Route path="/store-browse-case" component={StoreBrowseCase}/>
                </Switch>
            </div>
        </Router>
    );
}


export default App;
