import React from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from '../../../actions/auth'

const HosBar = ({logout}) => {
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <a className="navbar-brand" href="#!">Menu</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                            <Link className="nav-link" to="/hospital-dashboard">
                                <i className="fa fa-fw fa-dashboard"></i>
                                <span className="nav-link-text">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                            <Link className="nav-link" to="/hospital-profile">
                                <i className="fa fa-fw fa-area-chart"></i>
                                <span className="nav-link-text">Profile</span>
                            </Link>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Components">
                            <Link className="nav-link nav-link-collapse collapsed" data-toggle="collapse" to="#collapseComponents" data-parent="#exampleAccordion">
                                <i className="fa fa-fw fa-wrench"></i>
                                <span className="nav-link-text">Manage OPD</span>
                            </Link>
                            <ul className="sidenav-second-level collapse" id="collapseComponents">
                                <li>
                                    <Link to="/set-opd">set doctor's OPD</Link>
                                </li>
                                <li>
                                    <Link to="/get-opds">OPDs</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                            <Link className="nav-link" to="/appointments">
                                <i className="fa fa-fw fa-area-chart"></i>
                                <span className="nav-link-text">Appointments</span>
                            </Link>
                        </li>

                    </ul>
                    <ul className="navbar-nav sidenav-toggler">
                        <li className="nav-item">
                            <Link className="nav-link text-center" id="sidenavToggler">
                                <i className="fa fa-fw fa-angle-left"></i>
                            </Link>
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
HosBar.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(HosBar)
