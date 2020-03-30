import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";

const Login = ({ login, type, isAuthenticated }) => {
  const [formDate, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formDate;
  const onChange = e =>
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    login({ email, password, type });
  };
  if(isAuthenticated) return <Redirect to={`/${type}-dashboard`} />
  return (
    <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Login {type}</div>
          <div className="card-body">
            <form onSubmit={e => onSubmit(e)}>
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
              <div className="form-group">
                <div className="form-check">
                  <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" />{" "}
                    Remember Password
                  </label>
                </div>
              </div>
              <input
                type="submit"
                className="btn btn-primary btn-block"
                value="Login"
              />
            </form>
            <div className="text-center">
              {type === "doctor" && (
                <>
                  <Link className="d-block small mt-3" to="/register-dr">
                    Register an Account
                  </Link>
                  <Link className="d-block small" to="/login-hos">
                    Are you a Hospital Manager?
                  </Link>
                </>
              )}
              {type === "hospital" && (
                <>
                  <Link className="d-block small mt-3" to="/register-hos">
                    Register an Account
                  </Link>
                  <Link className="d-block small" to="/login-dr">
                    Are you a Doctor?
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);
