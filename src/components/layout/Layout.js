import React, { Fragment } from "react";
import HosBar from "./navbar/HosBar";
import DrBar from "./navbar/DrBar";
import Footer from "./Footer";
import {connect} from 'react-redux'

const Layout = ({ children, type }) => {
    return (
        <Fragment>
                {type === 'hospital' ? <HosBar /> : <DrBar />}
            <div className="content-wrapper">
                <div className="container-fluid">
                    {children}
                </div>
            </div>
            <Footer/>
        </Fragment>
    );
};
const mapStateToProps=state=>({
    type:state.auth.type
})
export default connect(mapStateToProps)(Layout);
