// -- React Imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// -- Assest/Style Imports
import 'index.scss';
// -- Component Imports
import NavBar from 'Containers/NavBar';
import AccountsPage from 'Containers/Pages/AccountsPage';
import AnalyticsPage from 'Containers/Pages/AnalyticsPage';
// -- Interface Imports
import { Page } from 'globalInterfaces';



// -- Define App ---------
// ***********************
function App() {
  let pages = generatePages();
  return (
    <Router>
      <div className="pageLayout">

        {/* Navigation Bar */}
        { buildNavigationLinks(pages) }
        
        {/* Page Display */}
        <div className='pageLayout_Inner'>
        { buildPages(pages) }
        </div>
        
      </div>
    </Router>   
  );
}
export default App;

/**
 * Creates NavBar Components Based On The Pages Array
 * @param pages - An Array Of Page Objects
 * @returns 
 */
function buildNavigationLinks(pages: Page[]){
  return (
    <Routes>
      {pages.map(function(page: Page){
        return <Route key={page.name} path={"/"+page.name+"/*"} element={ <NavBar pages={pages} focusPage={page.name} /> } />
      })}
      <Route
        path="*"
        element={ <NavBar pages={pages} focusPage={pages[0].name} /> }
      />
    </Routes>
  )
}

/**
 * Creates Page Components Based On The Pages Array
 * @param pages - An Array Of Page Objects
 * @returns 
 */
function buildPages(pages: Page[]){
  return (
    <Routes>
      <Route path="/accounts/*" element={ <AccountsPage /> } />
      <Route path="/analytics/*" element={ <AnalyticsPage /> } />
      <Route path="*" element={ <AccountsPage /> } />
    </Routes>
  )
}


// -- Pages Data ---
function generatePages(){
  let pages: Page[] = [
      { 
        name: 'accounts',  
        icon: 'briefcase',
      },
      { 
        name: 'analytics',  
        icon: 'chart',
      },
  ];
  return pages;
}
