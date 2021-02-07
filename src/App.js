import React, {useEffect}from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Register from './components/auth/Register'
import Login from "./components/auth/Login"
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken'
import {loadMe} from './actions/auth'
import DoctorDashboard from './components/doctor/DoctorDashboard'
import DoctorProfile from './components/doctor/profile/DoctorProfile'
import EditProfile from './components/doctor/profile/EditProfile'
import WorkExp from './components/doctor/WorkExp'
import HospitalDashboard from "./components/hospital/HospitalDashboard";
import GeoMap from "./components/hospital/GeoMap";
import PrivateDrRoute from './components/Router/PrivateDrRoute'
import PrivateHosRoute from './components/Router/PrivateHosRoute'
import { Provider } from "react-redux";
import store from "./utils/store";
import Education from "./components/doctor/Education";
import Award from "./components/doctor/Award";
import Training from "./components/doctor/Training";
import OPDs from "./components/doctor/OPDs";
import Comment from "./components/doctor/Comment";
import HospitalProfile from "./components/hospital/profile/HospitalProfile"
import  EditHospitalProfile from "./components/hospital/profile/EditHospitalProfile"
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
            <Route exact path='/' render={props => <Redirect to='/login-hos'/> }/>
            <Route exact path="/register-dr" render={(props)=> <Register {...props} type='doctor'/>} />
            <Route exact path="/register-hos" render={(props)=> <Register {...props} type='hospital'/>} />
            <Route exact path="/login-dr" render={(props)=> <Login {...props} type='doctor'/>} />
            <Route exact path="/login-hos" render={(props)=> <Login {...props} type='hospital'/>} />
            <PrivateDrRoute exact path="/doctor-dashboard" component={DoctorDashboard}/>
            <PrivateDrRoute exact path="/doctor-profile" component={DoctorProfile}/>
            <PrivateDrRoute exact path="/edit-dr-profile" component={EditProfile}/>
            <PrivateDrRoute exact path="/work-exp" component={WorkExp}/>
            <PrivateDrRoute exact path="/education" component={Education}/>
            <PrivateDrRoute exact path="/award" component={Award}/>
            <PrivateDrRoute exact path="/training" component={Training}/>
            <PrivateDrRoute exact path="/opds" component={OPDs}/>
            <PrivateDrRoute exact path="/comments" component={Comment}/>
            <PrivateHosRoute exact path="/hospital-dashboard" component={HospitalDashboard}/>
            <PrivateHosRoute exact path="/hospital-profile" component={HospitalProfile}/>
            <PrivateHosRoute exact path="/edit-hos-profile" component={EditHospitalProfile}/>
            <PrivateHosRoute exact path="/map" component={GeoMap}/>
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
