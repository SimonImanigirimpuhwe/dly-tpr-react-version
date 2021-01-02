import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Admin from './components/Admin';
import AuthContextProvider from './context/contexts/AuthContext';
import StudentContextProvider from './context/contexts/StudentContext';
import User from './components/User';
import ReportContextProvider from './context/contexts/ReportContext';


const App = () => {
    
    return ( 
        <AuthContextProvider>
            <StudentContextProvider>
                <ReportContextProvider>
                    <Router>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/staff" component={Admin} />
                            <Route exact path="/student" component={User} />
                        </Switch>
                        <Footer />
                    </Router>
                </ReportContextProvider>
            </StudentContextProvider>
        </AuthContextProvider>
     );
}

export default App;