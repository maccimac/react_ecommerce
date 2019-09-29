import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; //THIS WILL WRAP THE REST OF THE APPLICATIONS. WILL MAKE PROPS AVAILABLE TO OTHER NESTED COMPONENTS
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'

const Routes = () => {
  return (
    <BrowserRouter>
      {/* — MAIN WRAPPER MAKES PROPS AVAILABLE */}

      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/signin" exact component={Signin}/>
        <Route path="/signup" exact component={Signup}/>
        <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
      </Switch>

    </BrowserRouter>

  )
}

export default Routes;