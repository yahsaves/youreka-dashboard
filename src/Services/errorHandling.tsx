// -- Define reportError ------
// ****************************
function reportError(error: string){
  console.error(error);
  // This would be a post method to send error codes to the proper error handling API's
}



// -- Define checkOnline ------
// ****************************
/**
 * Makes a call to wikipedia commons to test if their public resources are reachable
 * @param - N/a
 * @returns - True, if wikipedia was reachable, False if it was not
 */
function checkOnline(){
  return new Promise((resolve, reject) => {
    
    let tester = new Image();
    tester.onload = function() {
      resolve(true);
    };
    tester.onerror = function() {
      console.log("Wikipedia Commons Is Not Reachable")
      resolve(false);
    };
    let publicDomainImage = "https://upload.wikimedia.org/wikipedia/commons/2/25/%22Andy_Johnson%2C%22_big_trees_of_California%2C_by_Continent_Stereoscopic_Company.jpg";
    let disableCache = "?breakCache=" + performance.now();
    tester.src= publicDomainImage + disableCache;
    
  }); // End Promise Return
} // End CheckOnline

export { reportError, checkOnline };