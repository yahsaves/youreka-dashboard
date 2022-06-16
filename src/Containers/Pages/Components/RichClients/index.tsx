// -- React Imports
import React from 'react';
// -- Assest/Style Imports
import './styles.scss';




// -- Define AccountList ---
// *************************
function RichClients( props:any  ) {

  let accounts = props.accounts;

  const millionaires = accounts.filter( (account: any) => {
    if(account.AnnualRevenue >= 1000000){
      return true; 
    }
    return false;
  });

  const learnMoreAbout = accounts.filter( (account: any) => {
    let unknownProperties = 0;
    if(account.AnnualRevenue === null){ unknownProperties++ }
    if(account.Website === null){ unknownProperties++ }
    if(account.Rating === null){ unknownProperties++ }
    if(account.UpsellOpportunity__c === null){ unknownProperties++ }
    if(unknownProperties >= 2){ return true; }
    return false;
  });

  return (
    <div className="pageContainer">
      <div className="pageComponent AccountsList">
        <div className="pageComponent_Title">Clients Who Are Millionaires</div>
        <div className="pageComponent_Content">
          {renderAccountNames(millionaires)}
        </div>
      </div>

      <div className="pageComponent AccountsList">
        <div className="pageComponent_Title">Partners We Have Limited Information On</div>
        <div className="pageComponent_Content">
          {renderAccountNames(learnMoreAbout)}
        </div>
      </div>
      
    </div>
  );
}

export default RichClients;


// -- Filter Out Any Clients Who Make Less Than 1 Million Per Year
function renderAccountNames(accounts: any){
  return (
    <>
      {accounts.map(function(account:any){
        return(
          <div key={account.Id} className="RichClients">
            {account.Name}
          </div>
        )
      })}
    </>
  )
}
