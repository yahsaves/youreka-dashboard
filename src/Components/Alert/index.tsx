// -- React Imports
import React, { useState } from 'react'; 
// -- Assest/Style Imports
import './styles.scss';


// -- Define Interfaces
interface AlertProps {
  message: string;  
}

// -- Define AccountList ---
// *************************
function Alert( props : AlertProps ) {

  const [showAlert, setShowAlert] = useState(true);

  function hideAlert(){
    setShowAlert(false);
  }

  if(showAlert){
    return (
      <div className="Alert">
        <div className="Alert_Backdrop"></div>
        <div className="Alert_Box">
          <div className="Alert_Message">{props.message}</div>
          <div className="Alert_Close" onClick={hideAlert}>Okay</div>
        </div>
      </div>
    );
  }else{
    return <></>
  }
  
}

export default Alert;