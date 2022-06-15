// -- XHR Utils Imports
import enhancedFetch from 'Services/enhancedFetch';



// -- Define getAccountData ---
// ****************************
function getAccountData(){
  return new Promise((resolve, reject) => {

    enhancedFetch('demo_data').then(function(accountData){ 
      resolve( accountData  );
    }).catch(function(onlineStatus){
      reject(onlineStatus);
    });

  }); // End Promise Return
} // End getAccountData
export default getAccountData;


