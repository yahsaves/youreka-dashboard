// -- React Imports
import React from 'react';
// -- Assest/Style Imports
import './styles.scss';
// -- Component Imports
import SearchBar from 'Components/SearchBar';


// -- Define Interfaces
interface TitleBarProps {
  title: string;  
  onSearch?: any;
}


// -- Define TitleBar ----
// ***********************
function TitleBar( props:TitleBarProps ) {
  return (
    <div className="TitleBar">
      <div className="TitleBar_Title">{props.title}</div>
      <div className="TitleBar_Search">
        {props.onSearch && <SearchBar onSearch={props.onSearch} />}
      </div>
    </div>
  );
}


export default TitleBar;