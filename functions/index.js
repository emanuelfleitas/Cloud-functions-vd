
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

//const {google} = require("googleapis");
//const calendar = google.calendar("v3");

// var eventData = {
//   'summary': 'turno con el Dr.ALbert',
//   'location': '800 Howard St., San Francisco, CA 94103',
//   'description': 'revision general de salud',
//   'start': {
//     'dateTime': '2022-02-1T09:00:00-07:00',
//     'timeZone': 'America/Argentina/Cordoba',
//   },
//   'end': {
//     'dateTime': '2022-02-2T17:00:00-07:00',
//     'timeZone': 'America/Argentina/Cordoba',
//   },
//   'recurrence': [
//     'RRULE:FREQ=DAILY;COUNT=2'
//   ],
//   'attendees': [
//     {'email': 'lpage@example.com'},
//     {'email': 'sbrin@example.com'},
//   ],
//   'reminders': {
//     'useDefault': false,
//     'overrides': [
//       {'method': 'email', 'minutes': 24 * 60},
//       {'method': 'popup', 'minutes': 10},
//     ],
//   },
// };

// http callable functions
 exports.sayHello = functions.https.onCall((data)=>{

    var accessToken = data.accessToken
    var uid = data.uid
    var idEvent = data.eventId

    console.log("accesstoken: ",accessToken);
    console.log("Uid: ",uid);
    console.log("eventID: ",idEvent);
    var valores_snapshot = []

    admin.database().ref("/events").once("value",(snapshot)=>{
      valores_snapshot = snapshot.val()
      
      console.log(snapshot.val());
    })

    // Attach an asynchronous callback to read the data at our posts reference
   /*  ref.on('value', (snapshot) => {
      console.log(snapshot.val());
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    }); */

    // Retrieve new posts as they are added to our database
/*   ref.on('child_added', (snapshot, prevChildKey) => {
    const newPost = snapshot.val();
    console.log('Author: ' + newPost.author);
    console.log('Title: ' + newPost.title);
    console.log('Previous Post ID: ' + prevChildKey);
  }); */
  
   return valores_snapshot;
 }); 

// get new user sign up
exports.newUserSignup = functions.auth.user().onCreate((user)=>{
  console.log("user created ", user.email, user.uid); 
});

// This example assumes an HTTP call
// exports.addToCalendar = functions.https.onRequest((req, res) => {
//   const eventData = req.query.eventData;
//   const accessToken = getAccessToken(req);
//   return addToCalendar(eventData, accessToken).then(() => {
//      res.stats(200).send("yay");
//   }).catch(e => res.status(e.code).send({error: e.message}));
// });



// const  addEventToGoogleCalendar = (eventData, accessToken) => {
//   const authClient = getOauthClient(accessToken);
//   return new Promise((resolve, reject) => {
//     calendar.events.insert({
//       auth: authClient,
//       calendarId: "primary",
//       resource: eventData,
//     }, function(err) {
//       if (err) {
//         console.error(err);
//         reject(err);
//       }
//       else {
//         resolve();
//       }
//     });
//   });
// }

// function getOauthClient(accessToken) {
//   var oauth = new google.auth.OAuth2();
//   oauth.setCredentials({access_token: accessToken});
//   return oauth;
// }

// function getAccessToken(req) {
//   const header = req.get("Authorization");
//   if (header) {
//       var match = header.match(/^Bearer\s+([^\s]+)$/);
//       if (match) {
//           return match[1];
//       }
//   }
//   return null;
// }




// Alternative: Realtime DB trigger
// exports.addToCalendar = functions.database.ref('/addToCalendar/{pushId}')
//   .onWrite((event) => {
//     const data = event.data.val();
//     return addToCalendar(data.eventData, data.token)
//       // clear from queue after write
//       //.then(() => event.ref().remove());
//    });

// Alternative: Firestore DB trigger
// exports.addToCalendar = functions.firestore.document('addToCalendar/{pushId}')
//   .onCreate((event) => {
//     const data = event.data.data();
//     return addTocalendar(data.eventData, data.token)
//       // clear from queue after write
//       //.then(() => event.data.ref.remove());
//   }); 



//  http request 1
/* exports.randomNumber = functions.https.onRequest((request, response)=>{
  const number = Math.round(Math.random() * 100);
  console.log(number);
  response.send(number.toString());
}); 
 */

/* exports.seeData = functions.https.onRequest((request, response)=>{
  const number = Math.round(Math.random() * 100);
  console.log(number);
  response.send(number.toString());
}); 
 */


// get delete user sign up
// exports.userDeleted = functions.auth.user().onDelete((user)=>{
//   console.log("user deleted ", user.email, user.uid); 
//   // const doc = admin.firestore().collection("users").doc(user.uid).set({
//   //   email: user.email,
//   //   upvotedOn: [],
//   // });
//   // return doc.delete();
// });



