import React, {useEffect}from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from './components/auth/Register'
import Login from "./components/auth/Login"
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken'
import {loadMe} from './actions/auth'
import DoctorDashboard from './components/doctor/DoctorDashboard'
import HospitalDashboard from "./components/hospital/HospitalDashboard";
import PrivateDrRoute from './components/Router/PrivateDrRoute'
import PrivateHosRoute from './components/Router/PrivateHosRoute'
// redux
import { Provider } from "react-redux";
import store from "./store";
if (localStorage.token) {
  setAuthToken(localStorage.token)
}
function App() {
  useEffect(()=> {
    store.dispatch(loadMe())
  },[])
  return (
    <Provider store={store}>
      <Router>
          <Alert />
          <Switch>
            <Route exact path="/register-dr" render={(props)=> <Register {...props} type='doctor'/>} />
            <Route exact path="/register-hos" render={(props)=> <Register {...props} type='hospital'/>} />
            <Route exact path="/login-dr" render={(props)=> <Login {...props} type='doctor'/>} />
            <Route exact path="/login-hos" render={(props)=> <Login {...props} type='hospital'/>} />
            <PrivateDrRoute exact path="/doctor-dashboard" component={DoctorDashboard}/>
            <PrivateHosRoute exact path="/hospital-dashboard" component={HospitalDashboard}/>
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
