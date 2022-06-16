// -- React Imports
import React from 'react';
// -- Assest/Style Imports
import './styles.scss';
// -- Component Imports
import SearchBar from 'Components/SearchBar';
import Icon from 'Assets/icons';


// -- Define Interfaces
interface TitleBarProps {
  title: string;  
  onSearch?: Function;
  onRefresh?: Function;
}


// -- Define TitleBar ----
// ***********************
function TitleBar( props:TitleBarProps ) {  

  function callRefresh(){
    if(props.onRefresh){
      props.onRefresh(true);
    }
  }

  return (
    <div className="TitleBar">
      <div className="TitleBar_Title">
        {props.title}
      </div>
      <div className="TitleBar_Helpers">
        <div className="TitleBar_Search">
          {props.onSearch && <SearchBar onSearch={props.onSearch} />}
        </div>
        {props.onRefresh && <Icon className="TitleBar_Icon" name="refresh" onClick={callRefresh} />}
      </div>
    </div>
  );
}


export default TitleBar;