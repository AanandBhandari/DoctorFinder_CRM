import React from 'react'
import PropTypes from 'prop-types'

const Footer = props => {
    return (
        <div>
            <footer className="sticky-footer">
                <div className="container">
                    <div className="text-center">
                        <small>Copyright © Your Website 2017</small>
                    </div>
                </div>
            </footer>
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fa fa-angle-up"></i>
            </a>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <a className="btn btn-primary" href="login.html">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Footer.propTypes = {

}

export default Footer
