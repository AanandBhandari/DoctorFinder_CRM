import React, { Fragment,useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from '../../layout/Layout'
import Loader from '../../layout/Loader'
import { connect } from 'react-redux'
import { loadMe } from '../../../actions/auth'
import ProfileForm  from './ProfileForm'

const DoctorProfile = ({loadMe,auth:{user,loading}}) => {
    useEffect(() => {
        loadMe()
    }, [loadMe])
    return (
        <Layout>
            {loading && user == null ? <Loader/>:<Fragment>
                {user.professionaltitle !==null ? <ProfileForm user={user}/> : <Fragment> </Fragment>}
            </Fragment>}
        </Layout>
    )
}

DoctorProfile.propTypes = {
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps,{loadMe})(DoctorProfile)
