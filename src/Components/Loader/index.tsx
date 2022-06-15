import React from 'react';
// -- Assest/Style Imports
import './styles.scss';

// -- Define Interfaces
interface LoaderProps {
  hide?: boolean;  
}

// -- Define Loader ---
// *******************
function Loader( props:LoaderProps ){
  return(
    <div className={props.hide ? "loader --hide" : 'loader'}>
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
