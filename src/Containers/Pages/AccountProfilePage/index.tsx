// -- React Imports
import React, { useState } from 'react'; 
import { useNavigate, useParams } from "react-router-dom";
// -- Assest/Style Imports
import './styles.scss';
// -- Component Imports
import Icon from 'Assets/icons';
// -- Helper Imports
import { delayRAF } from 'Utils/helpers';



// -- Define Interfaces
interface AccountProfileProps {
  accounts: any;
}

// -- Define AccountList ---
// *************************
function AccountProfile( props:AccountProfileProps ) {
  let navigate = useNavigate();
  let { userid } = useParams();

  // Setup component transitions
  const [transitionClasses, setTransitionClasses] = useState('--hide');
  delayRAF().then(function(){
    setTransitionClasses('');
  })

  // Close component
  function closeProfile(){
    navigate("/accounts");
  }
  if(!userid){ return <></>; }

  // Extract Target Account From Account Data
  let account = extractTargetAccount(props.accounts, userid);

  return (
    <div className={"accountProfile " + transitionClasses}>
      <div className="accountProfile_Container">
        <Icon name="close" className="accountProfile_Close" onClick={closeProfile} />

          <div className="accountProfile_Title">
            <div className="accountProfile_Name">{account.Name}</div>
            {account.Website && <div className="accountProfile_Website">Site | {account.Website}</div>}
            {account.AccountNumber && <div className="accountProfile_AccountNumber">Account# | {account.AccountNumber}</div>}
          </div>

          {createContactCards(account)}

          <textarea placeholder='Notes' className="accountProfile_Notes"></textarea>

      </div>
      <div className="accountProfile_Backdrop" onClick={closeProfile}></div>
    </div>
  );
}

export default AccountProfile;




// -- createContactCards
function createContactCards(account: any){
  let contacts = account.Contacts.records;

  return (
    <>
      {contacts.map(function(contact:any){
        return (
          <div key={contact.Id} className="accountProfile_Contacts">
            <div className="accountProfile_ContactDeclaration"> {contact.Name} </div>
            
            <div className="accountProfile_ContactCards">
              <div className="accountProfile_ContactCard">
                <div className="accountProfile_ContactTitle"> Title </div>
                <div className="accountProfile_ContactPhone"> Phone </div>
                <div className="accountProfile_ContactDepartment"> Department </div>
                <div className="accountProfile_ContactEmail"> Email </div>
              </div>

              <div className="accountProfile_ContactCard">
                <div className="accountProfile_ContactTitle"> Hr </div>
                <div className="accountProfile_ContactPhone"> 830 412 1125 </div>
                <div className="accountProfile_ContactDepartment"> Emergency </div>
                <div className="accountProfile_ContactEmail"> stuff@hotmail.com </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

// -- extractTargetAccount
function extractTargetAccount(accounts: any, userid: string){
  const result = accounts.filter( (account: any) => {
    if(account.Id === userid){
      return true; 
    }
    return false;
  });
  return result[0];
}