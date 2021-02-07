import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { editProfile, getHosProfile } from '../../../actions/hospital/profile'
import Layout from '../../layout/Layout'
import { Link, withRouter } from 'react-router-dom'

const EditHospitalProfile = ({ getHosProfile, history, editProfile, auth: { user }, hosprofile: { profile, loading } }) => {
    const [profileData, setProfileData] = useState({
        website: '',
        phoneno: '',
        address: '',
        name: '',
        email: ''
    })
    useEffect(() => {
        user && getHosProfile(user._id)
        setProfileData({
            ...profileData,
            website: loading || !profile.website ? '' : profile.website,
            name: loading || !profile.name ? '' : profile.name,
            email: loading || !profile.email ? '' : profile.email,
            phoneno: loading || !profile.phoneno ? '' : profile.phoneno,
            address: loading || !profile.address ? '' : profile.address,
        })
    }, [user, getHosProfile])
    const { website, phoneno, address, name, email } = profileData
    const onChange = e => {
        
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        editProfile(profileData, user._id, history)
    }
    return (
        <Layout>
            <div className="card card-register mx-auto mt-5">
                <div className="card-header">Update Hospital Profile</div>
                <div className="card-body">
                    <form className="md-form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputLastName">Hospital Name</label>
                                    <input className="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="name" placeholder="name"
                                        value={name}
                                        onChange={e => onChange(e)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputLastName">Hospital Email</label>
                                    <input className="form-control" id="exampleInputLastName" type="email" aria-describedby="nameHelp" name="email" placeholder="email"
                                        value={email}
                                        onChange={e => onChange(e)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputName">Hospital Phone Number</label>
                                    <input className="form-control" id="exampleInputName" type="text" aria-describedby="nameHelp" name="phoneno"
                                        value={phoneno}
                                        onChange={e => onChange(e)}
                                        placeholder="phoneno" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputLastName">Hospital Website</label>
                                    <input className="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="website" placeholder="website"
                                        value={website}
                                        onChange={e => onChange(e)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputLastName">Hospital Address</label>
                                    <input className="form-control " id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="address" placeholder="address" value={address}
                                        onChange={e => onChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row float-left">
                                <div className="col-md-12">
                                    <button type="submit" className=" form-control btn btn-primary ">Update</button>
                                </div>
                            </div>
                            <div className="form-row float-right">
                                <div className="col-md-12">
                                    <Link to='/hospital-profile' className=" form-control btn btn-primary ">Go Back</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

EditHospitalProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    hosprofile: PropTypes.object.isRequired,
    getHosProfile: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    hosprofile: state.hosprofile
});
export default connect(mapStateToProps, { getHosProfile, editProfile })(withRouter(EditHospitalProfile))
