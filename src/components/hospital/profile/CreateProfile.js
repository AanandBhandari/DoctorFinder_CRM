import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile } from '../../../actions/hospital/profile'

const CreateProfile = ({ createProfile }) => {
    const [profile, setProfile] = useState({
        phoneno: '',
        website: '',
        address: ''
    })
    const { phoneno, website, address } = profile
    const onChange = e => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        createProfile(profile)
    }
    return (
        <div className="card card-register mx-auto mt-5">
            <div className="card-header">Complete Hospital Profile</div>
            <div className="card-body">
                <form className="md-form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <div className="form-row">
                            <div className="col-md-6">
                                <label htmlFor="exampleInputName">Hospital Website</label>
                                <input className="form-control" id="exampleInputName" type="text" aria-describedby="nameHelp" name="website"
                                    value={website}
                                    onChange={e => onChange(e)}
                                    placeholder="website.com" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="exampleInputLastName">Hospital Phone Number</label>
                                <input className="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="phoneno" placeholder="phoneno"
                                    value={phoneno}
                                    onChange={e => onChange(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Hospital Address</label>
                        <div className="input-group">
                            <span className="input-group-btn">
                                <span className="btn btn-info btn-file">
                                    <input type="file" name="address" id="imgInp" value={address} onChange={e => onChange(e)} />
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-row">
                            <div className="col-md">
                                <button type="submit" className="btn btn-primary ">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}

export default connect(null, { createProfile })(CreateProfile)
