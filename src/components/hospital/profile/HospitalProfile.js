import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from '../../layout/Layout'
import Loader from '../../layout/Loader'
import { connect } from 'react-redux'
import { getHosProfile } from '../../../actions/hospital/profile'
import ProfileForm from './ProfileForm'
import CreateProfile from './CreateProfile'

const HospitalProfile = ({ getHosProfile, auth: { user }, hosprofile: { profile, loading } }) => {
    useEffect(() => {
        user && getHosProfile(user._id)
    }, [getHosProfile, user])
    return (
        <Layout>
            {loading && profile == null ? <Loader /> : <Fragment>
                {profile && profile.phoneno !== undefined ? <ProfileForm user={profile} /> : <Fragment>
                    <CreateProfile /> </Fragment>}
            </Fragment>}
        </Layout>
    )
}

HospitalProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    hosprofile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    hosprofile: state.hosprofile
});
export default connect(mapStateToProps, { getHosProfile })(HospitalProfile)
