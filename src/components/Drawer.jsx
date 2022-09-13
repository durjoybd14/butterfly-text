import { signOut } from "firebase/auth";
import { Dropdown } from "flowbite-react";
import React, { useContext } from "react";
import { IconContext } from "react-icons";

import {
  HiOutlineMenu,
  HiOutlinePhone,
  HiOutlineVideoCamera,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
import { auth } from "../firebase";
import useOutSideClick from "../Hooks/useOutSideClick";
import Chat from "./Chat";
import "./Navbar.scss";
import Sidebar from "./Sidebar";

function Drawer() {
  const { data } = useContext(ChatContext);
  const { isActive, menuRef, toggleActive } = useOutSideClick();
  return (
    <div className="drawer">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="/" className="flex items-center justify-around menu-bars">
            <HiOutlineMenu onClick={toggleActive} />
            <p className="m-5 text-xl text-white">ButterFly</p>
          </Link>
          <div>
            <div className="flex items-center justify-between p-5">
              <div className="mr-8">
                <HiOutlineVideoCamera />
              </div>
              <div className="mr-5">
                <HiOutlinePhone />
              </div>
              <div className="mr-5 py-0">
                <Dropdown inline={true}>
                  <Dropdown.Header>
                    <div className="flex justify-center items-center">
                      <div className="px-2">
                        {data?.user?.photoURL ? (
                          <img
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            src={data?.user?.photoURL}
                            alt="Profile"
                          />
                        ) : (
                          <p className="text-gray-500 text-center">
                            No friend was selected yet
                          </p>
                        )}
                      </div>

                        <div className="block text-sm px-2">
                          {data?.user?.displayName}
                      </div>
                    </div>
                  </Dropdown.Header>
                  <div
                    className="block py-2 text-center text-white bg-blue-500 hover:bg-blue-700 cursor-pointer"
                    onClick={() => signOut(auth)}
                  >
                    Logout
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <nav
          className={isActive ? "nav-menu active" : "nav-menu"}
          ref={menuRef}
        >
          <div className="nav-menu-items">
            <div id="sidebar">
              <Sidebar />
            </div>
          </div>
        </nav>
      </IconContext.Provider>
      <div id="chat">
        <Chat></Chat>
      </div>
    </div>
  );
}

export default Drawer;
