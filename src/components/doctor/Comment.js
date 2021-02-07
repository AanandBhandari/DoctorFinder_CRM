import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Layout from '../layout/Layout'
import { getComments, removeComments} from '../../actions/doctor/profile'
import { connect } from 'react-redux'

const Comment = ({ getComments,removeComments ,auth: { user }, comments }) => {
    const [page,setPage] = useState(2)
    useEffect(() => {
        console.log('hello');
        user && getComments(user._id)
        return ()=>removeComments()
    }, [user, getComments,removeComments])
    
    const loadmore = id=>{
        setPage(page+1)
       getComments(id,page)

    }
    return (
        <Layout>
            <div className="card">
                <div className="card-header">
                    <i className="fa fa-comments"></i>User Comments</div>
                <div className="list-group list-group-flush">
                    {
                        comments && comments.map(c => (
                            <a className="list-group-item list-group-item-action" href="!#" key={c._id}>
                                <div className="media">
                                    <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/45x45" alt="" />
                                    <div className="media-body">
                                        <strong className="text-large">{c.user.name} {c.user.lastname}</strong> <br />
                                        <p>{c.comment}.</p>
                    <div className="text-muted smaller">Star: {c.star ? c.star : "No star"}</div>
                                    </div>
                                </div>
                            </a>
                        ))
                    }
                    {
                        comments && comments.length > 10 && <a className="list-group-item list-group-item-action" href="!#" onClick={()=>{loadmore(user._id)}}>View more comments...</a>
                    }
                    
                </div>
            </div>
        </Layout>
    )
}

Comment.propTypes = {
    auth: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    getComments:PropTypes.func.isRequired,
    removeComments: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth,
    comments: state.drprofile.comments
})

export default connect(mapStateToProps, { getComments, removeComments })(Comment)
