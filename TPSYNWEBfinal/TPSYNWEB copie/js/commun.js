"use strict";

// Initialisations générales (pour toutes les pages) lorsqu'une page est chargée.
window.addEventListener(
    "load",
    function () {
        initAbonnesDepart();
        // afficherPseudo();
    }
);

const URL_ACCUEIL = "index.html";
const URL_JEU = "jogger.html";

const PAGE_ACCUEIL = 'accueil';
const PAGE_JEU = 'jeu';

// Booléen indiquant si une partie est en cours.
// Il servira entre autres à avertir l'utilisateur que la partie se terminera s'il tente de revenir à la page
// d'accueil pendant une partie.
let partieEnCours;

// Fonction qui sera appelée lorsque l'on veut changer de page.
// Elle contient la logique pour vérifier si le changement de page doit être effectué.
function naviguerPage(destination) {
    let continuer = true;
    switch (destination) {
        case PAGE_ACCUEIL:
            window.location.replace(URL_ACCUEIL);
            break;

        case PAGE_JEU:
            window.location.replace(URL_JEU);
            break;
    }
}
