import React from "react";
import "../Components/init";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../SocketContext";
import { message } from "antd";

import "../Styles/join.css";
import Spinner from "../Components/Spinner";
import Navbar from "../Components/Navbar";

const Join = () => {
  const {
    callAccepted,
    name,
    setName,
    stream,
    setStream,
    callUser,
    meetingCode,
    setMeetingCode,
    newMeet,
  } = useContext(SocketContext);

  const myVideo = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!newMeet && meetingCode.length === 0) {
      console.log("No meeting code found");
      navigate("/");
      window.location.reload();
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => {
        res.getAudioTracks()[0].enabled = false;
        setStream(res);
        if (myVideo.current) {
          myVideo.current.srcObject = res;
        }
      });
  }, []);

  useEffect(() => {
    if (callAccepted) navigate("/meet");
  }, [callAccepted]);

  return (
    <>
      <Navbar />
      <div className="joinpage pt-4 flex items-center justify-center p-6 bg-[#211951] min-h-screen">
        <div className="border border-gray-500 text-center flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
          <div className="video-div w-full mb-6">
            {stream ? (
              <video
                ref={myVideo}
                autoPlay
                muted
                className="w-full rounded-lg border border-gray-300"
              ></video>
            ) : (
              <Spinner />
            )}
          </div>
          {stream && (
            <div className="w-full flex flex-col items-center">
              <input
                className="w-96 px-4 py-3 mb-4 rounded-lg box-border text-black"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div className="join-btns-div flex space-x-4">
                {newMeet ? (
                  <button
                    className="btn w-40 rounded-xl font-bold uppercase hover:bg-black hover:text-white p-4 bg-[#7E30E1] text-white"
                    onClick={() => {
                      if (name.trim().length === 0) {
                        message.error("Please enter your name");
                        return;
                      }
                      navigate("/meet");
                    }}
                  >
                    Start
                  </button>
                ) : (
                  <button
                    className="btn w-40 rounded-xl font-bold uppercase hover:bg-black hover:text-white p-4 bg-[#7E30E1] text-white"
                    onClick={() => {
                      if (name.trim().length === 0) {
                        message.error("Please enter your name");
                        return;
                      }
                      console.log("Join now button clicked");
                      console.log(meetingCode);
                      callUser(meetingCode);
                    }}
                  >
                    Join now
                  </button>
                )}
                <button
                  className="btn w-40 rounded-xl font-bold uppercase hover:bg-black hover:text-white p-4 bg-[#7E30E1] text-white"
                  onClick={() => {
                    setMeetingCode("");
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Join;
