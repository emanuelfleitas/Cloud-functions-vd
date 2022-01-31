import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-functions.js"  
const requestModal = document.querySelector('.new-request')
const requestLink = document.querySelector('.add-request')
var functions = getFunctions()
const requestForm = document.querySelector('.new-request form')

requestLink.addEventListener('click',()=>{
    requestModal.classList.add('open')
})

requestModal.addEventListener('click',(e)=>{
    if(e.target.classList.contains('new-request')){
        requestModal.classList.remove('open')
    }
})

// say hello function call
const button = document.querySelector('.call')
button.addEventListener('click',()=>{
    // get functions reference
    const sayHello = httpsCallable(functions,'sayHello');
    sayHello({name:'Ema'}).then(result=>{
        console.log(result.data);
    })
})

// add new request
requestForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const addRequest = httpsCallable(functions,'addRequest');
    addRequest({
        text: requestForm.request.value,
    })
    .then(()=>{
        requestForm.reset();
        requestModal.classList.remove('open');
        requestForm.querySelector('.error').textContent = '';
    })
    .catch(error=>{
        requestForm.querySelector('.error').textContent = error.message;
    })
})

