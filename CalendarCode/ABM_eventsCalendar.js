
// import { CALENDAR_ID,CREDENTIALS } from './credentials.js';
const {google} = require('googleapis');
require('dotenv').config();


// Provide the required configuration
const CREDENTIALS = {
    "type": "service_account",
    "project_id": "mineros-36233",
    "private_key_id": "ed77de458fa3c1ec0736c22a31b7cab92907bbc9",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkcCHtUbAmmLNO\n3918SwyG2GKxexrxyP33PpPd0lT6A3Ix2VAmEPxSvr17sVNe/MVff8zzRkgh9ci+\nN62l6jMN1yH3i+Ctbr/TCNiONTzW7V90piU5XEk+3MLY7rYyshTaSnh7WASj7uSu\nlHPBtMZSjeZD+PdMpjLVc6aUbOsoNW+9T7YY4Ts779ISt27ypUpDhjKxHEDG3Oft\ncBROa7Z0ViM1oxZD5WDER5e/JWn+CxZqp85PD7h+ZSqd/+0h11CGiunE9F7Rn1iy\nOxcIrZ945x7jL+FjhBOemUMiidXjbAuQJDgOAEWBm/wpILumlYYvAhxXBZHi7Joo\na4GbuKcxAgMBAAECggEAMZhovUH5eP+5Gjw/NW+DyjjrgHXmPS0yej3jU4sJOPiL\nj+gK3yDb70kLEXJH0/0UCu5PvFd7bKgUi7vB3x4wNGaLMNf1ESJU0kf+4C0Nxunl\nSgmSVlhDbLr4MKnu86W3Ikd9zeWnqEHC82Y2lY0ea6j0H7jLVCBXNAF2Xo4hJeq+\n+DkO1Oy1GhZwNmS3xKWCf+0033yf/ecnMmhIG+SZ1y+exAnXAQ2+AW/nrdehKYoN\nFgxHS0DEmC0ytnRr4GAWsQ2WOvAWF2LLiIG8lrKiFSW6sn9T8KozI2kQKbD5GPG9\nKuQ8gZfhTSSO1/HU/jwHVVzkD76QklxiB7itp2hmiwKBgQD9Omo/2qsvvRIxLm64\n0hIGdfo5uDiz9PyW02+iNiNj0l+RKHgQiYoRWMhixtDI+luYDVYtvHnFwyt9p3b2\n5fpuunEp/2A6jyG27b1Kx3xBG45OUFFrgd9yhqmv4KSuJ2QU0otjqERKsJRMeD1x\nnO57yhfsG1kJzl3jqUQNXUaeEwKBgQDm8EBm2eL+Oui0yPSRlC2gBbknemw318Qa\nfE+MJzicjEGm+S1OfWCNyUFP6KCAWxP+t9SROY0JLWyz/sOS8sVNXoYgz79bqGQM\ndHwfdcnkKFPljq91FLYFqsiMk+jUUyY7w8m5lVNJLjajBkZmSwRrDKswydX/YMN+\nmjzG446+KwKBgQCKuLuH64SoDE2w/5zMRth1DaBcil0VyHmvLnkTRdExWAfef2r2\ntEIcqqRr6DpsPyp6K6QwPfX/rqFenqT/MJF2o1BnD21p5wszKR3vn0SkbjIRGNLh\nsC32kWrX3JqahR3Agm6103JF8GHtWlleqffDfLyKLZkjVBf/JbUQFS8gXQKBgHf3\npK0JUVcaSRrpLcuWe2EeuAGfIiqcRr4vh69aDJmebtiLpxKYJRlizC/zu7USGz/+\nRUmv6Ok0lLyogvaKcR5xFSJkaZb20gp6VKSPLvL8VCDzT4h12tz0zDvi9leeXkU7\nv0ZOITbp7+4ea2HmZIQrz56Hq0h//u58t0fmnJeDAoGABSiYrqUYiMcDMtJgfFbN\nyese/cYLusbv4RxbQdgLgr+9km9yeLQlFKXyF0nackZHwy1Rqww14HnKDoyZu0Oy\nYqMJc1rwUEni8FYzOYyFIBbZnfXxkgx6pYXsG+CZL7IEH+zOAjHFsbGIPoc4Ws0i\n3VbG6Smoio+Q8l4OvSyg5A8=\n-----END PRIVATE KEY-----\n",
    "client_email": "testinggooglecalendar@mineros-36233.iam.gserviceaccount.com",
    "client_id": "116416764311494000423",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/testinggooglecalendar%40mineros-36233.iam.gserviceaccount.com"
};
const calendarId = "h8kfc77vm0fv62tmcojs0u8ku4@group.calendar.google.com";



// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+05:30';

// Get date-time string for calender
const dateTimeForCalander = () => {

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;
    let event = new Date(Date.parse(newDateTime));
    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    return {
        'start': startDate,
        'end': endDate
    }
};

console.log(dateTimeForCalander());




// Insert new event to Google Calendar
const insertEvent = async (event) => {
    
    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });
    
        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

let dateTime = dateTimeForCalander();

// Event for Google Calendar
let event = {
    'summary': `This is the summary.`,
    'description': `This is the description.`,
    'start': {
        'dateTime': dateTime['start'],
        'timeZone': 'America/Argentina/Cordoba'
    },
    'end': {
        'dateTime': dateTime['end'],
        'timeZone': 'America/Argentina/Cordoba'
    }
};

insertEvent(event)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

// Get all the events between two dates
const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
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

let start = '2022-02-03T00:00:00.000Z';
let end = '2022-02-04T00:00:00.000Z';

getEvents(start, end)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

// Delete an event from eventID
// const deleteEvent = async (eventId) => {

//     try {
//         let response = await calendar.events.delete({
//             auth: auth,
//             calendarId: calendarId,
//             eventId: eventId
//         });

//         if (response.data === '') {
//             return 1;
//         } else {
//             return 0;
//         }
//     } catch (error) {
//         console.log(`Error at deleteEvent --> ${error}`);
//         return 0;
//     }
// };

// let eventId = 'rndks6lg62uim5hc2apg0l0bjo';

// deleteEvent(eventId)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });