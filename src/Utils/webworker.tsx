declare let self: any;
declare let window: any;

// -- This function creates the worker thread
const BuildWorker = function(foo: any){
  let str = foo.toString()
            .match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/)[1];
  return  new Worker(window.URL.createObjectURL(
                     new Blob([str],{type:'text/javascript'})));
}

// -- Define Worker Message Shapes
interface WorkerMessage {
  job: 'storeData' | 'filter';
  dataName: 'accounts';
  data: any;
}

// -- Create Webworker
if(window.webworker === undefined){
  window.webworker = BuildWorker(function(){
    let globalWorkerData: any = {};
    self.onmessage = function(event: WorkerMessage){
      
      // Extract Message Data, from onMessage event
      let id = event.data.id;
      let message = event.data.message;
      let data: any = message.data;
      let dataName: string = message.dataName;
      let job: string = message.job;
      
      // Declare Return Message
      let returnMessage :any;

      // Setup Jobs
      if(job === 'storeData'){
        globalWorkerData[dataName] = data;
        returnMessage = 'done';
      }

      if(job === 'filter' && dataName === 'accounts'){
        let accounts = data.accounts;
        let wordFilter: string = data.wordFilter;

        let indexsToKeep :number[] = [];
        for(let i=0; i<accounts.length; i++){
          let account = accounts[i];
          if(account.Name.toLowerCase().includes(wordFilter.toLowerCase())){
            indexsToKeep.push(i);
          }else if(account.AccountNumber && account.AccountNumber.toLowerCase().includes(wordFilter.toLowerCase())){
            indexsToKeep.push(i);
          }
        }
        returnMessage = indexsToKeep;
      }

      // Return Message Back To Main Thread
      self.postMessage({
        id: id,
        message: returnMessage,
      });

      // -- last line of worker
    }
  });
}



// -- Setup Shared Message States
let messageCounter = 0;
let recievedMessages: any = {};
window.webworker.onmessage = (event: any) => {
  recievedMessages[event.data.id] = event.data.message;
};


function postMessageToWorker(message: WorkerMessage){
  return new Promise((resolve, reject) => {

    // Sanatize Message Data to pass into WebWorker
    let messageID = "uniqueID" + messageCounter;
    messageCounter++;
    window.webworker.postMessage({
      id: messageID,
      message: message,
    });
  
    // De-sanatize Message Data and Resolve to Main Thread
    function messageRecieved(){
      if(recievedMessages[messageID]){
        window.webworker.removeEventListener("message", messageRecieved);
        let ourMessage = recievedMessages[messageID];
        delete recievedMessages[messageID];
        resolve(ourMessage);
      }
    }
    window.webworker.addEventListener("message", messageRecieved);
    
  }); // End Promise Return
}
export default postMessageToWorker;


