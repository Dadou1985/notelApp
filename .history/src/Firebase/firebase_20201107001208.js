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

  async getUserProfile({userId, refHotel}){
    return this.db.collection('hotels').doc(`${refHotel}`).collection("users").where('userId', '==', userId).get();
  }

  getUserFields({refHotel, username}){
    return this.db.collection("hotels")
    .doc(`${refHotel}`)
    .collection("users")
    .doc(username)
  }

  getHotelFields({documentId}){
    return this.db.collection("hotels").doc(documentId)
  }

  getUserId(){
    return this.auth.currentUser
  }

  async deleteUserAuth(){
    const userAuth = await this.auth.currentUser
    return userAuth.delete().then(function() {
      // User deleted.
    }).catch(function(error) {
      // An error happened.
    });
  }
  
  async redPhoneFilter({filter}){
    return this.deleteDocument.collection("hotels").orderBy(filter)
  }

  async adminRegister({username, refHotel}) {
    //const currentUserProfile = await this.auth.currentUser
    return this.db.collection("hotels").doc(`${refHotel}`).collection("users").doc(username).set({
      adminRegistration: true,
      refHotel: refHotel,
      markup: Date.now()
    })
  }

  async register({email, password, username, refHotel}) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    await this.auth.currentUser.updateProfile({displayName: refHotel})
    return this.db.collection("hotels")
    .doc(`${refHotel}`)
    .collection("users")
    .doc(username)
    .update({    
      userId: newUser.user.uid,
      mail: email,
      password: password 
    }) 
    .then(()=>navigate('/yinYanPage'))   
  }

  async freeRegister({email, password, username, refHotel}) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    await this.auth.currentUser.updateProfile({displayName: refHotel})
    await this.db.collection("hotels")
    .doc(`${refHotel}`)
    .collection("users")
    .doc(username)
    .set({    
      userId: newUser.user.uid,
      mail: email,
      password: password,
      refHotel: refHotel,
      markup: Date.now() 
    }) 
    return this.db.collection("iziUsers")
    .doc(username)
    .set({
      userId: newUser.user.uid,
      refHotel: refHotel,
      tips: 10,
      hotelName: "Bates Motel",
      category: "Garde de Nuit",
      casquette: "Réceptionniste",
      mood: "IziLife",
      markup: Date.now()
    })
    .then(()=>navigate('/yinYanPage'))   
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password).then(()=>navigate('/yinYanPage'));
  }

  async logout() {
    await this.auth.signOut();
  }



  messageOnAir({documentId, date}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('message')
    .where("markup", "<", date)
    .orderBy("markup", "desc")
  }

  stickerOnAir({documentId, userId}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('stickers')
    .where("author", "==", userId)
  }

  overbookingOnAir({documentId, table}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('overbooking')
    .doc("tables")
    .collection(table)
    .orderBy("token", "asc")
  }

  toolOnAir({documentId, collection}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection(collection)
    .orderBy("markup", "asc")
  }

  safeOnAir({documentId}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('safe')
    .orderBy("markup", "asc")
  }

  contactOnAir({documentId}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('contact')
    .orderBy("name")
  }

  listOnAir({documentId, collection}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection("checkList")
    .doc("lists")
    .collection(collection)
    .orderBy("markup", "asc")
  }

  phoneOnAir(){
    return this.db.collection("hotels")
    .where("roomAvailable", "<", "0")
  }

  filterOnAir({field, operator, filter}){
    return this.db.collection("hotels")
    .where(field, operator, filter)
  }

  hotelOnAir(){
    return this.db.collection("hotels")
  }

  adminOnAir({documentId, mail}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection("users")
    .where("mail", "==", mail)
  }

  adminRegisterOnAir({documentId}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection("users")
    .where("adminRegistration", "==", true)
  }

  iziUserOnAir()



  async deleteDocument({documentId, collection, document}) {
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection(collection)
    .doc(document)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.log(error);
    });
  }

  async deleteOverbooking({refHotel, collection, document}) {
    return this.db.collection("hotels")
    .doc(refHotel)
    .collection("overbooking")
    .doc("tables")
    .collection(collection)
    .doc(`${document}`)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.log(error);
    });
  }

  async deleteTask({documentId, collection, document}) {
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection("checkList")
    .doc("lists")
    .collection(collection)
    .doc(document)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.log(error);
    });
  }

  async deleteUser({documentId, document}){
    await this.db.collection('hotels')
    .doc(`${documentId}`)
    .collection("users")
    .doc(document)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.log(error);
    });
  }
  



  async addMessage({documentId, author, text, hour, markup, ref, date}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('message')
    .add({
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

  async addSticker({documentId, title, text, author, assignee, markup}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('stickers')
    .add({
      title: title,
      text: text,
      author: author,
      assignee: assignee,
      markup: markup
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addLostFound({documentId, author, date, description, details, place, markup, type}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('lostNfound')
    .add({
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

  async addCab({documentId, author, date, client, room, pax, model, destination, markup, hour}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('cab')
    .add({
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

  async addClock({documentId, author, date, client, room, markup, hour, day}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('clock')
    .add({
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

  async addMaid({documentId, author, date, client, fromRoom, toRoom, reason, state, markup, details}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('maid')
    .add({
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

  async addMaintenance({documentId, author, date, client, room, details, markup, type}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('maintenance')
    .add({
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

  async addSafe({documentId, author, date, amount, shift, markup}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('safe')
    .add({
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

  async addContact({documentId, name, mobile, fix, markup}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('contact')
    .add({
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

  async addTask({documentId, collection, task, markup}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .collection('checkList')
    .doc("lists")
    .collection(collection)
    .add({
      task: task,
      markup: markup
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addOverbookIn({doc, hotelName, client, pax, totalRoom, totalNight, pec, initialPrice, refHotel, status, markup, token}){
    return this.db.collection("hotels")
    .doc(doc).collection("overbooking")
    .doc("tables")
    .collection("overbookIn")
    .doc(`${markup}`)
    .set({
      hotelName: hotelName,
      client: client,
      pax: pax,
      totalRoom: totalRoom,
      totalNight: totalNight,
      initialPrice: initialPrice,
      pec: pec,
      refHotel: refHotel,
      status: status, 
      token: token
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addOverbookOut({doc, hotelName, client, pax, totalRoom, totalNight, pec, initialPrice, refHotel, status, markup, token}){
    return this.db.collection("hotels")
    .doc(doc).collection("overbooking")
    .doc("tables")
    .collection("overbookOut")
    .doc(`${markup}`)
    .set({
      hotelName: hotelName,
      client: client,
      pax: pax,
      totalRoom: totalRoom,
      totalNight: totalNight,
      initialPrice: initialPrice,
      pec: pec,
      refHotel: refHotel,
      status: status,
      token: token
    }).then(function(docRef){
      console.log(docRef.id)
    }).catch(function(error) {
      console.error(error)
    })
  }

  async addNotification({documentId, notification}){
    return this.db.collection('hotels').doc(`${documentId}`).collection('notifications')
    .add({
      content: notification,
      markup: Date.now()})
    .then(doc => console.log('nouvelle notitfication'))
  }


  async updateUsers({userId, newEmail, newPassword, newDisplayName}){
    return this.auth.updateUser(userId, {
      email: newEmail,
      password: newPassword,
      displayName: newDisplayName
    })
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully updated user', userRecord.toJSON());
      })
      .catch(function(error) {
        console.log('Error updating user:', error);
      });
     
  }

  async updateUserHotel({username, newHotel}){
    return this.db.collection("publicUsers")
    .doc(username)
    .update({
      hotel: newHotel
    })
    .then(function() {
      console.log("Document successfully updated!");
    })
  }

  async updateRoomAvailable({documentId, room}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .update({
      roomAvailable: room
    })
    .then(function() {
      console.log("Document successfully updated!");
    })
  }

  async updateRack({documentId, rac}){
    return this.db.collection("hotels")
    .doc(`${documentId}`)
    .update({
      rac: rac
    })
    .then(function() {
      console.log("Document successfully updated!");
    })
  }

  async updateOverbooking({doc, table, overbookingId, status}){
    return this.db.collection("hotels")
    .doc(doc).collection("overbooking")
    .doc("tables")
    .collection(table)
    .doc(`${overbookingId}`)
    .update({
      status: status
    })
    .then(function() {
      console.log("Document successfully updated!");
    })
  }


//Feedback Database

async addFeedback({refHotel, author, categorie, text}){
  return this.db.collection("feedbacks")
  .doc("feedback")
  .collection(categorie)
  .add({
    author: author,
    refHotel: refHotel,
    text: text,
    markup: Date.now()
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
