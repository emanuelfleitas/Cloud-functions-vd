const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

//  http request 1
exports.randomNumber = functions.https.onRequest((request, response)=>{
  const number = Math.round(Math.random() * 100);
  console.log(number);
  response.send(number.toString());
}); 

// http request redirect
//  exports.toTheDojo = functions.https.onRequest((request, response)=>{
//   response.redirect("https://www.thenetninja.co.uk");
// }); 

// http callable functions
exports.sayHello = functions.https.onCall(data=>{
  const name = data.name;
  return `Hello, ${name}`;
}); 

// get new user sign up
exports.newUserSignup = functions.auth.user().onCreate((user)=>{
  console.log("user created ", user.email, user.uid); 
  // for background trigger you must return a value/promise
  // return admin.firestore().collection("users").doc(user.uid).set({
  //   email: user.email,
  //   upvotedOn: [],
  // });
});

// get delete user sign up
// exports.userDeleted = functions.auth.user().onDelete((user)=>{
//   console.log("user deleted ", user.email, user.uid); 
//   // const doc = admin.firestore().collection("users").doc(user.uid).set({
//   //   email: user.email,
//   //   upvotedOn: [],
//   // });
//   // return doc.delete();
// });

// // http callable function (adding a request)

// exports.addRequest = functions.https.onCall((data, context)=>{
//   if (!context.auth) {
//     throw new functions.https.HttpsError(
//         "unauthenticated",
//         "only authenticated users can add requests"
//     );
//   }
//   if (data.text.length > 30) {
//     throw new functions.https.HttpsError(
//         "invalid-argument",
//         "request must be no more than 30 characters long"
//     );
//   }
//   return admin.firestore().collection("requests").add({
//     text: data.text,
//     upvotes: 0,
//   });
// });

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
  .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = snapshot.val();
    functions.logger.log('Uppercasing', context.params.pushId, original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return snapshot.ref.parent.child('uppercase').set(uppercase);
});


