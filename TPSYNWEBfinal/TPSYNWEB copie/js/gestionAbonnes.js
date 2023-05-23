"use strict";

const CLE_AUTHENTIFIE = "ABONNE_AUTHENTIFIE";
const CLE_PREFIXE_ABONNE = "ABONNE_";
let btnConnexion;
let btnInscription;
window.addEventListener(
    "load",
    function () {
        initAbonnesDepart();
        btnConnexion = document.getElementById("btnConnexion");
        btnInscription = document.getElementById("btnInscription");
        btnConnexion.addEventListener("click", authentication);
        btnInscription.addEventListener("click", inscription);

    }
);
/*
    Pour les tests, on crée déjà 3 abonnés (hardcoding).
    Éventuellement, les abonnés seront créés par une fonction constructeur.
*/
function initAbonnesDepart() {
    let user = null;
    if (typeof (localStorage) != "undefined") {
        // Le mot de passe non-crypté de user1 est "Ave Maria".
        user = {nom: "user1", motDePasseCrypte: "f24d1a09990934170bbeeed20ab85758", pseudonyme: "Agathe"};
        localStorage.setItem(CLE_PREFIXE_ABONNE + user.nom, JSON.stringify(user));

        // Le mot de passe non-crypté de user2 est "Banana split".
        user = {nom: "user2", motDePasseCrypte: "8656cc8ebb46e96ab90ad17008d9d870", pseudonyme: "Brenda"};
        localStorage.setItem(CLE_PREFIXE_ABONNE + user.nom, JSON.stringify(user));

        // Le mot de passe non-crypté de user3 est "Casa Loma".
        user = {nom: "user3", motDePasseCrypte: "56628af0d9a167d119068049184246b8", pseudonyme: "Celine"};
        localStorage.setItem(CLE_PREFIXE_ABONNE + user.nom, JSON.stringify(user));
    }
}

function Abonne(nom, pseudonyme, motDePasse) {
    this.nom = nom;
    this.pseudonyme = pseudonyme;
    this.motDePasseCrypte = CryptoJS.MD5(motDePasse).toString();
}
  

  Abonne.prototype.sauvegarder = function() {
    localStorage.setItem('ABONNE_' + this.nom, JSON.stringify(this));
  };
  
  function validerNomOuPseudonyme(chaine) {
    return /^[a-zA-Z0-9]{2,10}$/.test(chaine);
  }
  
  function validerNouveauMotDePasse(motDePasse) {
    return /^(?=.*\bA\b){3}(?=.*[a-zA-Z ])[a-zA-Z ]{5,20}$/.test(motDePasse);
  }
  
  function validerNouvelAbonne(nom) {
    return localStorage.getItem('ABONNE_' + nom) === null;
  }
  
  function validerMotDePasseIdentiques(motDePasse, confirmation) {
    return motDePasse === confirmation;
  }
  
  function validerMotDePasse(abonne, motDePasse) {
    return abonne.motDePasse === CryptoJS.MD5(motDePasse).toString();
  }
  
  function estAuthentifie() {
    return sessionStorage.getItem('ABONNE_AUTHENTIFIE') !== null;
  }
  
  function setAuthentifie(abonne) {
    if (abonne) {
      sessionStorage.setItem('ABONNE_AUTHENTIFIE', JSON.stringify(abonne));
    } else {
      sessionStorage.removeItem('ABONNE_AUTHENTIFIE');
    }
  }
  
  function getPseudo() {
    if (estAuthentifie()) {
      var abonne = JSON.parse(sessionStorage.getItem('ABONNE_AUTHENTIFIE'));
      return abonne.pseudonyme;
    }
    return null;
  }
  
  function afficherPseudo() {
    var pseudo = getPseudo();
    if (pseudo) {
    } else {
    }
  }
  
  function getAbonne(nom, motDePasse) {
    var abonneJSON = localStorage.getItem('ABONNE_' + nom);
    
    if (abonneJSON && bonMotdePasse(nom, motDePasse)) {
      return JSON.parse(abonneJSON);
    }
    return null;
  }
  function bonMotdePasse(username, motDepasseEntre) {
    var user = localStorage.getItem("ABONNE_" + username);
    var storedPassword = JSON.parse(user).motDePasseCrypte;
    var enteredPasswordHash = CryptoJS.MD5(motDepasseEntre).toString();
  
    if (enteredPasswordHash === storedPassword) {
      return true; 
    } else {
      return false; 
    }
  }
  


function authentication() {
    var username = document.getElementById("id").value;
    var password = document.getElementById("password").value;
    let user = getAbonne(username, password);
    if (user) {
        setAuthentifie(user);
        window.location.href = "jogger.html";
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect");
    }
}

function inscription() {
    var username = document.getElementById('identifiant').value;
    var pseudonym = document.getElementById('pseudo').value;
    var motDePasse = document.getElementById('pass').value;
    var confirmation = document.getElementById('passconf').value;
  
    if(
    validerNomOuPseudonyme(pseudonym) &&
    
    validerMotDePasseIdentiques(motDePasse, confirmation)&&
    validerNouvelAbonne(username)){
        let abonne = new Abonne(username, pseudonym, motDePasse)
        abonne.sauvegarder();
        alert("Inscription réussie");
        window.location.href = "jogger.html";
    }else{
        alert("Inscription échouée");
    }
    console.log(localStorage);

  }

