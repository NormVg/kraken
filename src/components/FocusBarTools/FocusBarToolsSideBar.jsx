import React, { useContext } from "react";
import sidebar from "../../assets/icons/sideba.png";
import { EditorSidebarToggleContext } from "../../context/EditorContext";

function FocusBarToolsSideBar() {
  const Estc = useContext(EditorSidebarToggleContext);

  return (
    <div id="focus-bar-tools" onClick={Estc.EstToggle}>
      <img src={sidebar} />
    </div>
  );
}

export default FocusBarToolsSideBar;
