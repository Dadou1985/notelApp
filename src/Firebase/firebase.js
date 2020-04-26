import firebaseConfig from "./config";
import { navigate } from 'gatsby'

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  async getUserProfile({userId}){
    return this.db.collection('publicUsers').where('userId', '==', userId).get();
  }
  
  getUserId(){
    return this.auth.currentUser
  }

  async register({email, password, username}) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    return this.db.collection("publicUsers").doc(username).set({
      userId: newUser.user.uid
    });
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password).then(()=>navigate('/singlePage'));
  }

  async logout() {
    await this.auth.signOut();
  }



  messageOnAir(){
    return this.db.collection('message').orderBy("notemark", "desc")
  }

  stickerOnAir({userId}){
    return this.db.collection('stickers').where("author", "==", userId)
  }

  toolOnAir({collection}){
    return this.db.collection(collection).orderBy("markup", "asc")
  }

  safeOnAir(){
    return this.db.collection('safe').orderBy("markup", "asc")
  }

  contactOnAir(){
    return this.db.collection('bookPhone').orderBy("name")
  }

  listOnAir({collection}){
    return this.db.collection("checkList").doc("H2syEqycxDFMR78r9wHD").collection(collection).orderBy("markup", "asc")
  }



  async deleteDocument({collection, document}) {
    return this.db.collection(collection).doc(document).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.log(error);
    });
  }

  async deleteTask({collection, document}) {
    return this.db.collection("checkList").doc("H2syEqycxDFMR78r9wHD").collection(collection).doc(document).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.log(error);
    });
  }



  async addMessage({author, text, hour, mark, ref}){
    return this.db.collection('message').add({
      author: author,
      text: text,
      date: hour,
      notemark: mark,
      ref: ref
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addSticker({title, text, author, marker}){
    return this.db.collection('stickers').add({
      title: title,
      text: text,
      author: author,
      marker: marker
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addLostFound({author, date, description, details, lieu, markup, type}){
    return this.db.collection('lostNfound').add({
      author: author,
      date: date,
      description: description,
      details: details,
      lieu: lieu,
      markup: markup,
      type: type
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addCab({author, date, client, chambre, destination, markup, heure}){
    return this.db.collection('cab').add({
      author: author,
      date: date,
      destination: destination,
      client: client,
      chambre: chambre,
      markup: markup,
      heure: heure
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addClock({author, date, client, chambre, markup, heure, day}){
    return this.db.collection('clock').add({
      author: author,
      date: date,
      client: client,
      chambre: chambre,
      day: day,
      markup: markup,
      heure: heure
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addMaid({author, date, client, from, to, motive, state, markup, details}){
    return this.db.collection('maid').add({
      author: author,
      date: date,
      details: details,
      client: client,
      from: from,
      markup: markup,
      to: to,
      motive: motive,
      state, state
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addMaintenance({author, date, client, chambre, details, markup, type}){
    return this.db.collection('maintenance').add({
      author: author,
      date: date,
      details: details,
      client: client,
      chambre: chambre,
      markup: markup,
      type: type
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addSafe({collaborateur, date, montant, shift, markup}){
    return this.db.collection('safe').add({
      collaborateur: collaborateur,
      date: date,
      montant: montant,
      shift: shift,
      markup: markup
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addContact({name, mobile, fix, markup}){
    return this.db.collection('bookPhone').add({
      name: name,
      mobile: mobile,
      fix: fix,
      markup: markup
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addTask({collection, task, markup}){
    return this.db.collection('checkList').doc("H2syEqycxDFMR78r9wHD").collection(collection).add({
      task: task,
      markup: markup
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

}



let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
