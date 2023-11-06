import React, { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import Navbar from "../component/Navbar";

function JustificationPage() {
  const [justification, setJustification] = useState('');
  const location = useLocation();

  useEffect(() => {
      setJustification(location.state.justification)
  }, [location.state.justification]);

  return (
    <div className="default">
        <Navbar/>
      <div className="center_text">
        <div dangerouslySetInnerHTML={{__html:justification}}/>
      </div>
    </div>
  );
}

export default JustificationPage;
