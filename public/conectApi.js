
/* libreria instala con npm I googleapis */
const { google } = require('googleapis')

const { OAuth2 } = google.auth


// datos obtenidos del cloud google api https://console.cloud.google.com/apis/credentials?project=vue-firebase-auth-d83ae
const oAuth2Client = new OAuth2(
    '737496671906-829chukedls50hbin4s6crkjfcdnbnpp.apps.googleusercontent.com',
    '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'
)


// refresh token obtenido en https://developers.google.com/oauthplayground/
oAuth2Client.setCredentials({
    refresh_token: '1//04ZodMZ_ZOBzGCgYIARAAGAQSNwF-L9IrJMw-QzzCjRcQPKcH37nB1oHUHa7dg1sYTOplq-pFH3oFR3V-t_zu7NwnIcCSK-xB3Vs'
})

const calendar = google.calendar({
    version: 'v3',auth: oAuth2Client
})

const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 4)

const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() + 5)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const event = {
    summary:'Meet with David',
    location:'H3500AUE, Juan Domingo Perón 201-299, H3500AUE Resistencia, Chaco',
    description:'Meet with david to talk about the new client project and how to add the google calendar api',
    start:{
        dateTime: eventStartTime,
        timeZone: 'America/Argentina/Cordoba',
    },
    end:{
        dateTime: eventEndTime,
        timeZone: 'America/Argentina/Cordoba',
    },
    ColorId:1,
}

calendar.freebusy.query({
    resource:{
        timeMin:eventStartTime,
        timeMax:eventEndTime,
        timeZone: 'America/Argentina/Cordoba',
        items:[{
            id:'primary'
        }],
    }
},(err,res)=>{
    if(err) return console.log('Free busy query error',err)
    const eventsArr = res.data.calendars.primary.busy
    if (eventsArr.length ===0) return calendar.events.insert({calendarId:'primary',resource:event},err=>{
        if(err)return console.log('calendar event creations error ',err);
        return console.log('calendar event created')
    }) 
    return console.log('sorry im busy');
})