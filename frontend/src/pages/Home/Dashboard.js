import React from "react";
import styles from "../../styles/dashboard.module.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
const Dashboard = () => {
  const [isActive, setIsActive] = useState(true);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const handleClick = (event) => {
    setIsActive(true);
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
  };
  const handleClick1 = (event) => {
    setIsActive(false);
    setIsActive1(true);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
  };
  const handleClick2 = (event) => {
    setIsActive(false);
    setIsActive1(false);
    setIsActive2(true);
    setIsActive3(false);
    setIsActive4(false);
  };
  const handleClick3 = (event) => {
    setIsActive(false);
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(true);
    setIsActive4(false);
  };
  const handleClick4 = (event) => {
    setIsActive(false);
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(true);
  };

  return (

    <div>
      <div className={styles.container}>
        <div className={styles.navigation}>
          <ul>
            <li className={isActive ? styles.active : ''} onClick={handleClick}>
              <Link to="#">
                <span className={styles.icon}>
                  <HomeIcon fontSize="large" />
                </span>
                <span className={styles.text}>Home</span>
              </Link>
            </li>
            <li className={isActive1 ? styles.active : ''} onClick={handleClick1}>
              <Link to="#">
                <span className={styles.icon}>
                  <PersonIcon fontSize="large" />
                </span>
                <span className={styles.text}>Profile</span>
              </Link>
            </li>
            <li className={isActive2 ? styles.active : ''} onClick={handleClick2}>
              <Link to="#">
                <span className={styles.icon}>
                  <CameraAltIcon fontSize="large" />
                </span>
                <span className={styles.text}>capture</span>
              </Link>
            </li>
            <li className={isActive3 ? styles.active : ''} onClick={handleClick3}>
              <Link to="#">
                <span className={styles.icon}>
                  <CalendarMonthIcon fontSize="large" />
                </span>
                <span className={styles.text}>Diet</span>
              </Link>
            </li>
            <li className={isActive4 ? styles.active : ''} onClick={handleClick4}>
              <Link to="#">
                <span className={styles.icon}>
                  <MenuIcon fontSize="large" />
                </span>
                <span className={styles.text}>recommended</span>
              </Link>
            </li>
            <div className={styles.indicator}></div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
