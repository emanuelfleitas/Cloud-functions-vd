import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-functions.js"  
import { getDatabase, ref, set ,onValue,push,child,update,remove} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js"  
import {getAuth} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js"  


const requestModal = document.querySelector('.new-request')
const requestLink = document.querySelector('.add-request')
const functions = getFunctions()
// const requestForm = document.querySelector('.new-request form')
const requestForm2 = document.querySelector('.new-request form')
const add = document.querySelector('.add')
const Update = document.querySelector('.update')
const Remove = document.querySelector('.remove')
var auth = getAuth()
const database = getDatabase()


const Summary = document.querySelector('.summary')
const Create = document.querySelector('.create')

const Title = document.getElementById('title')
const EventStart = document.getElementById('eventStart')
const EventEnd = document.getElementById('eventEnd')
const Description = document.getElementById('description')
const IDcalendar = document.getElementById('idcalendar')

const title = document.querySelector('.title')
const eventStart = document.querySelector('.eventStart')
const eventEnd = document.querySelector('.eventEnd')
const description = document.querySelector('.description')
const idcalendar = document.querySelector('.idcalendar')



requestLink.addEventListener('click',()=>{
    requestModal.classList.add('open')
})

requestModal.addEventListener('click',(e)=>{
    if(e.target.classList.contains('new-request')){
        requestModal.classList.remove('open')
    }
})


Create.addEventListener('click',(e)=>{
    e.preventDefault()
    const pushed = push(child(ref(database), 'calendars')).key
    console.log(pushed);

    set(ref(database, 'calendars/'+ pushed ), {
        uid:auth.currentUser.uid,
        summary: Summary.value,
    })
})

const button = document.querySelector('.call')
button.addEventListener('click',()=>{
    // const sayHello = httpsCallable(functions,'sayHello');
    // let accessToken = auth.currentUser.accessToken
    // let uid = auth.currentUser.uid
    // let eventId = "MuvSBYJppk9s7GJoEIB"
    // sayHello({accessToken ,uid,eventId}).then(result=>{
    //     console.log(result);
    // }) 
    // let summary = "calendarios pepess"
    // const sayHello = httpsCallable(functions,'sayHello');
    // sayHello({summary}).then(result=>{
    //     console.log(result);
    // }) 
     console.log("en prueba");
})

// add new request
 add.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(database);
    // const pushed = push(child(ref(database), 'eventsGoogle')).key
    // console.log(pushed);

    const evento = {
        uid:auth.currentUser.uid,
        summary: Title.value,
        startDate: "2022-02-2T17:00:00-07:00",
        endDate: "2022-02-2T17:00:00-07:30",
        description: Description.value,
        idCalendar: IDcalendar.value
    }

    
    const enviarEvento = httpsCallable(functions,'enviarEvento');
    enviarEvento(evento).then(result=>{
        console.log(result);
        // set(ref(database, 'eventsGoogle/'+ pushed ), {
            //     idEvent:result,
            //     uid:auth.evento.uid,
            //     summary: evento.summary,
            //     startDate: "2022-02-2T17:00:00-07:00",
            //     endDate: "2022-02-2T17:00:00-07:30",
            //     description: evento.description,
            //     idCalendar: evento.idCalendar
            // })
    }) 


    // console.log(auth.currentUser.accessToken);
    // set(ref(database, 'eventsGoogle/'+ pushed ), {
    //     idEvent:"asdasdasdasdasdasd",
    //     uid:auth.currentUser.uid,
    //     summary: Title.value,
    //     startDate: "2022-02-2T17:00:00-07:00",
    //     endDate: "2022-02-2T17:00:00-07:30",
    //     description: Description.value,
    //     idCalendar: IDcalendar.value
    // })
    // var data = ""
    // const titleRef = ref(database,'eventsGoogle/'+ pushed );
    // onValue(titleRef,(snapshot) => {
    //     data = snapshot.val();
    //     title.textContent ="Title: " + data.summary;
    //     eventStart.textContent ="Event Start: " + data.startDate;
    //     eventEnd.textContent ="Event End: " + data.endDate;
    //     description.textContent = "Description "+ data.description;
    //     idcalendar.textContent = "IdCalendar "+data.idCalendar;
    // })
    requestForm2.reset();
})

Update.addEventListener('click',(e)=>{
    e.preventDefault();
    const newData = {
        title: Title.value,
        eventStart: EventStart.value.toString(),
        eventEnd: EventEnd.value.toString(),
        description: Description.value
    }
    const newEventKey = push(child(ref(database), 'events')).key;
    const updates = {};
    updates['/events/' + newEventKey] = newData;
    updates['/user-events/' + auth.currentUser.uid + '/' + newEventKey] = newData;
    return update(ref(database), updates);
})

Remove.addEventListener('click',(e)=>{
    e.preventDefault();
    remove(ref(database, 'events/'+ auth.currentUser.uid)).then(()=>{
        console.log("user removido");
    }).catch((error) => {
        console.log(error.message);
    })
})

// ref(database, 'events/'+ auth.currentUser.uid).on('child_added',snapshot=>{
//     console.log('child added !');
// })

    // let events = {
    //     'summary': 'meet prueba',
    //     'description': 'prueba',
    //     'start': {
    //         'dateTime': '2022-02-1T09:00:00-07:00',
    //         'timeZone': 'America/Argentina/Cordoba',
    //     },
    //     'end': {
    //         'dateTime': '2022-02-3T17:00:00-07:00',
    //         'timeZone': 'America/Argentina/Cordoba',
    //     }}

  // say hello function call
 // get functions reference
    // const sayHello = httpsCallable(functions,'sayHello');
    // sayHello({title:'probando titulo',description:'descripc'}).then(result=>{
    //     console.log(result.data);
    // }) 
