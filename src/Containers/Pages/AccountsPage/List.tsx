// -- React Imports
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
// -- Component Imports
import TitleSorter from 'Containers/Pages/AccountsPage/TitleSorter';

// -- Define Interfaces
interface AccountListProps {
  wordFilter: string;  
  accounts: any;
}
interface AccountListState {
  name: string;  
  sortDirection: string;
}
let AccountPropertiesENUM = [
  {
    name: 'Name',
    description: 'Name'
  },
  {
    name: 'AnnualRevenue',
    description: 'Annual Revenue'
  },
  {
    name: 'Rating',
    description: 'Rating'
  },
  {
    name: 'UpsellOpportunity__c',
    description: 'Upsell'
  },
];
let sortDirectionENUM = {
  up: 'assending',
  down: 'dessending',
}

// -- Define AccountList ---
// *************************
/**
 * Presents an excel like spreadsheet of the data
 * Params - wordFilter is the users search query, accounts is account data
 */
function AccountList( props : AccountListProps ) {

  // Set Sorting Option
  const [sorter, setSorter] = useState({name: 'Name', sortDirection: sortDirectionENUM.up });
  function updateSorter(newSorterName: string){
    setSorter( oldSorter => { 
      let newSorter = { name: newSorterName, sortDirection: oldSorter.sortDirection };
      if(oldSorter.name !== newSorterName){
        newSorter.sortDirection = sortDirectionENUM.up;
      }else{
        oldSorter.sortDirection === sortDirectionENUM.down ? newSorter.sortDirection = sortDirectionENUM.up : newSorter.sortDirection = sortDirectionENUM.down;
      }
      return  newSorter;
    })
  }


  // Filter & Sort Accounts
  let filteredAccounts = filterAccounts(props.accounts, props.wordFilter);
  sortAccounts(filteredAccounts, sorter.name);
  if(sorter.sortDirection === sortDirectionENUM.down){
    filteredAccounts.reverse();
  }

  return (
    <div className="pageContainer">
      <div className="pageComponent AccountsList">
        <div className="pageComponent_Title">Client Accounts</div>
        <div className="pageComponent_Content">
          <div className="AccountsList_Properties --header">
            {buildSortingColumns(updateSorter, sorter)}
          </div>
          {buildAccountRows(filteredAccounts)}
        </div>
      </div>
    </div>
  );
}
export default AccountList;


/**
 * Creates Grid Columns Based On Desired Account Properties Provided By AccountPropertiesENUM
 * @param updateSorter - Wrapper Function To Update React State
 */
function buildSortingColumns(updateSorter:any, sorter:AccountListState){
  return(
    <>
    {AccountPropertiesENUM.map(function(accountProperty){
      return(
        <TitleSorter key={accountProperty.name}
          name={accountProperty.name}
          description={accountProperty.description}
          inUse={sorter.name === accountProperty.name ? true : false}
          direction={sorter.sortDirection} onClick={updateSorter} 
        />
      )
    })}
    </>
  )
}

/**
 * Creates Account Rows Based On The Accounts Array
 * @param pages - An Array Of Accounts
 */
 function buildAccountRows(filteredAccounts: any){
  return (
    <>
      {filteredAccounts.map(function(acccount: any){
        return (
          
          <Link key={acccount.Name} to={"/accounts/profile/" + acccount.Id}>
            <div className="AccountsList_Properties AccountLink">
              <div className="AccountsList_Property --name">
                <div className="AccountsList_Item">
                  {acccount.Name}
                </div>
              </div>
              <div className="AccountsList_Property --annualRevenue">
                <div className="AccountsList_Item">
                  {acccount.AnnualRevenue ? '$' + acccount.AnnualRevenue.toLocaleString('en-US') : '-'}
                </div>
              </div>
              <div className="AccountsList_Property --rating">
                <div className={acccount.Rating ? "AccountsList_Card --" + acccount.Rating : "AccountsList_Card"}>
                  {acccount.Rating ? acccount.Rating : '-'}
                </div>
              </div>
              <div className="AccountsList_Property --upsellOpportunity__c">
                <div className="AccountsList_Item">
                  {acccount.UpsellOpportunity__c ? acccount.UpsellOpportunity__c : '-'}
                </div>
              </div>
            </div>
          </Link>

        )
      })}
    </>
  )
}

// -- Sorting Methods
function filterAccounts(accounts: any, wordFilter: string){
  const result = accounts.filter( (account: any) => {
    if(account.Name.toLowerCase().includes(wordFilter.toLowerCase())){
      return true; 
    }
    if(account.AccountNumber && account.AccountNumber.toLowerCase().includes(wordFilter.toLowerCase())){
      return true; 
    }
    return false;
  });
  return result;
}

function sortAccounts(accounts: any, sorter: string){
  if(sorter === "Name"){
    accounts.sort(function(a:any, b:any){ 
      if (b.Name.toLowerCase() > a.Name.toLowerCase()) {return -1;}
      if (b.Name.toLowerCase() < a.Name.toLowerCase()) {return 1;}
      return 0;
    });
  }
  if(sorter === "AnnualRevenue"){
    accounts.sort(function(a:any, b:any){return b.AnnualRevenue - a.AnnualRevenue});
  }
  if(sorter === "Rating"){
    let ratings = [null, 'Cold', 'Warm', 'Hot'];
    accounts.sort(function(a:any, b:any){
      return ratings.indexOf(b.Rating) - ratings.indexOf(a.Rating);
    });
  }
  if(sorter === "UpsellOpportunity__c"){
    let ratings = [null, 'No', 'Maybe', 'Yes'];
    accounts.sort(function(a:any, b:any){
      return ratings.indexOf(b.UpsellOpportunity__c) - ratings.indexOf(a.UpsellOpportunity__c);
    });
  }
}