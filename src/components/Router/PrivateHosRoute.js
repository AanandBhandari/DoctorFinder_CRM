import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateHosRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, type },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated && !loading && type!=='hospital') {
          return (<Redirect to="/login-hos" />)
        } else if (isAuthenticated && !loading && type==='doctor') {
          return (<Redirect to="/doctor-dashboard" />)
        } else {
          return (<Component {...props} />)
        }
      }}
    />
  );
};

PrivateHosRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateHosRoute);
