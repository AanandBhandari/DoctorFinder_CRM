import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { editProfile,getDrProfile } from '../../../actions/doctor/profile'
import Layout from '../../layout/Layout'
import { Link, withRouter } from 'react-router-dom'

const EditProfile = ({ getDrProfile, history, editProfile, auth: { user }, drprofile: { profile, loading }}) => {
    const [profileData, setProfileData] = useState({
        specialities: '',
        professionaltitle: '',
        image: null,
        name:'',
        lastname:''
    })
    useEffect(() => {
        user && getDrProfile(user._id)
        setProfileData({
            ...profileData,
            specialities: loading || !profile.specialities ? '' : profile.specialities.join(','),
            name: loading || !profile.name ? '' : profile.name,
            lastname: loading || !profile.lastname ? '' : profile.lastname,
            professionaltitle: loading || !profile.professionaltitle ? '' : profile.professionaltitle,
        })
    }, [])
    const { specialities, professionaltitle, image, name, lastname } = profileData
    const onChange = e => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        const spcs = specialities.split(',').map(s => s.trim())
        const formData = new FormData()
        formData.append('image', image)
        spcs.forEach(s => formData.append('specialities', s))
        formData.append('name', name)
        formData.append('lastname', lastname)
        formData.append('professionaltitle', professionaltitle)
        editProfile(formData,user._id, history)
    }
    return (
        <Layout>
        <div className="card card-register mx-auto mt-5">
            <div className="card-header">Update Your Profile</div>
            <div className="card-body">
                <form className="md-form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <div className="form-row">
                            <div className="col-md-6">
                                <label htmlFor="exampleInputLastName">Your Name</label>
                                <input className="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="name" placeholder="name"
                                    value={name}
                                    onChange={e => onChange(e)} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="exampleInputLastName">Your Lastname</label>
                                <input className="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="lastname" placeholder="lastname"
                                    value={lastname}
                                    onChange={e => onChange(e)} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="exampleInputName">Your Professional Title</label>
                                <input className="form-control" id="exampleInputName" type="text" aria-describedby="nameHelp" name="professionaltitle"
                                    value={professionaltitle}
                                    onChange={e => onChange(e)}
                                    placeholder="professionaltitle" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="exampleInputLastName">Your Specialities</label>
                                <input className="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="specialities" placeholder="specialities"
                                    value={specialities}
                                    onChange={e => onChange(e)} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="exampleInputLastName">Update Profile Image</label>
                                <input className="form-control btn btn-info btn-file" id="exampleInputLastName" type="file" aria-describedby="nameHelp" name="image" placeholder="image"
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
                                <Link to='/doctor-profile' className=" form-control btn btn-primary ">Go Back</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </Layout>
    )
}

EditProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    drprofile: PropTypes.object.isRequired,
    getDrProfile: PropTypes.func.isRequired,
    editProfile:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    drprofile: state.drprofile
});
export default connect(mapStateToProps, { getDrProfile, editProfile })(withRouter(EditProfile))
