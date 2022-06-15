// -- React Imports
import React from 'react';
// -- Assest/Style Imports
import './styles.scss';
// -- Component Imports
import Icon from 'Assets/icons';
// -- Helper Imports
import { lowerCaseFirstLetter } from 'Utils/helpers';



// -- Define Interfaces
interface TitleSorterProps {
  name: string;
  description: string;
  inUse: boolean;  
  direction: string;
  onClick: any;
}

// -- Define AccountList ---
// *************************
function TitleSorter( props : TitleSorterProps ) {
  return (
    <div className={"AccountsList_Property --" + lowerCaseFirstLetter(props.name)} onClick={ () => props.onClick(props.name) }>
      {props.description}
      {props.inUse && props.direction === 'assending' && <Icon className="AccountsList_Icon" name="chevronDown" />}
      {props.inUse && props.direction === 'dessending' && <Icon className="AccountsList_Icon" name="chevronUp" />}
    </div>
  );
}

export default TitleSorter;