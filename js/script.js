const firebaseConfig = {
    apiKey: "AIzaSyDSO5vUlDcUQ6jJUfpS9Hf9mAqjnoRXRhQ",
    authDomain: "datos-de-formulario-89c9a.firebaseapp.com",
    projectId: "datos-de-formulario-89c9a",
    storageBucket: "datos-de-formulario-89c9a.appspot.com",
    messagingSenderId: "680849158242",
    appId: "1:680849158242:web:9698dc082839953744e13b",
    measurementId: "G-ZSV0C850MR"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// -----------------------------------------------------------------------------

document.getElementById("formulario").addEventListener("submit", (event) => {
  event.preventDefault();

  //Validar nombre
  let entradaNombre = document.getElementById("name");
  let errorNombre = document.getElementById("nameError");

  if (entradaNombre.value.trim() == "") {
    //Si hay contenido en la etiqueta
    errorNombre.textContent = "Por favor, introducí tu nombre.";
    errorNombre.classList.add("error-message");
  } else {
    errorNombre.textContent = "";
    errorNombre.classList.remove("error-message");
  }

  //Validar correo electrónico
  let entradaCorreo = document.getElementById("email");
  let errorCorreo = document.getElementById("emailError");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

  if (!emailPattern.test(entradaCorreo.value)) {
    errorCorreo.textContent = "Por favor, introducí un mail válido.";
    errorCorreo.classList.add("error-message");
  } else {
    errorCorreo.textContent = "";
    errorCorreo.classList.remove("error-message");
  }

  //Validar contraseña
  let entradaPassword = document.getElementById("password");
  let errorPassword = document.getElementById("passwordError");
  let patternPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

  if (!patternPassword.test(entradaPassword.value)) {
    errorPassword.textContent =
      "La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caractéres especiales.";
    errorPassword.classList.add("error-message");
  } else {
    errorPassword.textContent = "";
    errorPassword.classList.remove("error-message");
  }

  //Validar si todos los campos son válidos, enviar formulario
  if (
    !errorNombre.textContent &&
    !errorCorreo.textContent &&
    !errorPassword.textContent
  ) {
    //Backend que reciba la información

    // Add a new document in collection "cities"
    db.collection("users").add({
        nombre: entradaNombre.value,
        email: entradaCorreo.value,
        password: entradaPassword.value
    })
    .then((docRef) => {
        alert("El formulario se ha enviado con éxito.", docRef.id);
        document.getElementById("formulario").reset();
      })
      .catch((error) => {
        alert(error);
      });
  }
});