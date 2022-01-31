
import {signOut, getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js"  



const authSwichLinks = document.querySelectorAll('.switch')
const authModals = document.querySelectorAll('.auth .modal')
const authWrapper = document.querySelector('.auth')
const registerForm = document.querySelector('.register')
const loginForm = document.querySelector('.login')
const SignOut = document.querySelector('.sign-out') 
var auth = getAuth() 

// toggle auth modals
authSwichLinks.forEach((link)=>{
    link.addEventListener('click', ()=>{
        authModals.forEach((modal)=>{
            modal.classList.toggle('active')
        })
    })
})


// register form 
registerForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = registerForm.email.value;
    const password = registerForm.password.value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('Registered ',user);
        registerForm.reset();
    })
    .catch((error) => {
        registerForm.querySelector('.error').textContent = error.message
    });
}) 

// login form 
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('Login ',user);
        loginForm.reset();
    })
    .catch((error) => {
        loginForm.querySelector('.error').textContent = error.message
    });
}) 


// auth listener
onAuthStateChanged(auth,(user) => {
    if(user){
        authWrapper.classList.remove('open')
        authModals.forEach(modal => modal.classList.remove('active'))
    }
    else{
        authWrapper.classList.add('open')
        authModals[0].classList.add('active')
    }
})

//auth sign out 
SignOut.addEventListener('click',()=>{
    signOut(auth).then(() => {
        console.log("salio con exito");
    }).catch((error) => {
        console.log("error: ",error.message);
    });
})
