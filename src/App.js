import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/userLogin';
import AuthContextProvider from './context/contexts/AuthContext';
import StudentContextProvider from './context/contexts/StudentContext';


const App = () => {
    
    return ( 
        <AuthContextProvider>
            <StudentContextProvider>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/staff" component={Admin} />
                        <Route exact path="/student" component={Login} />
                    </Switch>
                    <Footer />
                </Router>
            </StudentContextProvider>
        </AuthContextProvider>
     );
}

export default App;