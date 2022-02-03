
/* libreria instala con npm I googleapis */
const { google } = require('googleapis')
const { OAuth2 } = google.auth

/* datos obtenidos del cloud google api https://console.cloud.google.com/apis/credentials?project=vue-firebase-auth-d83ae */
const oAuth2Client = new OAuth2(
    '852167180691-kj030si3j33p9qmdrn5n7rnkbldr0cs4.apps.googleusercontent.com',
    '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'
)

/* refresh token obtenido en https://developers.google.com/oauthplayground/ */
oAuth2Client.setCredentials({
    refresh_token: '1//04wrO9iXdwIjtCgYIARAAGAQSNwF-L9IrAnruPAwcY7dufZ2-ni5mkyfgkKgAR1iS69Ae63QYRPJCVxoMCvrGO08tw8HrcSJ2aZE'
})

const auth = oAuth2Client

const calendar = google.calendar({
    version: 'v3',auth: oAuth2Client
})


async function main() {

    // Acquire an auth client, and bind it to all future calls
    const authClient = auth;
    google.options({auth: authClient});
  
  
    // create new calendar
    const res = await calendar.calendars.insert({
      // Request body metadata
  
      requestBody: {
        summary: "Calendar pruebaa", // required
        timezone: "America/Argentina/Cordoba", // optional
        conferenceProperties: {
          "allowedConferenceSolutionTypes": [
           "hangoutsMeet"
          ]
        }
      }
  
    });
    console.log(res.data);
  
    //get created calendar
  
    // const resp =  await calendar.calendars.get({
    //     // Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
    //     calendarId: "nkop47007l6poisdcdgbhg80oo@group.calendar.google.com",
    // });
    // console.log(resp.data);

  }
  
  main().catch(e => {
    console.error(e);
    throw e;
  });
  
  
  

    // const res = await calendar.acl.insert({
    //    // Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
    //    calendarId: 'h8kfc77vm0fv62tmcojs0u8ku4@group.calendar.google.com',
    //    // Whether to send notifications about the calendar sharing change. Optional. The default is True.
    //    sendNotifications: 'true',
   
    //    // Request body metadata
    //    requestBody: {
    //      // request body parameters
    //        "role": "owner",
    //        "scope": {
    //          "type":"group",
    //          "value":"emanuel.fleitas.aquino@gmail.com"
    //        }
    //    },
    //  });
    // console.log(res.data);
  




// const eventStartTime = new Date()
// eventStartTime.setDate(eventStartTime.getDay() + 6)

// const eventEndTime = new Date()
// eventEndTime.setDate(eventEndTime.getDay() + 8)


// const event = {
//     summary:'Turno con la doctora Silvia',
//     location:'H3500AUE, Juan Domingo Perón 201-299, H3500AUE Resistencia, Chaco',
//     description:'Turno para consultar sobre en lugares realiza operaciones',
//     start:{
//         dateTime: eventStartTime,
//         timeZone: 'America/Argentina/Cordoba',
//     },
//     end:{
//         dateTime: eventEndTime,
//         timeZone: 'America/Argentina/Cordoba',
//     },
//     ColorId:1,
// }

// calendar.freebusy.query({
//     resource:{
//         timeMin:eventStartTime,
//         timeMax:eventEndTime,
//         timeZone: 'America/Argentina/Cordoba',
//         items:[{
//             id:'primary'
//         }],
//     }
// },(err,res)=>{
//     if(err) return console.log('Free busy query error',err)
//     const eventsArr = res.data.calendars.primary.busy
//     if (eventsArr.length ===0) return calendar.events.insert({calendarId:'primary',resource:event},err=>{
//         if(err)return console.log('calendar event creations error ',err);
//         return console.log('calendar event created')
//     }) 
//     return console.log('sorry im busy');
// })

