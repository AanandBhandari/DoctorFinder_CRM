import React, { useState,useEffect } from 'react'
import { SERVER_ROUTE } from '../../../utils/config'
import { Link } from 'react-router-dom'
import { toggleAvailability, averageRanking} from '../../../actions/doctor/profile'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
const ProfileForm = ({ toggleAvailability, averageRanking, averageStar,fiveStars,threeStars,fourStars,twoStars,oneStars ,user: { isAvailable, _id, name, lastname, email, image, professionaltitle, specialities, workexp, edu } }) => {
    const[available,setAvailable]=useState(isAvailable)
    const toggleAvailable = () => {
        setAvailable(!available)
        toggleAvailability(_id)
    }
    useEffect(()=>{averageRanking(_id)},[averageRanking,_id])
    return (
        <form className="container emp-profile" method="post">
            <div className="row">
                <div className="col-md-4">
                    <div className="profile-img">
                        <img src={`${SERVER_ROUTE}/uploads/${image}`} alt={`${SERVER_ROUTE}/${image}`} />
                        <div className="file btn btn-lg btn-primary">
                            Change Photo
                                <input type="file" name="file" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="profile-head">
                        <h5>
                            {name} {lastname}
                        </h5>
                        <h6>
                            {professionaltitle}
                        </h6>
                        <p className="proile-rating">RANKINGS : <span>{averageStar}/5</span></p>
                        <p className="proile-rating">FLIP AVAILABILITY : <span ><label className="switch">
                            <input type="checkbox"  onClick={toggleAvailable} defaultChecked={available}/>
                            <span className="slider round"></span>
                        </label></span></p>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">User Rating</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2">
                    <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="profile-work">
                        <p>WORKING EXPERIENCE</p>
                        {workexp.map((w, i) => <Link key={i} to="/workexperience">{w.title}<br/></Link>)}
                        <p>EDUCATION</p>
                        {edu.map((e, i) =><Link key={i} to="/">{e.title}<br /></Link>)}
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="tab-content profile-tab" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>User Id</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{_id}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Name</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{name} {lastname}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Specialities</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{specialities.join(', ')}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Professional Title</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{professionaltitle}</p>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Five Stars</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{fiveStars}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Four Stars</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{fourStars}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Three Stars</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{threeStars}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Two Stars</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{twoStars}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>One Stars</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{oneStars}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

ProfileForm.propTypes = {
    toggleAvailability: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    ...state.auth.ranking
})
export default connect(mapStateToProps, { toggleAvailability, averageRanking})(ProfileForm);
