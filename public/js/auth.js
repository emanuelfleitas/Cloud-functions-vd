import {GoogleAuthProvider,signOut, getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged ,signInWithPopup} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js"  
import { getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js"  

const authSwichLinks = document.querySelectorAll('.switch')
const authModals = document.querySelectorAll('.auth .modal')
const authWrapper = document.querySelector('.auth')
const registerForm = document.querySelector('.register')
const loginForm = document.querySelector('.login')
const SignOut = document.querySelector('.sign-out') 
const google = document.querySelector('.google')
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase()

google.addEventListener('click',()=>{
    provider.addScope('https://www.googleapis.com/auth/calendar');
    provider.addScope('https://www.googleapis.com/auth/calendar.events');
    signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(credential);
    // const token = credential.accessToken;
    // const refresh_token = credential.refresh_token;
    const user = result.user;
    console.log(database);
    set(ref(database, 'users/' + user.uid), {
        name: user.displayName,
        email: user.email,
        accessToken: user.accessToken,
        refreshToken: user.stsTokenManager.refreshToken,
        OAuthAccessToken: credential.accessToken,
        OAuthidToken: credential.idToken
    })    
    console.log(user);

  }).catch((error) => {
    const credential = GoogleAuthProvider.credentialFromResult(error);
    console.log(credential);
    console.log(error.message);
  });
})


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
    signOut(auth).then(()=>{
       /*  console.log(auth); */
        console.log("salio");
    }).catch((error) => {
        console.log("no salio");
    })
})


