import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDibMe1YCAbXibqEL4M7TH89hK0zFy2kjI",
  authDomain: "fir-react-upload-bc250.firebaseapp.com",
  projectId: "fir-react-upload-bc250",
  storageBucket: "fir-react-upload-bc250.appspot.com",
  messagingSenderId: "1013791863965",
  appId: "1:1013791863965:web:127c1d3214cc38f4e35074",
  measurementId: "G-7Y2WDBRPMT",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
