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




// real-time listener
db.collection('exercises').onSnapshot( (snapshot) => {
//  console.log(snapshot.docChanges());
  snapshot.docChanges().forEach( (change) => {
    console.log(change, change.doc.data(), change.doc.id);
    if(change.type === 'added'){
      
    }
    else if(change.type === 'removed'){
      
    }
  });
});


