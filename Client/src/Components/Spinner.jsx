import React from "react";
import { Spin } from "antd";

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-full z-30">
      <Spin size="large" />
    </div>
  );
}

export default Spinner;
