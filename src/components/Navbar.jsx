import React, { useContext } from "react";
import { HiMoon } from "react-icons/hi";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="navbar" style={{height:'9vh'}}>
        <div className="flex justify-center items-center">
        <svg
          enableBackground="new 0 0 24 24"
          height="24px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 24 24"
          width="32px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="icon">
            <circle cx="12" cy="12" fill="#5476CC" r="11" />
            <path
              d="M8.623,18.2C7.8548,18.2,7.2,17.7178,7.2,16.6249c0,-1.6872,1.452,-2.9685,2.1107,-3.3309c0,0,0.9217,0.531,1.8779,0.8726c-1.8999,-1.202,-3.1139,-3.3922,-3.1139,-5.823c0,-2.2718,1.1991,-3.2946,2.2818,-3.2946c0.8709,0,2.9357,0.9581,2.9357,4.6344C13.2922,13.6393,11.228,18.2,8.623,18.2L8.623,18.2zM11.9431,16.9465c0,0.5733,0.2003,0.7978,0.5065,0.7978c0.7663,0,1.9871,-1.7885,1.9407,-3.6663c1.1619,-1.2257,2.5547,-3.1458,2.5547,-4.6837c0,-0.3723,-0.1056,-0.6857,-0.5468,-0.6857c-0.6746,0,-1.6385,1.1627,-2.25,2.3172c-0.5897,1.1961,-1.1413,2.5603,-1.8735,4.4327C12.1037,15.9281,11.9431,16.4969,11.9431,16.9465L11.9431,16.9465z"
              fill="#FFFFFF"
            />
            <path
              d="M4.2218,19.7782C6.2124,21.7688,8.9624,23,12,23c6.0751,0,11,-4.9249,11,-11c0,-3.0376,-1.2312,-5.7876,-3.2218,-7.7782L4.2218,19.7782z"
              fill="#fffffff"
              opacity="0.1"
            />
          </g>
        </svg>
        <span className="text-xl text-white">ButterFly</span>
        </div>
        <HiMoon />
      </div>
      <div className="flex flex-col justify-center items-center text-white text-sm mt-6">
        <img
          style={{
            height: "90px",
            width: "90px",
            borderRadius: "5rem",
            objectFit: "cover",
          }}
          src={currentUser.photoURL}
          alt="User-Profile"
        />
      </div>
      <div className="px-3 py-5" style={{ color: "lightgray" }}>
        <p>{currentUser.displayName}</p>
        <p>{currentUser.email}</p>
      </div>
    </>
  );
};

export default Navbar;
