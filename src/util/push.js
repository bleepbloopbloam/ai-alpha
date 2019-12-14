import firebase from "firebase";

export const initializeFirebase = authCode => {
  firebase.initializeApp({
    messagingSenderId: "318184339331"
  });

  if (firebase.messaging.isSupported()) {
    var messaging = firebase.messaging();

    messaging.onMessage(function(payload) {
      console.log("Message received. ", payload);
      new Notification(payload.data.title, payload.data);
    });

    messaging
      .requestPermission()
      .then(function() {
        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging
          .getToken()
          .then(function(currentToken) {
            if (currentToken) {
              // send token to the server if is isn't sent before
              sendTokenToServer(currentToken);
            } else {
              console.warn(
                "No Instance ID token available. Request permission to generate one."
              );
              setTokenSentToServer(false);
            }
          })
          .catch(function(err) {
            console.warn("An error occurred while retrieving token. ", err);
            setTokenSentToServer(false);
          });
      })
      .catch(function(err) {
        console.warn("Unable to get permission to notify.", err);
      });
  }
  function send(url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    if (data) {
      var params = "";
      for (var property in data) {
        if (data.hasOwnProperty(property)) {
          if (params != "") {
            params += "&";
          }
          params += property + "=" + encodeURIComponent(data[property]);
        }
      }

      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(params);
    } else {
      xhr.send(null);
    }
  }

  function sendTokenToServer(currentToken) {
    // always send token for fix session expire
    if (true || !isTokenSentToServer()) {
      console.log("Sending token to server...");
      send("https://satoshiboom.com/back/tools/notifier/register.php", {
        token: currentToken,
        user: authCode
      });
      setTokenSentToServer(true);
    } else {
      console.log(
        "Token already sent to server so won't send it again unless it changes"
      );
    }
  }

  function isTokenSentToServer() {
    return window.localStorage.getItem("sentToServer") == 1;
  }

  function setTokenSentToServer(sent) {
    window.localStorage.setItem("sentToServer", sent ? 1 : 0);
  }
};

var config = {
  serverKey:
    "AAAAShVDt4M:APA91bFZGazm7VS7AnOYrmpEyxP-IRdX0_f8dq1sIZqrhrP05QfzDYTirkeCwLCvgNl7zEoRwwx-OGRnd4ID59ht0EOAJWEnuUB1aG5E8YqBxJsJeV_YpFxm3R2OShdswUl9jqihLn4A",
  apiKey: "AIzaSyBhsv8uqsMqtaEvjIPqW4f87gQ4fV_7BrI",
  wpOpenKey:
    "BL6DgWU39H70KoG7lngGDs9WchaoHaFo5iSNk_b6wtBxTCB4mct2zgnL3LJ96SstdS2598w8jqJagsTs8bAAnTg",
  wpClosedKey: "rVdMVCuje9K5UTt9D1h1jJTJdYqeXwU3ENXsUtDsj30",
  messagingSenderId: "318184339331"
};
