import React from "react";
import { RingLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <RingLoader  color="#FF7F50" />
    </div>
  );
};

export default Spinner;
