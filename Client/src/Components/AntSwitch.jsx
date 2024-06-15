import React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const AntSwitch = styled((props) => <Switch {...props} />)(({ theme }) => ({
  root: {
    width: 44,
    height: 24,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: theme.palette.common.white,
      "& + .MuiSwitch-track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 22,
    height: 22,
  },
  track: {
    borderRadius: 24 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
}));

export default AntSwitch;
