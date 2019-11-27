import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_Key,
    authDomain: process.env.REACT_APP_Auth_Domain,
    databaseURL: process.env.REACT_APP_Database_URL,
    projectId: process.env.REACT_APP_Project_Id,
    storageBucket: process.env.REACT_APP_Storage_Bucket,
    messagingSenderId: process.env.REACT_APP_Messaging_Sender_Id,
    appId: process.env.REACT_APP_Id,
};


class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database()
        this.auth = firebase.auth().signInAnonymously().catch(function (error) {
            var errorCode = error.code;
            if (errorCode === 'auth/operation-not-allowed') {
                alert('You must enable Anonymous auth in the Firebase Console.');
            } else {
                console.error(error);
            }
        });
    }
    
    //Create/Update data in firebase
    async write(id, data) {
        try {
            if (!id) {
                id = this.database.ref().push().key
            }
            data['id'] = id
            await this.database.ref('/users/' + id).set(data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    
    //Get all users data from firebase
    async getAll() {
        try {
            return (await this.database.ref('/users').once('value')).val()
        } catch (err) {
            console.log(err)
            return false
        }
    }
    
    //Delete record from firebase based on the gievn ID
    async remove(id) {
        try {
            this.database.ref('/users/' + id).remove()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
export default new Firebase();
export var storage = firebase.storage();