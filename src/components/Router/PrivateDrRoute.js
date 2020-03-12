import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateDrRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, type },
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (!isAuthenticated && !loading && type!=='doctor') {
        return <Redirect to="/login-dr" />;
      } else if (isAuthenticated && !loading && type==='hospital') {
        return <Redirect to="/hospital-dashboard" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

PrivateDrRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateDrRoute);
