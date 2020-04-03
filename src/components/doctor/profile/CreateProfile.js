import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createProfile} from '../../../actions/doctor/profile'

const CreateProfile = ({createProfile}) => {
    const [profile,setProfile] = useState({
        specialities:'',
        professionaltitle:'',
        image:null
    })
    const {specialities,professionaltitle,image} = profile
    const onChange = e => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.name==='image' ? e.target.files[0] : e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        const spcs=specialities.split(',').map(s => s.trim())
        const formData = new FormData()
        formData.append('image',image)
        spcs.forEach(s => formData.append('specialities', s))
        formData.append('professionaltitle', professionaltitle)
        createProfile(formData)
    }
    return (
        <div className="card card-register mx-auto mt-5">
            <div className="card-header">Complete Your Profile</div>
            <div className="card-body">
                <form className="md-form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <div className="form-row">
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
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Upload Profile Image</label>
                        <div className="input-group">
                            <span className="input-group-btn">
                                <span className="btn btn-info btn-file">
                                    <input type="file" name="image" id="imgInp" onChange={e => onChange(e)}/>
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
    createProfile:PropTypes.func.isRequired
}

export default connect(null,{createProfile})(CreateProfile)
