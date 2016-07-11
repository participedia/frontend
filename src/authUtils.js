
function requireAuth(nextState, replace, next) {
  var currentUser = firebase.auth().currentUser;
  if (currentUser) {
    next();
  } else {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      next();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      replace('/'); // XXX should handle error
      next();
    });
  }
}

export default requireAuth;
