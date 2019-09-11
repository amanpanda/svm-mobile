// import * as firebase from 'firebase';

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyBNkrmdblPhTSD8so5nYDVKRymgzRS6r5s",
//   authDomain: "svm-survey.firebaseapp.com",
//   databaseURL: "https://svm-survey.firebaseio.com",
//   projectId: "svm-survey",
//   storageBucket: "svm-survey.appspot.com",
//   messagingSenderId: "928669787746",
//   appId: "1:928669787746:web:77a2302f4325635d88133b",
// };

// export default () => firebase.initializeApp(firebaseConfig);


// Initialize Firebase
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyBNkrmdblPhTSD8so5nYDVKRymgzRS6r5s",
  authDomain: "svm-survey.firebaseapp.com",
  databaseURL: "https://svm-survey.firebaseio.com",
  projectId: "svm-survey",
  storageBucket: "svm-survey.appspot.com",
  messagingSenderId: "928669787746",
  appId: "1:928669787746:web:77a2302f4325635d88133b",
};

app.initializeApp(config);

const auth = app.auth();
const firestore = app.firestore();
const storage = app.storage();

export {
  auth,
  storage,
  firestore,
};
