const admin = require('firebase-admin')
const express = require('express')

const app = express()
const PORT = 5000

const firebaseConfig = {
  credential: admin.credential.cert(require('./keys/admin.json')),
  apiKey: 'AIzaSyDu8jmuZBGk-1nc0uH8skVYpnI6ofGZkdg',
  authDomain: 'todoapp-9b179.firebaseapp.com',
  projectId: 'todoapp-9b179',
  storageBucket: 'todoapp-9b179.appspot.com',
  messagingSenderId: '599053621437',
  appId: '1:599053621437:web:15307ef6fb96edc1297fd4',
}

admin.initializeApp(firebaseConfig)

const db = admin.firestore()
const searchForm = document.querySelector('form')

const logData = () => {
  db.collection('chats')
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => console.log(doc.data()))
    })
}
const setData = (uid) => {
  //let message = { sender: sender, message: msg }
  let data = {
    uid,
    createdAt: Date.now(),
    count: 0,
    messages: [],
  }

  db.collection('chats').doc(uid).set(data)
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  msg = e.target.querySelector('input').value
  sendMessage('9zZcOuw6JYKqvOXFaYue', 'nova', msg)
})

const sendMessage = (chatId, sender, msg) => {
  const data = {
    sender,
    msg,
    createdAt: Date.now(),
  }
  db.collection('chats')
    .doc(chatId)
    .update({ messages: admin.firestore.FieldValue.arrayUnion(data) })
}

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
//logData()
suite a une augmentation tarifaire.