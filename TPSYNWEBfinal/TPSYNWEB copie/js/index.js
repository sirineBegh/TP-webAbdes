"use strict";

// Initialisations spécifiques à la page de connexion lorsque la page est chargée (ajout des listener, etc).
window.addEventListener("load",
    function () {
        // Listener déclenché lorsqu'une zone collapsible de la page a été affichée.
        $(".collapse").on("shown.bs.collapse", function (e) {

        });

        // Listener déclenché lorsqu'une fenêtre modale vient de s'afficher.
        $('#idFenetre').on('shown.bs.modal', function () {

        });

        // Listener déclenché lorsqu'une fenêtre modale vient de se refermer.
        $('#idFenetre').on('hidden.bs.modal', function () {

        });
    }
);


