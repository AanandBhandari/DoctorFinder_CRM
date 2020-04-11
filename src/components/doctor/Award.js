import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from '../layout/Layout'
import {connect} from 'react-redux'
import { getDrProfile, addAward, deleteAward } from '../../actions/doctor/profile'

const Award = ({ addAward, deleteAward ,getDrProfile,profile,auth:{user}}) => {
    const [award, setWork] = useState({
        title: '',
        address: '',
        year: ''
    })
    useEffect(()=>{
        user && getDrProfile(user._id)
    },[user,getDrProfile])
    const { title, address, year } = award
    const onChange = e => setWork({ ...award, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()
        addAward(award,user._id)
    }
        
    const deleteA = id => e => deleteAward(id,user._id);
    return (
        <Layout>
            <div className="card card-register mx-auto mt-5">
                <div className="card-header">Add Your Award</div>
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
                                    <label htmlFor="exampleInputName">Address</label>
                                    <input className="form-control" id="exampleInputName" type="text" aria-describedby="nameHelp" name="address"
                                        value={address}
                                        onChange={e => onChange(e)}
                                        placeholder="address" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputLastName">Year</label>
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
                        <th scope="col">Awards</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {profile && !profile.loading && profile.awards.map((w,i)=> (
                    <tr key={w._id}>
                        <th scope="row">{i+1}</th>
                        <td>
                        <p className="mb-1">{w.title} in {w.address} at {w.year}.</p>
                        </td>
                        <td>
                            <button type="submit" onClick={deleteA(w._id)} className=" btn btn-danger ">Delete</button>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>

        </Layout>
    )
}

Award.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object,
    getDrProfile: PropTypes.func.isRequired,
    addAward: PropTypes.func.isRequired,
    deleteAward: PropTypes.func.isRequired,
    }
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.drprofile.profile
});

export default connect(mapStateToProps, { getDrProfile, addAward, deleteAward})(Award)
