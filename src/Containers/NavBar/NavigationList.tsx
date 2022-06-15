// -- React Imports
import React from 'react';
import { Link } from 'react-router-dom';
// -- Asset/Style Imports
import { Icon } from 'Assets/icons';
import './styles.scss';
// -- Interface Imports
import { Page, FocusPage } from 'globalInterfaces';
// -- Helper Imports
import { capitalizeFirstLetter } from 'Utils/helpers';



// -- Export Component --
// **********************
function NavigationList( { pages, focusPage }: FocusPage ) {
  return(
    <nav className="NavBar_List">

      {pages.map(function(page: Page){
        return (
          <Link key={page.name} to={"/" + page.name}>
            <div className={"NavBar_Link " + (focusPage===page.name ? '--active' : '')}>
              <Icon name={page.icon} /> <span> {capitalizeFirstLetter(page.name)} </span> 
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
export default NavigationList;