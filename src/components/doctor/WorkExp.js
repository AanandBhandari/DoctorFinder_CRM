import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from '../layout/Layout'
import {connect} from 'react-redux'
import { getDrProfile, addWorkExp, deleteWorkExp } from '../../actions/doctor/profile'

const WorkExp = ({ addWorkExp, deleteWorkExp ,getDrProfile,workexp,auth:{user}}) => {
    const [work, setWork] = useState({
        title: '',
        organization: '',
        address: '',
        year: ''
    })
    useEffect(()=>{
        user && getDrProfile(user._id)
    },[user,getDrProfile])
    const { title, organization, address, year } = work
    const onChange = e => setWork({ ...work, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()
        addWorkExp(work,user._id)
    }
        
    const deleteWork = id => e => deleteWorkExp(id,user._id);
    return (
        <Layout>
            <div className="card card-register mx-auto mt-5">
                <div className="card-header">Add Your Work Experience</div>
                <div className="card-body">
                    <form className="md-form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputLastName">Title</label>
                                    <input className="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="title" placeholder="title"
                                        value={title}
                                        onChange={e => onChange(e)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputLastName">Worked Organization</label>
                                    <input className="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="organization" placeholder="organization"
                                        value={organization}
                                        onChange={e => onChange(e)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputName">Worked Address</label>
                                    <input className="form-control" id="exampleInputName" type="text" aria-describedby="nameHelp" name="address"
                                        value={address}
                                        onChange={e => onChange(e)}
                                        placeholder="address" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputLastName">Completion Year</label>
                                    <input className="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" name="year" placeholder="year"
                                        value={year}
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
                        <th scope="col">Work Experience</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {workexp && workexp.map((w,i)=> (
                    <tr key={w._id}>
                        <th scope="row">{i+1}</th>
                        <td>
                        <p className="mb-1">{w.title} in {w.address} at {w.organization} {w.year}.</p>
                        </td>
                        <td>
                            <button type="submit" onClick={deleteWork(w._id)} className=" btn btn-danger ">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </Layout>
    )
}

WorkExp.propTypes = {
    auth: PropTypes.object.isRequired,
    workexp: PropTypes.array.isRequired,
    getDrProfile: PropTypes.func.isRequired,
    addWorkExp: PropTypes.func.isRequired,
    deleteWorkExp: PropTypes.func.isRequired,
    }
const mapStateToProps = state => ({
    auth: state.auth,
    workexp: state.drprofile.profile?.workexp
});

export default connect(mapStateToProps, { getDrProfile, addWorkExp, deleteWorkExp})(WorkExp)
