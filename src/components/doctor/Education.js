import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from '../layout/Layout'
import {connect} from 'react-redux'
import { getDrProfile, addEducation, deleteEducation } from '../../actions/doctor/profile'

const Education = ({ addEducation, deleteEducation ,getDrProfile,profile,auth:{user}}) => {
    const [edu, setEdu] = useState({
        title: '',
        institutename: '',
        address: '',
        passoutyear: ''
    })
    useEffect(()=>{
        user && getDrProfile(user._id)
    },[user,getDrProfile])
    const { title, institutename, address, passoutyear } = edu
    const onChange = e => setEdu({ ...edu, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()
        addEducation(edu,user._id)
    }
        
    const deleteEdu = id => e => deleteEducation(id,user._id);
    return (
        <Layout>
            <div className="card card-register mx-auto mt-5">
                <div className="card-header">Add Your Education</div>
                <div className="card-body">
                    <form className="md-form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputLastName">Course</label>
                                    <input className="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="title" placeholder="course"
                                        value={title}
                                        onChange={e => onChange(e)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputLastName">Institute Name</label>
                                    <input className="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="institutename" placeholder="Institute name"
                                        value={institutename}
                                        onChange={e => onChange(e)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputName">Institute Address</label>
                                    <input className="form-control" id="exampleInputName" type="text" aria-describedby="nameHelp" name="address"
                                        value={address}
                                        onChange={e => onChange(e)}
                                        placeholder="address" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputLastName">Passout Year</label>
                                    <input className="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="passoutyear" placeholder="passout year"
                                        value={passoutyear}
                                        onChange={e => onChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row float-center">
                                <div className="col-md-12">
                                    <button type="submit" className=" form-control btn btn-primary ">Add</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <br />
            <table className="table mx-auto mt-12">
                <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Education</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {profile && !profile.loading && profile.edu.map((w,i)=> (
                    <tr key={w._id}>
                        <th scope="row">{i+1}</th>
                        <td>
                        <p className="mb-1">{w.title} in {w.address} at {w.institutename} {w.passoutyear}.</p>
                        </td>
                        <td>
                            <button type="submit" onClick={deleteEdu(w._id)} className=" btn btn-danger ">Delete</button>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>

        </Layout>
    )
}

Education.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object,
    getDrProfile: PropTypes.func.isRequired,
    addEducation: PropTypes.func.isRequired,
    deleteEducation: PropTypes.func.isRequired,
    }
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.drprofile.profile
});

export default connect(mapStateToProps, { getDrProfile, addEducation, deleteEducation})(Education)
