import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-functions.js"  
import { getDatabase, ref, set ,onValue,push,child,update,remove} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js"  
import {getAuth} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js"  
// import {database} from "./init.js"
const requestModal = document.querySelector('.new-request')
const requestLink = document.querySelector('.add-request')
var functions = getFunctions()
// const requestForm = document.querySelector('.new-request form')
const requestForm2 = document.querySelector('.new-request form')
const add = document.querySelector('.add')
const Update = document.querySelector('.update')
const Remove = document.querySelector('.remove')
var auth = getAuth()
const database = getDatabase()


const Title = document.getElementById('title')
const EventStart = document.getElementById('eventStart')
const EventEnd = document.getElementById('eventEnd')


const title = document.querySelector('.title')
const eventStart = document.querySelector('.eventStart')
const eventEnd = document.querySelector('.eventEnd')

requestLink.addEventListener('click',()=>{
    requestModal.classList.add('open')
})

requestModal.addEventListener('click',(e)=>{
    if(e.target.classList.contains('new-request')){
        requestModal.classList.remove('open')
    }
})







// say hello function call
// const button = document.querySelector('.call')
// button.addEventListener('click',()=>{
//     // get functions reference
//     const sayHello = httpsCallable(functions,'sayHello');
//     sayHello({name:'Ema'}).then(result=>{
//         console.log(result.data);
//     })
// })

// add new request
add.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(database);
    console.log(auth.currentUser.uid);
    set(ref(database, 'events/' + auth.currentUser.uid), {
        title: Title.value,
        eventStart: EventStart.value.toString(),
        eventEnd: EventEnd.value.toString()
    })
    
    
    var data = "";
    const titleRef = ref(database,'events/'+ auth.currentUser.uid );
    onValue(titleRef,(snapshot) => {
        data = snapshot.val();
        title.textContent ="Title: " + data.title;
        eventStart.textContent ="Event Start: " + data.eventStart;
        eventEnd.textContent ="Event End: " + data.eventEnd
        // console.log(data.title);
        // console.log(data.eventStart);
        // console.log(data.eventEnd);
    })

    requestForm2.reset();

    // functions.database.ref('/events/'+2).set({
    //     title: requestForm2.title.value,
    //     eventStart: requestForm2.eventStart.value.toString(),
    //     eventEnd: requestForm2.eventEnd.value.toString()
    // })

    // const addRequest = httpsCallable(functions,'addRequest');
    // addRequest({
    //     text: requestForm.request.value,
    // })
    // .then(()=>{
    //     requestForm.reset();
    //     requestModal.classList.remove('open');
    //     requestForm.querySelector('.error').textContent = '';
    // })
    // .catch(error=>{
    //     requestForm.querySelector('.error').textContent = error.message;
    // })
})


Update.addEventListener('click',(e)=>{
    e.preventDefault();
    const newData = {
        title: Title.value,
        eventStart: EventStart.value.toString(),
        eventEnd: EventEnd.value.toString()
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


ref(database, 'events/'+ auth.currentUser.uid).on('child_added',snapshot=>{
    console.log('child added !');
})

