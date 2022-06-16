// -- XHR Utils Imports
import enhancedFetch from 'Services/enhancedFetch';
import database from 'Services/database';
// -- Utils Import
import postMessageToWorker from 'Utils/webworker';


// -- Define getAccountData ---
// ****************************
function getAccountData(forceOnline?: boolean){
  return new Promise((resolve, reject) => {

    if(forceOnline){
      getOnlineData().then(function(accountData: any){ 
        postMessageToWorker({data: accountData, job: 'storeData', dataName: 'accounts'});
        resolve(accountData) 
      }).catch(function(onlineStatus: string){
        reject(onlineStatus)
      })
    }else{
      database.getData('accountData').then(function(accountData: any){
        postMessageToWorker({data: accountData, job: 'storeData', dataName: 'accounts'});
        resolve(accountData);
      }).catch(() => {
  
        getOnlineData().then(function(accountData: any){ 
          postMessageToWorker({data: accountData, job: 'storeData', dataName: 'accounts'});
          resolve(accountData) 
        }).catch(function(onlineStatus: string){
          reject(onlineStatus)
        })
  
      }); 
    }
    
  }); // End Promise Return
} // End getAccountData
export default getAccountData;



// -- Get Data From Online API
function getOnlineData(){
  return new Promise((resolve, reject) => {

    enhancedFetch('demo_data').then(function(accountData: any){ 
      database.storeData('accountData', accountData);
      resolve( accountData  );
    }).catch(function(onlineStatus: string){
      reject( onlineStatus );
    });
    
  }); // End Promise Return
} // End getOnlineData

