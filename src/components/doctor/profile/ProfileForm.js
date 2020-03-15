import React, { useState } from 'react'
import { SERVER_ROUTE } from '../../../utils/config'
import { Link } from 'react-router-dom'
export const ProfileForm = ({ user: { isAvailable, _id, name, lastname, email, image, professionaltitle, specialities, workexp, edu } }) => {
    const[available,setAvailable]=useState(isAvailable)
    const toggleAvailable = () => {
        setAvailable(!available)
    }
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
                        <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                        <p className="proile-rating">FLIP AVAILABILITY : <span ><label className="switch">
                            <input type="checkbox"  onClick={toggleAvailable} defaultChecked={available}/>
                            <span className="slider round"></span>
                        </label></span></p>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
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
                                    <label>Experience</label>
                                </div>
                                <div className="col-md-6">
                                    <p>Expert</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Hourly Rate</label>
                                </div>
                                <div className="col-md-6">
                                    <p>10$/hr</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Total Projects</label>
                                </div>
                                <div className="col-md-6">
                                    <p>230</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>English Level</label>
                                </div>
                                <div className="col-md-6">
                                    <p>Expert</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Availability</label>
                                </div>
                                <div className="col-md-6">
                                    <p>6 months</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label>Your Bio</label><br />
                                    <p>Your detail description</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
