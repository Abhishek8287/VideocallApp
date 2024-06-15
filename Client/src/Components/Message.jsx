import React from "react";
import { SocketContext } from "../SocketContext";
import "../Styles/Messages.css";
import { useContext } from "react";

const Message = (props) => {
  const { me } = useContext(SocketContext);

  return (
    <div
      className={props.message.user == me ? "message-div tr" : "message-div tl"}
    >
      <div className={props.message.user == me ? "message" : "message bg-dark"}>
        {" "}
        {props.message.text}
      </div>
    </div>
  );
};

export default Message;
