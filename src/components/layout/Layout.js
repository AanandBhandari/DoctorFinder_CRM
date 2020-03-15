import React, { Fragment } from "react";
import HosBar from "./navbar/HosBar";
import DrBar from "./navbar/DrBar";
import Footer from "./Footer";

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
export default Layout;
