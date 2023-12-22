import React, { useState } from "react";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import MainPanel from "./MainPanel/MainPanel";
import BottomNav from "./BottomNav/BottomNav";
import "./HomePage.css";
function HomePage() {
  return (
    <div className="relative flex flex-row justify-between w-full h-max">
      <LeftPanel currentpath={""} />
      <MainPanel />
      <RightPanel />
      <BottomNav path={""} />
    </div>
  );
}

export default HomePage;
