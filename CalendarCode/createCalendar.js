
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
    refresh_token: '1//04L3cpJEL0eQ1CgYIARAAGAQSNwF-L9Iremy1P8_D9DtIkao1i34dnDI8U6KD0gxrLMLUGeSBRsSCJYiob2MRbxtG43dwY1MfH6I'
})

const auth = oAuth2Client

const calendar = google.calendar({
    version: 'v3',auth: oAuth2Client
})

// 76ir4arietd3cu1rvfnd16pn3o@group.calendar.google.com
// emiliopuljiz@gmail.com
async function main() {

    // Acquire an auth client, and bind it to all future calls
    const authClient = auth;
    google.options({auth: authClient});
  
  
    // create new calendar
    // const res = await calendar.calendars.insert({
    //   // Request body metadata
  
    //   requestBody: {
    //     summary: "Calendar-Hicapps", // required
    //     timezone: "America/Argentina/Cordoba", // optional
    //     conferenceProperties: {
    //       "allowedConferenceSolutionTypes": [
    //        "hangoutsMeet"
    //       ]
    //     }
    //   }
  
    // });
    // console.log(res.data);


  // const res = await calendar.acl.insert({
  //      // Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
  //      calendarId: "76ir4arietd3cu1rvfnd16pn3o@group.calendar.google.com",
  //      // Whether to send notifications about the calendar sharing change. Optional. The default is True.
  //      sendNotifications: true,
   
  //      // Request body metadata
  //      requestBody: {
  //        // request body parameters
  //          "role": "reader",
  //          "scope": {
  //            "type":"default",
  //            "value":"emiliopuljiz@gmail.com"
  //          }
  //      },
  //    });
  //   console.log(res.data);
  




     // insert event 
     // Your TIMEOFFSET Offset
    // const TIMEOFFSET = '+05:30';

    // // Get date-time string for calender
    // const dateTimeForCalander = () => {

    //     let date = new Date();
    //     let year = date.getFullYear();
    //     let month = date.getMonth() + 1;
    //     if (month < 10) {
    //         month = `0${month}`;
    //     }
    //     let day = date.getDate();
    //     if (day < 10) {
    //         day = `0${day}`;
    //     }
    //     let hour = date.getHours();
    //     if (hour < 10) {
    //         hour = `0${hour}`;
    //     }
    //     let minute = date.getMinutes();
    //     if (minute < 10) {
    //         minute = `0${minute}`;
    //     }

    //     let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;
    //     let event = new Date(Date.parse(newDateTime));
    //     let startDate = event;
    //     // Delay in end time is 1
    //     let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    //     return {
    //         'start': startDate,
    //         'end': endDate
    //     }
    // };


    // console.log(dateTimeForCalander());

    // let dateTime = dateTimeForCalander();

    // let event = {
    //     'summary': `This is the Summary.`,
    //     'description': `This is the description.`,
    //     'start': {
    //         'dateTime': dateTime['start'],
    //         'timeZone': 'America/Argentina/Cordoba'
    //     },
    //     'end': {
    //         'dateTime': dateTime['end'],
    //         'timeZone': 'America/Argentina/Cordoba'
    //     }
    // };
    // const insertEvent = async (event) => {
    
    //   try {
    //       let response = await calendar.events.insert({
    //           auth: auth,
    //           calendarId: "66pu08ukqvd1q7c32fn00b6gc8@group.calendar.google.com",
    //           resource: event
    //       });
      
    //       if (response['status'] == 200 && response['statusText'] === 'OK') {
    //           return response.data.id;
    //       } else {
    //           return 0;
    //       }
    //   } catch (error) {
    //       console.log(`Error at insertEvent --> ${error}`);
    //       return 0;
    //   }
    // };

    // insertEvent(event)
    // .then((res) => {
    //     console.log(res);
    // })
    // .catch((err) => {
    //     console.log(err);
    // });

  // Get all the events between two dates
    const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: "66pu08ukqvd1q7c32fn00b6gc8@group.calendar.google.com",
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'America/Argentina/Cordoba'
        });
    
        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
  };

  let start = '2022-02-06T00:00:00.000Z';
  let end = '2022-02-08T00:00:00.000Z';

  getEvents(start, end)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });







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

