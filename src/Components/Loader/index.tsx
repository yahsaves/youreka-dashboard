import React, { useState } from 'react'; 
// -- Assest/Style Imports
import './styles.scss';
// -- Helper Assets
import { delayRAF } from 'Utils/helpers';

// -- Define Interfaces
interface LoaderProps {
  hide?: boolean;  
}

// -- Define Loader ---
// *******************
function Loader( props:LoaderProps ){

  // Delay showing the loader by 1 RAF (incase the loader is called but not needed)
  const [delayLoader, setDelayLoader] = useState(true);
  delayRAF().then(()=>{
    setDelayLoader(false);
  })


  return(
    <div className={(props.hide || delayLoader) ? "loader --hide" : 'loader'}>
      <div className="loader_inner sk-chase">
        <div className="loader_dots sk-chase-dot"></div>
        <div className="loader_dots sk-chase-dot"></div>
        <div className="loader_dots sk-chase-dot"></div>
        <div className="loader_dots sk-chase-dot"></div>
        <div className="loader_dots sk-chase-dot"></div>
        <div className="loader_dots sk-chase-dot"></div>
      </div>
    </div>
  );
}
export default Loader;
