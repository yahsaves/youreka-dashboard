// -- React Imports
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// -- Asset/Style Imports
import './styles.scss';
import logo from 'Assets/logo.svg';
// -- Component Imports
import NavigationList from './NavigationList';
// -- Interface Imports
import {  FocusPage } from 'globalInterfaces';



function NavBar( { pages, focusPage }:FocusPage ) {
  return (
    <div className="NavBar">
      <div className="NavBar_Inner">
        {/* Logo */}
        <div className="NavBar_Logo">
          <img src={ logo } alt="Logo" />
        </div>
        {/* Navigation List */}
        <Routes>
          <Route path={"*"} element={ <NavigationList pages={pages} focusPage={focusPage} /> } />
        </Routes>
      </div>
    </div>
  );
}
export default NavBar;



// function loopOverPages(pages: Page[]){
//   return (
//     <>
//       {/* pages.map(page: Page => {
//         return <Route path={"/"+page.name} element={ <NavigationList pages={page} pageName={page.name} /> } />
//       }) */}
//     </>
//   )
// }