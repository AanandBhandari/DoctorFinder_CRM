import React from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {logout} from '../../../actions/auth'

const DrBar = ({logout}) => {
    return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <a className="navbar-brand" href="#!">Manage</a>
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span></button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
          <Link className="nav-link" to="/doctor-dashboard">
            <i className="fa fa-fw fa-dashboard"></i>
            <span className="nav-link-text">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="ManageYour Profile">
          <Link className="nav-link" to="/doctor-profile">
            <i className="fa fa-fw fa-address-card"></i>
            <span className="nav-link-text">Profile</span>
          </Link>
        </li>
        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Manage Your Work & Experience">
          <Link className="nav-link" to="/workexperience">
            <i className="fa fa-fw fa-tasks"></i>
            <span className="nav-link-text">Work Experience</span>
          </Link>
        </li>
        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Manage Your Education">
          <Link className="nav-link" to="/education">
            <i className="fa fa-fw fa-graduation-cap"></i>
            <span className="nav-link-text">Education</span>
          </Link>
        </li>
        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Manage Your Training">
          <Link className="nav-link" to="/training">
            <i className="fa fa-fw fa-table"></i>
            <span className="nav-link-text">Training</span>
          </Link>
        </li>
        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Manage Your Awards">
          <Link className="nav-link" to="/award">
            <i className="fa fa-fw fa-gift"></i>
            <span className="nav-link-text">Awards</span>
          </Link>
        </li>
        {/* <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Components">
          <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseComponents" data-parent="#exampleAccordion">
            <i className="fa fa-fw fa-wrench"></i>
            <span className="nav-link-text">Components</span>
          </a>
          <ul className="sidenav-second-level collapse" id="collapseComponents">
            <li>
              <Link to="/navbar.html">Navbar</Link>
            </li>
            <li>
              <Link to="/cards.html">Cards</Link>
            </li>
          </ul>
        </li> */}
      </ul>
      <ul className="navbar-nav sidenav-toggler">
        <li className="nav-item">
          <a className="nav-link text-center" id="sidenavToggler" href="#sidenavToggler">
            <i className="fa fa-fw fa-angle-left"></i>
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link onClick={logout} className="nav-link" to='#!'>
            <i className="fa fa-fw fa-sign-out"></i>Logout</Link>
        </li>
      </ul>
    </div>
  </nav>
    )
}
DrBar.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null,{logout})(DrBar)
