import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from '../layout/Layout'
import { getOPDs } from '../../actions/doctor/profile'
import Moment from 'react-moment'

const OPDs = ({ OPDs, getOPDs, auth: { user }}) => {
    useEffect(()=>{
        user && getOPDs(user._id)
    },[user,getOPDs])
    const getTime = num => {
        if(num<12) return `${num} am`
        if(num>12) return `${num-12} pm`
        if (num === 12) return `${num} pm`
    }
    return (
        <Layout>
            <div className="card mb-3">
                <div className="card-header">
                    <i className="fa fa-table"></i> Your OPD Schedule</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr className="text-center">
                                <th colSpan="7" >OPD Schedule</th>
                                <th colSpan="4" >About Hospital</th>
                                </tr>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Created Date</th>
                                    <th>Start&End Date</th>
                                    <th>Start&End Time</th>
                                    <th>Timeslot</th>
                                    <th>Consultant Fee</th>
                                    <th>State</th>
                                    <th>Hospital Name</th>
                                    <th>Phone No.</th>
                                    <th>Address</th>
                                    <th>Geo Location</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                OPDs && OPDs.map((o,i)=>(
                                    <tr key={i+1}>
                                        <td>{i+1}</td>
                                        <td><Moment format="YYYY/MM/DD">{o.createdAt}</Moment></td>
                                        <td><Moment format="YYYY/MM/DD">{o.startdate}</Moment>-<Moment format="YYYY/MM/DD">{o.enddate}</Moment></td>
                                        <td>{getTime(o.starttime)}-{getTime(o.endtime)}</td>
                                        <td>{o.timeslot} minutes</td>
                                        <td>Rs {o.consultfee}</td>
                                        <td className={o.isAvailable ? "bg-success text-white" :"bg-danger text-white"} >{o.isAvailable?'Active':'Inactive'}</td>
                                        <td>{o.hospital.name}</td>
                                        <td>{o.hospital.phoneno}</td>
                                        <td>{o.hospital.address}</td>
                                        <td><a rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${o.hospital.location.coordinates[1]},${o.hospital.location.coordinates[0]}`} target="_blank">click here</a></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
            </div>
        </Layout>
    )
}

OPDs.propTypes = {
    OPDs: PropTypes.array.isRequired,
    getOPDs: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    OPDs: state.drprofile.OPDs,
    auth:state.auth
})

export default connect(mapStateToProps, { getOPDs })(OPDs)
