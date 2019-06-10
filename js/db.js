// Offline data
db.enablePersistence()
.catch(err => {
  if(err.code == 'failed-precondition'){
    // probably multiple tabs open at once
    console.log('persistence failed');
  }
  else if(err.code == 'unimplemented') {
    // lack of browser support
    console.log('persistence is not available');
  }
});

//// real-time listener
//db.collection('exercises').onSnapshot( (snapshot) => {
////  console.log(snapshot.docChanges());
//  snapshot.docChanges().forEach( (change) => {
//    console.log(change, change.doc.data(), change.doc.id);
//    if(change.type === 'added'){
//      
//    }
//    else if(change.type === 'removed'){
//      
//    }
//  });
//});

// function to get values from database.
// * documentFunction(id, data) used for each document
function dbGetAll(collectionName, documentFunction){
  return db.collection(collectionName).get().then( snapshot => {
    snapshot.forEach( (doc) => {
      documentFunction(doc.id, doc.data());
//      console.log(`${doc.id} => ${doc.data()}`);
//      console.log(doc.data());
    });
  });
}

function dbGet(collectionName, documentID){
  var docRef = db.collection(collectionName).doc(documentID);
  return docRef.get()
  .then( doc => {
    if(doc.exists){
      return doc.data();
    }
    else{
      console.log('No such doc exists');
      return null;
    }
  })
  .catch( err => {
    console.log('Error getting document');
    return null;
  });
}

// Add new document
function dbAdd(collectionName, document2add){
  return db.collection(collectionName).add(document2add)
  .catch( err => {
    console.log(err);
  });
}

function dbEdit(collectionName, documentID, newDocument){
  return db.collection(collectionName).doc(documentID).set(newDocument)
  .catch( err => {
    console.log(err);
  });
}

// Delete document
function dbDelete(collectionName, documentID){
  return db.collection(collectionName).doc(documentID).delete();
}




