import firebase from "firebase";
import 'firebase/storage';

const config ={
    apiKey: "AIzaSyBfBmX8XJOkCdJw5Z3pppu19G7JRy5U1g4",
    authDomain: "blog-3dcd5.firebaseapp.com",
    databaseURL: "https://blog-3dcd5-default-rtdb.firebaseio.com",
    projectId: "blog-3dcd5",
    storageBucket: "blog-3dcd5.appspot.com",
    messagingSenderId: "749827628914",
    appId: "1:749827628914:web:aca76ffe866bedf04687eb",
    measurementId: "G-9N7E3ZZF80"

}
firebase.initializeApp(config);
export default firebase
{/*
  import firebase from "firebase";
import 'firebase/storage';

const config ={
    apiKey: "AIzaSyBfBmX8XJOkCdJw5Z3pppu19G7JRy5U1g4",
    authDomain: "blog-3dcd5.firebaseapp.com",
    databaseURL: "https://blog-3dcd5-default-rtdb.firebaseio.com",
    projectId: "blog-3dcd5",
    storageBucket: "gs://blog-3dcd5.appspot.com",

    messagingSenderId: "749827628914",
    appId: "1:749827628914:web:aca76ffe866bedf04687eb",
    measurementId: "G-9N7E3ZZF80"

}
firebase.initializeApp(config);
const storage = firebase.storage();

export  {
    storage, firebase as default
  }  
*/}