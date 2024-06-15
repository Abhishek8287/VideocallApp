import React, { useState, useEffect, useContext } from "react";
import { message } from "antd";
import { SocketContext } from "../SocketContext";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Menu, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";
import { jsPDF } from "jspdf";
import "../Styles/Notes.css";
import Tooltip from "@mui/material/Tooltip";

const Notes = () => {
  const { notes, setNotes } = useContext(SocketContext);
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
    console.log("notes clicked");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const downLoadAsPdf = () => {
    if (notes.trim().length === 0) {
      message.error("Please write some text to download");
      return;
    }
    const pdfDoc = new jsPDF();
    pdfDoc.text(notes, 10, 10);
    message.success("Your notes are downloading");
    pdfDoc.save("meet_notes.pdf");
  };

  return (
    <>
      {!mobileView && (
        <button className="tooltip" type="button" onClick={handleClick}>
          <EventNoteIcon />
          <span className="tooltiptext">Notes</span>
        </button>
      )}
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className="notes">
          <div className="btn-div">
            <div>
              <h3>Notes</h3>
            </div>
            <div className="flex-btns-div">
              <button type="button" onClick={downLoadAsPdf}>
                <GetAppIcon />
              </button>
              <button type="button" onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>
          </div>
          <textarea
            type="text"
            placeholder="You can take your notes here"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </Menu>
    </>
  );
};

export default Notes;
