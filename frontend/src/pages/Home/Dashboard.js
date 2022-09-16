import React from "react";
import "../../styles/dashboard.css";
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
      <div className="container">
        <div className="navigation">
          <ul>
            <li className={isActive ? 'active' : ''} onClick={handleClick}>
              <Link to="#">
                <span className="icon">
                  <HomeIcon fontSize="large" />
                </span>
                <span className="text">Home</span>
              </Link>
            </li>
            <li className={isActive1 ? 'active' : ''} onClick={handleClick1}>
              <Link to="#">
                <span className="icon">
                  <PersonIcon fontSize="large" />
                </span>
                <span className="text">Profile</span>
              </Link>
            </li>
            <li className={isActive2 ? 'active' : ''} onClick={handleClick2}>
              <Link to="#">
                <span className="icon">
                  <CameraAltIcon fontSize="large" />
                </span>
                <span className="text">capture</span>
              </Link>
            </li>
            <li className={isActive3 ? 'active' : ''} onClick={handleClick3}>
              <Link to="#">
                <span className="icon">
                  <CalendarMonthIcon fontSize="large" />
                </span>
                <span className="text">Diet</span>
              </Link>
            </li>
            <li className={isActive4 ? 'active' : ''} onClick={handleClick4}>
              <Link to="#">
                <span className="icon">
                  <MenuIcon fontSize="large" />
                </span>
                <span className="text">Lorem</span>
              </Link>
            </li>
            <div className="indicator"></div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
