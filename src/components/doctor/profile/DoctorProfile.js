import React, { Fragment,useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from '../../layout/Layout'
import Loader from '../../layout/Loader'
import { connect } from 'react-redux'
import { getDrProfile } from '../../../actions/doctor/profile'
import ProfileForm  from './ProfileForm'
import CreateProfile from './CreateProfile'

const DoctorProfile = ({getDrProfile,auth:{user}, drprofile:{profile,loading}}) => {
    useEffect(() => {
        user && getDrProfile(user._id)
    }, [getDrProfile,user])
    return (
        <Layout>
            {loading && profile == null ? <Loader/>:<Fragment>
                {profile && profile.professionaltitle !== undefined ? <ProfileForm user={profile}/> : <Fragment>
                <CreateProfile/> </Fragment>}
            </Fragment>}
        </Layout>
    )
}

DoctorProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    drprofile:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    drprofile: state.drprofile
});
export default connect(mapStateToProps,{getDrProfile})(DoctorProfile)
