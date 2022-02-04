/* eslint-disable */

const { google } = require("googleapis")
const { OAuth2 } = google.auth
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const oAuth2Client = new OAuth2(
  "852167180691-kj030si3j33p9qmdrn5n7rnkbldr0cs4.apps.googleusercontent.com",
  "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"
)
oAuth2Client.setCredentials({
  refresh_token: "1//04L3cpJEL0eQ1CgYIARAAGAQSNwF-L9Iremy1P8_D9DtIkao1i34dnDI8U6KD0gxrLMLUGeSBRsSCJYiob2MRbxtG43dwY1MfH6I"
})
const auth = oAuth2Client
const calendar = google.calendar({
  version: "v3",auth: oAuth2Client
})

const calendarId = "66pu08ukqvd1q7c32fn00b6gc8@group.calendar.google.com"
// const eventoNuevo = {}

const event = {
  "summary": "Turno dr Laos",
  "description": "revision",
  "start": {
      "dateTime": "2022-02-7T17:00:00-07:00",
      "timeZone": "America/Argentina/Cordoba"
  },
  "end": {
      "dateTime": "2022-02-7T17:00:00-07:00",
      "timeZone": "America/Argentina/Cordoba"
  }
}

exports.sendGoogleManual = functions.runWith({ memory: "4GB", timeoutSeconds: 540 }).https.onRequest( (req, res) => {

  try {
      // await migraSegsExpirados(false,false,'20210602');
    
    
      console.log("probando enviar");

      const response = calendar.events.insert({
        auth: auth,
        calendarId: calendarId,
        resource: event
      });
      response.then((rest) =>{
        let idEvent = rest.data.id
        // rest.data.id // event id
        // rest.data.creator.email // email del creador del calendario
        // rest.data.description  //description
        // rest.data.summary // summary
        // rest.data.Authorization // Authorization
        // rest.data.email // calendarID
        // rest.data.displayName //nombre del calendario
      
        admin.database().ref('eventsGoogle/').push().set({
          idEvent:idEvent,
          description:rest.data.description ,
          title:rest.data.summary,
          eventEnd: rest.data.dateTime,
          eventStart: rest.data.dateTime,
          uid:rest.data.creator.email 
        })

        console.log(rest.data.id);
      }).catch((error) => {
        console.log(error);
      })
     

      return res.status(200).json("terminado");
  } catch (error) {
      console.log(error);
      return res.status(200).json(error.message);
  }
});


// http callable functions
 exports.enviarEvento = functions.https.onCall((data)=>{
    console.log(data.description);
    let event = {
        "summary": data.summary,
        "description": data.description,
        "start": {
            "dateTime": data.startDate,
            "timeZone": "America/Argentina/Cordoba"
        },
        "end": {
            "dateTime": data.endDate,
            "timeZone": "America/Argentina/Cordoba"
        }
    };
    let resultado = insertEvent(event,data.idCalendar,auth);
    return resultado
 }); 



// get new user sign up
exports.newUserSignup = functions.auth.user().onCreate((user)=>{
  console.log("user created ", user.email, user.uid); 
});

const insertEvent =  (event,idCalendar,auth) => {
    
  try {
      let response = calendar.events.insert({
        auth: auth,
        calendarId: idCalendar,
        resource: event
      });
      if (response["status"] == 200 && response["statusText"] == "OK") {
          return 1;
      } else {
          return 0;
      }
    } 
  catch (error) {
        console.log(error);
        return 0;
    }
};



// exports.sendGoogleManual = functions.runWith({ memory: "4GB", timeoutSeconds: 540 }).https.onRequest(async (req, res) => {
//   try {
//       await migraSegsExpirados(false,false,'20210602');
//       console.log("probando enviar");
//       return req.status(200).json("terminado");
//   } catch (error) {
//       console.log(error);
//       return res.status(200).json(error.message);
//   }
// });





// function crearCalendario(data) {

//   // Acquire an auth client, and bind it to all future calls
//   const authClient = auth;
//   google.options({auth: authClient});


//   // create new calendar
//   const res =  calendar.calendars.insert({
//     // Request body metadata
//     requestBody: {
//       summary: data, // required
//       timezone: "America/Argentina/Cordoba", // optional
//       conferenceProperties: {
//         "allowedConferenceSolutionTypes": [
//          "hangoutsMeet"
//         ]
//       }
//     }
//   });
// }


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
// exports.addToCalendar = functions.database.ref("/addToCalendar/{pushId}')
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


// main().catch(e => {
//   console.error(e);
//   throw e;
// });



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
  

    // admin.database().ref("/events").once("value",(snapshot)=>{
    //   valores_snapshot = snapshot.val()
      
    //   console.log(snapshot.val());
    // })



    // crearCalendario(summary)

    // var accessToken = data.accessToken
    // var uid = data.uid
    // var idEvent = data.eventId

    // console.log("accesstoken: ",accessToken);
    // console.log("Uid: ",uid);
    // console.log("eventID: ",idEvent);
    // var valores_snapshot = []