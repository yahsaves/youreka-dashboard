import Localbase from 'localbase';
let db = new Localbase('db');
db.config.debug = false;

interface databaseInterface {
  storeData: Function;
  getData: Function;
}

// -- Define database --------
// ****************************
let database: databaseInterface = {

  // storeData Property
  storeData: function(collectionName: string, data: any){
    db.collection(collectionName).delete();
    db.collection(collectionName).add(data);
  }, // End storeData

  // getData Property
  getData: function(collectionName: string){
    return new Promise((resolve, reject) => {
      db.collection(collectionName).get().then( (collectionData:any) => {

        if(collectionData.length >= 1){
          resolve(collectionData[0]);
          return;
        }

        reject();
        
      })
    }); // End Promise Return
  } /// End getData

}; // End database



export default database;