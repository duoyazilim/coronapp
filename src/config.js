import * as firebase from 'firebase';
import 'firebase/firestore';
var config = {
	// YOUR FIREBASE INFORMATIONS
};
firebase.initializeApp(config);

export const f=firebase;
export const database=firebase.database();
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage=firebase.storage();
