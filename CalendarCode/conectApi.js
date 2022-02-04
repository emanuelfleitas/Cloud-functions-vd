
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

const calendar = google.calendar({
    version: 'v3',auth: oAuth2Client
})

const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 6)

const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() + 8)


const event = {
    summary:'Turno con la doctora Silvia',
    location:'H3500AUE, Juan Domingo Perón 201-299, H3500AUE Resistencia, Chaco',
    description:'Turno para consultar sobre en lugares realiza operaciones',
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

