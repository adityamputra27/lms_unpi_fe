import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link, useLocation } from "react-router-dom";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import { useCallback } from "react";

const LectureSidebarContent = props => {
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
    <SimpleBar className="h-100" ref={ref}>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li className="menu-title">{props.t("Menu Utama")} </li>
          <li>
            <Link to="/#" className="has-arrow">
              <i className="bx bx-home"></i>
              <span>{props.t("Dashboard")}</span>
            </Link>
            <ul className="sub-menu">
              <li>
                <Link to="#">{props.t("Board")}</Link>
              </li>
              <li>
                <Link to="#">{props.t("Statistik Saya")}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/#" className="has-arrow">
              <i className="bx bx-book"></i>
              <span>{props.t("Pembelajaran Saya")}</span>
            </Link>
            <ul className="sub-menu">
              <li>
                <Link to="#">{props.t("Daftar Mata Kuliah")}</Link>
              </li>
              <li>
                <Link to="#">{props.t("Daftar Pembelajaran")}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/#" className="has-arrow">
              <i className="bx bx-task"></i>
              <span>{props.t("Tugas Saya")}</span>
            </Link>
            <ul className="sub-menu">
              <li>
                <Link to="#">{props.t("Daftar Tugas")}</Link>
              </li>
              <li>
                <Link to="#">{props.t("Tugas yang Diserahkan")}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/#">
              <i className="bx bx-clipboard"></i>
              <span>{props.t("Presensi Saya")}</span>
            </Link>
          </li>
          <li>
            <Link to="/#">
              <i className="bx bx-chart"></i>
              <span>{props.t("Rekap Nilai")}</span>
            </Link>
          </li>
          <li>
            <Link to="/#" className="has-arrow">
              <i className="bx bx-message-square-dots"></i>
              <span>{props.t("Diskusi & Forum")}</span>
            </Link>
            <ul className="sub-menu">
              <li>
                <Link to="#">{props.t("Daftar Forum")}</Link>
              </li>
              <li>
                <Link to="#">{props.t("Diskusi Saya")}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/#" className="has-arrow">
              <i className="bx bx-file"></i>
              <span>{props.t("Materi Belajar")}</span>
            </Link>
            <ul className="sub-menu">
              <li>
                <Link to="#">{props.t("Materi Tambahan")}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#" >
              <i className="bx bx-calendar"></i>
              <span>{props.t("Jadwal Kelas")}</span>
            </Link>
          </li>

          <li>
            <Link to="#" >
              <i className="bx bx-bell"></i>
              <span>{props.t("Pengumuman")}</span>
            </Link>
          </li>
          <li>
            <Link to="#" >
              <i className="bx bx-help-circle"></i>
              <span>{props.t("Bantuan")}</span>
            </Link>
          </li>
        </ul>
      </div>
    </SimpleBar>
  </React.Fragment>
  );
};

LectureSidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(LectureSidebarContent));
