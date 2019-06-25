import React from 'react';
import { Route } from 'react-router-dom';
import LogInPage from './components/pages/LogInPage';
import SignUpPage from './components/pages/SignUpPage'
import DashboardPage from './components/pages/DashboardPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import ConfirmationPage from './components/pages/ConfirmationPage'
import TopNavigation from './components/navigation/TopNavigation';
import NewBookPage from './components/pages/NewBookPage';

const App = ({location}) => 
  <div className="ui container">
    <TopNavigation />
    <Route location={location} path='/confirmation' exact component={ConfirmationPage} />
    <GuestRoute location={location} path='/login' exact component={LogInPage} />
    <GuestRoute location={location} path='/signup' exact component={SignUpPage} />
    <UserRoute location={location} path='/dashboard' exact component={DashboardPage} />
    <UserRoute location={location} path='/books/new' exact component={NewBookPage} />
  </div>
 
export default App;
