import React, { useEffect, useState } from "react";
import GridBackground from "../components/ui/grid";
import Logout from "../components/Logout";
import ModeToggle from "../components/ui/mode-toggle";

export const Landing = () => {


  return (
    <GridBackground>
      <Logout/>
      <ModeToggle/>
    </GridBackground>
  );
};

export default Landing;
