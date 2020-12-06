import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';

const App = () => {
    return ( 
        <Router>
        <Header />
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
        <Footer />
        </Router>
     );
}

export default App;