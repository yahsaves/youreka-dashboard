// -- Data Import
import accountsJSON from 'Assets/demo.json';
// -- Service Imports
import { checkOnline, reportError } from 'Services/errorHandling';



// -- Define EnhancedFetch ---
// ****************************
/**
 * Placeholder for an advanced fetch function that supports paginated API calls
 * @param reqURL - The target api restpoint
 * @returns - A promise that either resolves the data, or catches if the device is online/offline
 */
function enhancedFetch(reqURL:string){
  return new Promise((resolve, reject) => {

    fetchRequest(reqURL).then(function(accountData){
      resolve(accountData);
    }).catch(function(){
      checkOnline().then(function(onlineStatus){ 
        if(onlineStatus){ reportError('The API is not responding') }
        reject(onlineStatus); 
      })
    })

  }); // End Promise Return
}; // End enhancedFetch
export default enhancedFetch;


// -- Simulate Fetch Request ---
function fetchRequest(reqURL:string){
  return new Promise((resolve, reject) => {
    if(reqURL === 'demo_data'){
      setTimeout(function(){ // Simulate Server Lag
        resolve(accountsJSON);
      }, 1000);
    }else{
      // This function is in place to call to a real API using fetch/XHR requests. 
      // However since the required API data is provided locally there is no need to do that.
    }
  }); // End Promise Return
} // End FetchRequest