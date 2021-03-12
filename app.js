// Your web app's Firebase configuration
var firebaseConfig = {
    //code
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging()

  // subscribe
  function subscribe(){
        Notification.requestPermission().then(permission=>{
          console.log(permission)
          if(permission == "granted"){
              messaging.getToken({vapidKey:"public_key"}).then(currentToken=>{
                  console.log(currentToken)
                  document.getElementById('showToken').innerHTML = currentToken

              })
          }
        }).catch(e=>{
            console.log(e)
        })
  }

  messaging.onMessage(res=>{
      console.log(res)
  })

  // send Notofication
  function sendNotification(){
      // Get data
      const token = document.getElementById('usertoken').value 
      const title = document.getElementById('title').value
      const msg = document.getElementById('msg').value

      let body = {
          to: token,
          notification:{
              title: title,
              body: msg,
              icon:'icon.png',
              click_action:"https://vrijraj.xyz/"
          }
      }
      console.log(body)

      const options = {
          method: "POST",
          headers: new Headers({
            Authorization:"key=YOUR_SERVER_KEY",
            "Content-Type":"application/json"
          }),
          body:JSON.stringify(body)
      }

      fetch("https://fcm.googleapis.com/fcm/send", options).then(res=>res.json()).then(data=>{
            console.log(data)
      }).catch(e=>console.log(e))

  }
