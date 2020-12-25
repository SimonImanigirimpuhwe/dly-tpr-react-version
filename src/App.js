import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Admin from './components/Admin';

const App = () => {
    const {pathname} = window.location;
    const exceptAdmin = pathname !== '/staff'
    return ( 
        <Router>
        {exceptAdmin && <Header />}
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/staff" component={Admin} />
        </Switch>
        {exceptAdmin && <Footer />}
        </Router>
     );
}

export default App;