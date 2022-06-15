// -- React Imports
import React, { useState, useEffect  } from 'react'; 
import { Routes, Route } from 'react-router-dom';
// -- Assest/Style Imports
import './styles.scss';
// -- Service Imports
import getAccountData from 'Services/getAccountData';
// -- Component Imports
import TitleBar from 'Containers/Pages/Components/TitleBar';
import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import AccountList from 'Containers/Pages/AccountsPage/List';
import AccountProfile from 'Containers/Pages/AccountProfilePage';



// -- Define AccountList ---
// *************************
/**
 * Manages State between the search bar, and loading account data over an async API
 * Passes on this state to <AccountList /> so it can display the account data once loaded
 */
function AccountsPage( ) {
  
  // Setup Accounts Data/State
  const [accounts, setAccounts] = useState({});
  const [accountsLoaded, setAccountsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Load Account Data (Async Method)
  useEffect(() => {    
    getAccountData().then(function(accountRequest:any){
      setAccounts(accountRequest.records);
      setAccountsLoaded(true);
    }).catch(function(onlineStatus){
      if(onlineStatus){
        setErrorMessage("We are currently undergoing maintence at the moment. Please check back shortly.");
      }else{
        setErrorMessage("It appears this device doesn't have internet connection.");
      }
    })
  }, []);

  // Setup Search WordFilter Data/State
  const [wordFilter, setWordFilter] = useState('');
  function onSearch(searchQuery: string){
    setWordFilter(searchQuery);
  }

  return (
    <div className='fillArea'>

      <Routes>
        {accountsLoaded && <Route path="/profile/:userid" element={ <AccountProfile accounts={accounts} /> } />}
      </Routes>

      {errorMessage !== '' && <Alert message={errorMessage} />}
      <TitleBar title='Accounts' onSearch={onSearch} />
      <div className='fillArea'>
        <Loader hide={accountsLoaded} />
        {accountsLoaded && 
          <AccountList wordFilter={wordFilter} accounts={accounts} />
        }
      </div>
    </div>
  );
}

export default AccountsPage;