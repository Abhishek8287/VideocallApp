import React, { useContext, useState, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import { useNavigate } from "react-router-dom"; // Import useHistory
import PropTypes from "prop-types"; // Import PropTypes
import "../Components/init";
import Editor from "../Components/Editor";
import Options from "../Components/Options";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import "../Styles/Meet.css";
import homeIcon1 from "../assets/home.png";
import noteIcon from "../assets/note.png";
import Spinner from "../Components/Spinner";
import Navbar from "../Components/Navbar";
import saveAs from "file-saver";
import { pdfExporter } from "quill-to-pdf";
import { message } from "antd";
import GetAppIcon from "@mui/icons-material/GetApp";

const Meet = (props) => {
  const {
    me,
    call,
    callAccepted,
    callEnded,
    name,
    myVideo,
    userVideo,
    stream,
    setStream,
    myVideoStatus,
    myMicStatus,
    userVideoStatus,
    userMicStatus,
    showEditor,
    otherUserStream,
    otherUser,
    otherUserName,
    quill,
    setQuill,
  } = useContext(SocketContext);

  const [mobileView, setMobileView] = useState(false);
  const [loading, setLoading] = useState(true);

  const resize = () => {
    setMobileView(window.innerWidth <= 600);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
  }, []);
  // console.log(me,otherUser)

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    if (stream) {
      myVideo.current.srcObject = stream;
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => {
        res.getAudioTracks()[0].enabled = false;
        setStream(res);
        myVideo.current.srcObject = res;
      });
  }, [loading]);

  useEffect(() => {
    if (myVideo.current) myVideo.current.srcObject = stream;
  }, [myVideoStatus]);

  useEffect(() => {
    if (userVideo.current) userVideo.current.srcObject = otherUserStream;
    // console.log(otherUserStream)
  }, [otherUserStream, userVideoStatus, loading]);

  const downloadPdf = async () => {
    const delta = quill.getContents();
    const pdfAsBlob = await pdfExporter.generatePdf(delta);
    message.success("Downloading your whiteboard");
    saveAs(pdfAsBlob, `Interview.pdf`);
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        <Spinner starting />
      </div>
    );
  }
  return (
    <div className={showEditor ? "flex-div" : "flex-div hide-editor"}>
      <div className="left">
        <Navbar />
        <div className="video-div">
          {" "}
          <div
            className={callAccepted ? "video-frames " : "video-frames v-size"}
          >
            <div className="video-frame w-full">
              {stream ? (
                <>
                  {myMicStatus ? <MicIcon /> : <MicOffIcon />}
                  {myVideoStatus ? (
                    <video
                      className="video-ref rounded-lg"
                      src=""
                      ref={myVideo}
                      autoPlay
                      muted
                    ></video>
                  ) : (
                    <div className="video-ref img-bg w-full  border border-gray-300">
                      <img src={homeIcon1} />
                    </div>
                  )}
                  <div className="name bg-black text-white">{name} (you)</div>
                </>
              ) : (
                <Spinner />
              )}
            </div>

            {callAccepted && (
              <div className="video-frame">
                {userMicStatus ? <MicIcon /> : <MicOffIcon />}
                {userVideoStatus ? (
                  <video
                    width="250"
                    height="140"
                    src=""
                    className="video-ref rounded-lg"
                    ref={userVideo}
                    autoPlay
                    // muted
                  ></video>
                ) : (
                  <div className="video-ref img-bg">
                    <img src={homeIcon1} />
                  </div>
                )}
                <div className="name bg-black text-white">{otherUserName}</div>
              </div>
            )}
          </div>
        </div>
        <div className="bar">
          <Options history={props.history} />
        </div>
      </div>
      {!mobileView && showEditor && (
        <div className="right">
          <div className="editor-div">
            <div className="head">
              <div className="head-title">
                <img src={noteIcon} alt="" />
                <h3>Whiteboard</h3>
              </div>
              <button
                className="download"
                onClick={() => downloadPdf()}
                title="Download whiteboard"
              >
                <GetAppIcon />
              </button>
            </div>
            <Editor />
          </div>
        </div>
      )}
    </div>
  );
};

export default Meet;
