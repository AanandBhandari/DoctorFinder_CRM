import React, {useState } from "react";
import {Link, Redirect} from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux"; 
import {setAlert} from '../../actions/alert'
import { register } from "../../actions/auth";
const Register = ({setAlert,type, isAuthenticated, register}) => {
  const [formData, setFormData] = useState({
    name: '',
    lastname:'',
    email: '',
    password: '',
    password2: ''
  })
  const {name, lastname, email, password, password2} = formData;
  const onChange = e => setFormData({...formData,[e.target.name]: e.target.value})
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('passwords do not match','danger',3000)
    } else {
      register({name,lastname,email,password,type})
    }
  }
  if (isAuthenticated) {
    return <Redirect to={`/${type}-dashboard`} />
  }
  return (
    <div className="card card-register mx-auto mt-5">
      <div className="card-header">Register {type} Account</div>
      <div className="card-body">
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <div className="form-row">
              <div className="col-md-6">
                <label htmlFor="exampleInputName">First name</label>
                <input
                  className="form-control"
                  id="exampleInputName"
                  type="text"
                  aria-describedby="nameHelp"
                  placeholder="Enter first name"
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                />
              </div>
              {type === "doctor" && (
                <div className="col-md-6">
                  <label htmlFor="exampleInputLastName">Last name</label>
                  <input
                    className="form-control"
                    id="exampleInputLastName"
                    type="text"
                    aria-describedby="nameHelp"
                    placeholder="Enter last name"
                    name="lastname"
                    value={lastname}
                    onChange={e => onChange(e)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              className="form-control"
              id="exampleInputEmail1"
              type="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col-md-6">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  className="form-control"
                  id="exampleInputPassword1"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="exampleConfirmPassword">Confirm password</label>
                <input
                  className="form-control"
                  id="exampleConfirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  value={password2}
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-primary btn-block"
            value="Register"
          />
        </form>
        <div className="text-center">
          {type === "doctor" && (<>
          <Link className="d-block small mt-3" to="/login-dr">
            Login Doctor
          </Link>
            <Link className="d-block small" to="/register-hos">
              Are you a Hospital Manager?
            </Link></>
          )}
          {type === "hospital" && (<>
            <Link className="d-block small mt-3" to="/login-hos">
            Login Hospital
          </Link>
            <Link className="d-block small" to="/register-dr">
              Are you a Doctor?
            </Link></>
          )}
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{setAlert, register})(Register);
