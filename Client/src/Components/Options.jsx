import React, { useContext, useState, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import CopyToClipboard from "react-copy-to-clipboard";
//import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import "../Styles/Options.css";
import Menu from "@mui/material/Menu";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Button, Calendar, message } from "antd";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CallEndIcon from "@mui/icons-material/CallEnd";
import ChatIcon from "@mui/icons-material/Chat";
import Messages from "./Messages";
import Notes from "./Notes";
import CloseIcon from "@mui/icons-material/Close";
import AntSwitch from "./AntSwitch";
import { APP_URL } from "../Constant";

const Options = (props) => {
  const [callId, setCallId] = useState("");

  const {
    me,
    call,
    callAccepted,
    callEnded,
    name,
    setCall,
    setName,
    myVideo,
    userVideo,
    stream,
    answerCall,
    callUser,
    endCall,
    myVideoStatus,
    myMicStatus,
    userVideoStatus,
    userMicStatus,
    updateMicStatus,
    updateVideoStatus,
    showEditor,
    showChatBox,
    setShowChatBox,
    setShowEditor,
    notesOpen,
    setNotesOpen,
  } = useContext(SocketContext);

  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const resize = () => {
    setMobileView(window.innerWidth <= 600);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (call && call.isRecievedCall && !callAccepted) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [call, callEnded]);

  return (
    <>
      <div className={showEditor ? "options" : "options w100"}>
        <button className="tooltip" onClick={handleClick}>
          <MoreVertIcon />
          <span className="tooltiptext">Options</span>
        </button>

        <button
          onClick={() => updateVideoStatus()}
          className={!myVideoStatus ? "bg-grey tooltip" : "bg-white tooltip"}
        >
          {myVideoStatus ? <VideocamIcon /> : <VideocamOffIcon />}
          <span className="tooltiptext">
            {myVideoStatus ? "Turn off video" : "Turn on video"}
          </span>
        </button>

        {/* {callAccepted && !callEnded && ( */}

        <button
          className="red-btn tooltip"
          type="primary"
          onClick={() => {
            endCall(props.history);
          }}
        >
          <CallEndIcon />
          <span className="tooltiptext">End call</span>
        </button>

        {/* )} */}

        <button
          onClick={() => updateMicStatus()}
          type="primary"
          className={!myMicStatus ? "bg-grey tooltip" : "bg-white tooltip"}
        >
          {" "}
          {myMicStatus ? <MicIcon /> : <MicOffIcon />}
          <span className="tooltiptext">
            {myMicStatus ? "Turn off mic" : "Turn on mic"}
          </span>
        </button>

        <button
          className="tooltip"
          type="primary"
          onClick={() => setShowChatBox(!showChatBox)}
        >
          <ChatIcon />
          <span className="tooltiptext">Chat</span>
        </button>

        <Notes />

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <div className="options-menu">
            <div className="btn-div">
              <h3>Options</h3>
              <button type="primary" onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>
            <h3 className="name">
              <span className="bg-black font-bold text-white">Hi, {name}</span>
            </h3>
            <div>
              <input
                type="text"
                readOnly
                value={`${APP_URL}?${me}`}
                style={{ marginBottom: "1rem" }}
              />
              <br />
              <CopyToClipboard
                text={`${APP_URL}?${me}`}
                onCopy={() => {
                  message.success("Url Copied");
                }}
              >
                <Button type="primary  bg-[#7E30E1]">Copy Link</Button>
              </CopyToClipboard>
              <h3 style={{ padding: "10px 0 0px 0" }}>Or</h3>
              <CopyToClipboard
                text={me}
                onCopy={() => {
                  message.success("Id Copied");
                }}
              >
                <Button type="primary  bg-[#7E30E1]">Copy ID</Button>
              </CopyToClipboard>
            </div>

            {!mobileView && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <h3
                  style={{
                    margin: "auto 0",
                  }}
                >
                  Interview mode
                </h3>
                <AntSwitch
                  style={{
                    margin: "auto 0",
                  }}
                  checked={showEditor}
                  onChange={() => {
                    message.info(
                      `Switched to ${showEditor ? "normal" : "interview"} mode`
                    );
                    setShowEditor(!showEditor);
                  }}
                />
              </div>
            )}

            {/* <div>
              <input
                type='text'
                placeholder='Enter Id to call'
                value={callId}
                onChange={(e) => setCallId(e.target.value)}
              />
            </div> */}

            {/* {!callAccepted && !callEnded && ( */}
            {/* <div>
              <Button type='primary' onClick={() => callUser(callId)}>
                Join
              </Button>
            </div> */}
            {/* )} */}
          </div>
        </Menu>

        {call && (
          <Dialog open={open} aria-labelledby="draggable-dialog-title">
            <DialogTitle>Meet Call</DialogTitle>
            <DialogContent>
              <div className="call-div">
                <p>{call.callerName} wants to join with you</p>
                <div className="flex">
                  <Button
                    className=" bg-[#7E30E1]"
                    type="primary"
                    onClick={() => {
                      answerCall();
                      setOpen(false);
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    className="bg-[#7E30E1]"
                    type="primary"
                    onClick={() => {
                      endCall();
                      setOpen(false);
                    }}
                  >
                    Deny
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <Messages />
      </div>
    </>
  );
};

export default Options;
