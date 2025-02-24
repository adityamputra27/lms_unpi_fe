import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./LectureSidebarContent";

import { Link } from "react-router-dom";
import logoLightPng from "../../assets/images/unpi/logo.png";
import LectureSidebarContent from "./LectureSidebarContent";
import StudentSidebarContent from "./StudentSidebarContent";

const Sidebar = (props) => {
  const pathnameURL = window.location.pathname.split('/')

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box d-flex align-items-center justify-center p-1">
          <Link to="/" className="logo logo-light ms-3">
            <span className="logo-lg">
              <img src={logoLightPng} alt="" height="35" />
            </span>
          </Link>

          <div className="d-flex flex-column text-left justify-content-start align-items-start ps-3">
            <span className="text-white fw-bolder fs-3">E-Learning</span>
            <span className="text-white">UNPI Cianjur</span>
          </div>
        </div>
        <div data-simplebar className="h-100">
          {pathnameURL[1] === "lecture" ? <LectureSidebarContent /> : <StudentSidebarContent />}
        </div>

        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
