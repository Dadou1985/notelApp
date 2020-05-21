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
    return this.db.collection("hotels").doc("H9781").collection('publicUsers').where('userId', '==', userId).get();
  }

  getUserId(){
    return this.auth.currentUser
  }
  
  async redPhoneFilter({filter}){
    return this.deleteDocument.collection("hotels").orderBy(filter)
  }

  async register({email, password, username, refHotel}) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    return this.db.collection("hotels").doc("H9781").collection("publicUsers").doc(username).set({
      userId: newUser.user.uid,
      userHotel: refHotel
    });
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password).then(()=>navigate('/singlePage'));
  }

  async logout() {
    await this.auth.signOut();
  }



  messageOnAir(){
    return this.db.collection("hotels").doc("H9781").collection('message').orderBy("markup", "desc")
  }

  stickerOnAir({userId}){
    return this.db.collection("hotels").doc("H9781").collection('stickers').where("author", "==", userId)
  }

  overbookingOnAir(){
    return this.db.collection("hotels").doc("H9781").collection('redPhone').orderBy("markup", "asc")
  }

  toolOnAir({collection}){
    return this.db.collection("hotels").doc("H9781").collection(collection).orderBy("markup", "asc")
  }

  safeOnAir(){
    return this.db.collection("hotels").doc("H9781").collection('safe').orderBy("markup", "asc")
  }

  contactOnAir(){
    return this.db.collection("hotels").doc("H9781").collection('contact').orderBy("name")
  }

  listOnAir({collection}){
    return this.db.collection("hotels").doc("H9781").collection("checkList").doc("hSM4fJ0M53FGej8NniMW").collection(collection).orderBy("markup", "asc")
  }

  phoneOnAir(){
    return this.db.collection("hotels").where("roomAvailable", "<", "0")
  }

  filterOnAir({field, operator, filter}){
    return this.db.collection("hotels").where(field, operator, filter)
  }

  hotelOnAir(){
    return this.db.collection("hotels")
  }




  async deleteDocument({collection, document}) {
    return this.db.collection("hotels").doc("H9781").collection(collection).doc(document).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.log(error);
    });
  }

  async deleteTask({collection, document}) {
    return this.db.collection("hotels").doc("H9781").collection("checkList").doc("hSM4fJ0M53FGej8NniMW").collection(collection).doc(document).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.log(error);
    });
  }



  async addMessage({author, text, hour, markup, ref, date}){
    return this.db.collection("hotels").doc("H9781").collection('message').add({
      author: author,
      text: text,
      hour: hour,
      date: date,
      markup: markup,
      ref: ref
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addSticker({title, text, author, markup}){
    return this.db.collection("hotels").doc("H9781").collection('stickers').add({
      title: title,
      text: text,
      author: author,
      markup: markup
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addLostFound({author, date, description, details, place, markup, type}){
    return this.db.collection("hotels").doc("H9781").collection('lostNfound').add({
      author: author,
      date: date,
      description: description,
      details: details,
      place: place,
      markup: markup,
      type: type
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addCab({author, date, client, room, pax, model, destination, markup, hour}){
    return this.db.collection("hotels").doc("H9781").collection('cab').add({
      author: author,
      date: date,
      destination: destination,
      client: client,
      room: room,
      pax: pax,
      model, model,
      markup: markup,
      hour: hour
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addClock({author, date, client, room, markup, hour, day}){
    return this.db.collection("hotels").doc("H9781").collection('clock').add({
      author: author,
      date: date,
      client: client,
      room: room,
      day: day,
      markup: markup,
      hour: hour
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addMaid({author, date, client, fromRoom, toRoom, reason, state, markup, details}){
    return this.db.collection("hotels").doc("H9781").collection('maid').add({
      author: author,
      date: date,
      details: details,
      client: client,
      fromRoom: fromRoom,
      markup: markup,
      toRoom: toRoom,
      reason: reason,
      state, state
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addMaintenance({author, date, client, room, details, markup, type}){
    return this.db.collection("hotels").doc("H9781").collection('maintenance').add({
      author: author,
      date: date,
      details: details,
      client: client,
      room: room,
      markup: markup,
      type: type
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addSafe({author, date, amount, shift, markup}){
    return this.db.collection("hotels").doc("H9781").collection('safe').add({
      author: author,
      date: date,
      amount: amount,
      shift: shift,
      markup: markup
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addContact({name, mobile, fix, markup}){
    return this.db.collection("hotels").doc("H9781").collection('contact').add({
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
    return this.db.collection("hotels").doc("H9781").collection('checkList').doc("hSM4fJ0M53FGej8NniMW").collection(collection).add({
      task: task,
      markup: markup
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addRedPhone({doc, hotelName, client, pax, totalRoom, totalNight, pec, refHotel, markup}){
    return this.db.collection("hotels").doc(doc).collection("redPhone").add({
      hotelName: hotelName,
      client: client,
      pax: pax,
      totalRoom: totalRoom,
      totalNight: totalNight,
      pec: pec,
      refHotel: refHotel,
      markup: markup
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  

  async updateRoomAvailable({room, rac}){
    return this.db.collection("hotels").doc("H9781").update({
      roomAvailable: room,
      rac: rac
    })
    .then(function() {
      console.log("Document successfully updated!");
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
