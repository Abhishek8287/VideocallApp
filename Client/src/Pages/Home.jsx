import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/Home.css";
import Homevideo from "../assets/hero-globe-dark.mp4";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import homeIcon from "../assets/home.png";
import homeIcon1 from "../assets/home.png";
import noteIcon from "../assets/note2.png";

import ChatIcon from "@mui/icons-material/Chat";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SurroundSoundIcon from "@mui/icons-material/SurroundSound";
import DuoIcon from "@mui/icons-material/Duo";
import { Link } from "react-router-dom";
import { message } from "antd";
import { SocketContext } from "../SocketContext";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paramsCode = location.search;

  const { meetingCode, setMeetingCode, setNewMeet } = useContext(SocketContext);
  useEffect(() => {
    if (paramsCode.length) {
      if (paramsCode.substring(0, 5) == "?ref=") return;
      setMeetingCode(paramsCode.substring(1));
    }
    setNewMeet(null);
  }, []);

  return (
    <>
      <div className="home">
        <Navbar />
        <div className="container w-full bg-[#000000] text-white px-36  flex">
          <div className="lg:w-[50%]">
            <div>
              <h1
                data-text="CODE, CREATE, CONQUER."
                className="code font-bold  uppercase text-[40px] lg:text-[80px] text-center lg:text-start max-w-[500px] text-[#7E30E1]"
              >
                Code,
                <br className="hidden lg:block" />
                Create,
                <br className="hidden lg:block" />
                Conquer.
              </h1>
            </div>
            <div className="enter">
              <div className="input">
                <input
                  className="w-96 px-4 py-3 mt-5 mb-5 rounded-lg box-border text-black font-bold "
                  type="text"
                  placeholder="Enter Meeting Code"
                  value={meetingCode || ""}
                  onChange={(e) => {
                    setMeetingCode(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="buttons">
                <Link to="join">
                  <button
                    className=" w-40 rounded-xl font-bold uppercase  hover:bg-white hover:text-black p-4 bg-[#7E30E1] m-5"
                    onClick={() => {
                      setNewMeet(true);
                    }}
                  >
                    Start Meeting
                  </button>
                </Link>

                <button
                  className=" w-40 rounded-xl font-bold uppercase  hover:bg-white hover:text-black p-4 bg-[#7E30E1]  ml-3 "
                  onClick={() => {
                    if (!meetingCode || meetingCode.trim().length === 0) {
                      message.error("Please enter the meeting code");
                      return;
                    }
                    navigate("/join");
                  }}
                >
                  Join meeting
                </button>
              </div>
            </div>
          </div>
          <div className="right">
            <video
              src={Homevideo}
              id="video"
              alt="video"
              autoPlay
              muted
              loop
            ></video>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
