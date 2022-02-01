
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
 import { getDatabase} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js"  
 const firebaseConfig = {
    apiKey: "AIzaSyDYw1Exebe4TFsDR-R0Gg_qsAlcY8KIdNg",
    authDomain: "mineros-36233.firebaseapp.com",
    databaseURL: "https://mineros-36233-default-rtdb.firebaseio.com",
    projectId: "mineros-36233",
    storageBucket: "mineros-36233.appspot.com",
    messagingSenderId: "852167180691",
    appId: "1:852167180691:web:2a2bb5cbd22f77188a2866",
    measurementId: "G-2B04T3FNEB"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);

 export{database}


