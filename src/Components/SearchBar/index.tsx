// -- React Imports
import React, { useState } from 'react';
// -- Assest/Style Imports
import './styles.scss';
// -- Component Imports
import { Icon } from 'Assets/icons';


// -- Define Interfaces
interface SearchBarProps {
  onSearch: Function;
}

// -- Define SearchBar ---
// ***********************
function SearchBar( props:SearchBarProps ) {

  // Use State To Set --active Class
  const [inputFocus, setInputFocus] = useState('');
  function onInputFocus(){
    setInputFocus('--active');
  }
  function onInputBlur(){
    setInputFocus('');
  }

  // Use State To Set Input Value
  const [inputValue, setInputValue] = useState('');
  
  function inputChange(changeEvent: any){
    let searchValue = changeEvent.target.value;
    setInputValue(searchValue);
    if(props.onSearch){
      props.onSearch(searchValue);
    }
  }

  function clearInput(){
    setInputValue('');
    if(props.onSearch){
      props.onSearch('');
    }
  }


  return (
    <div className={"SearchBar " + inputFocus}>
      <Icon className="searchIcon" name="search" />
      <Icon className="closeIcon" name="close" onClick={clearInput}/>
      <input type="text" placeholder="Search Accounts" onFocus={onInputFocus} onBlur={onInputBlur} onChange={inputChange} value={inputValue} />
    </div>
  );
}

export default SearchBar;