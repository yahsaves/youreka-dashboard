// -- React Imports
import React, { useState, useEffect  } from 'react'; 
// -- Assest/Style Imports
import './styles.scss';
// -- Service Imports
import getAccountData from 'Services/getAccountData';
// -- Component Imports
import TitleBar from 'Containers/Pages/Components/TitleBar';
import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import RichClients from 'Containers/Pages/Components/RichClients';



// -- Define AccountList ---
// *************************
/**
 * Manages State over loading account data over an async API
 * Passes on this state to Dashboard Components so it can display the account data once loaded
 */
function AnalyticsPage( ) {
  
  // Setup Accounts Data/State
  const [accounts, setAccounts] = useState({});
  const [accountsLoaded, setAccountsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
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
}
useEffect(() => { loadAccountData(); }, []);

  return (
    <div className='fillArea'>
      {errorMessage !== '' && <Alert message={errorMessage} />}
      <TitleBar title='Analytics' onRefresh={loadAccountData} />
      <Loader hide={accountsLoaded} />
      {accountsLoaded && 
        <RichClients accounts={accounts} />
      }
    </div>
  );
}

export default AnalyticsPage;