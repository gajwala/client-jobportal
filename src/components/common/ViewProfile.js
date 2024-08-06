import React from "react";
import { FaUser } from "react-icons/fa";

const ViewProfile = () => {
  return (
    <div>
      <div className="flex" style={{ alignItems: "center" }}>
        <div className="p-4 border rounded-full bg-slate-300">
          <FaUser fontSize={"3rem"} />{" "}
        </div>
        <div>
          <p className="font-bold ml-5 text-xl">Balachandraiah Gajwala</p>
          <p className="font-bold ml-5 text-sm">Senior Frontend Engineer</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
