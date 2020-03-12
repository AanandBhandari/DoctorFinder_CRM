import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateHosRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, isHosManager, isDr },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated && !loading && !isHosManager && !isDr) {
          return (<Redirect to="/login-hos" />)
        } else if (isAuthenticated && !loading && isDr) {
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
