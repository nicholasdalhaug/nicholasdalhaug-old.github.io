document.addEventListener('DOMContentLoaded', function() {
  // top nav
  const menus = document.querySelectorAll('.sidenav');
  M.Sidenav.init(menus, {edge: 'left'});
});









db.collection('exercises').get().then( snapshot => {
  snapshot.forEach( (doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    console.log(doc.data());
  });
});