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
  const [updateCount, setUpdateCount] = useState(0);

  // Load Account Data (Async Method)
  function loadAccountData(forceOnline?: boolean){
    setAccountsLoaded(false);
    getAccountData(forceOnline).then(function(accountRequest:any){
      setAccounts(accountRequest.records);
      setAccountsLoaded(true);
    }).catch(function(onlineStatus){
      setAccountsLoaded(true);
      if(onlineStatus){
        setErrorMessage("We are currently undergoing maintence at the moment. Please check back shortly.");
      }else{
        setErrorMessage("It appears this device doesn't have internet connection.");
      }
    })
    setUpdateCount( (oldUpdate:number) => { return oldUpdate + 1; } )
  }
  useEffect(() => { loadAccountData(); }, []);

  // Setup Search WordFilter Data/State
  const [wordFilter, setWordFilter] = useState('');
  function onSearch(searchQuery: string){
    setWordFilter(searchQuery);
    setUpdateCount( (oldUpdate:number) => { return oldUpdate + 1; } )
  }

  return (
    <div className='fillArea'>
      <Routes>
        {accountsLoaded && <Route path="/profile/:userid" element={ <AccountProfile accounts={accounts} /> } />}
      </Routes>
      {errorMessage !== '' && <Alert message={errorMessage} />}
      <TitleBar title='Accounts' onSearch={onSearch} onRefresh={loadAccountData} />
      <Loader hide={accountsLoaded} />
      {accountsLoaded && 
        <AccountList wordFilter={wordFilter} updateCount={updateCount} accounts={accounts} />
      }
    </div>
  );
}

export default AccountsPage;