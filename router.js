/* Appel de tous nos outils */

const express = require("express");
const expressApp = express();
const http = require("http").Server(expressApp);
const path = require("path");
/*Ajout de Espress-ejs-layouts*/
const ejsLayout = require('express-ejs-layouts');

/*Initialisation des variables */

const router = {
  isStarted: false,
};

function start(callback) {
  if (router.isStarted === false) {
    init(function () {
      loadRoutes(function () {
        /* Lance le serveur web sur le port 3000 */
        http.listen(3000, function name(params) {
          console.log("Application is running on port 3000");
          router.isStarted = true;
          if (typeof callback != "undefined") {
            callback();
          }
        });
      });
    });
  }
  else {
    console.log("Application already started");
    if (typeof callback != 'undefined') {
        callback();
    }
  }
}

function init(callback) {
    /* On s'assure que le serveur n'est vraiment pas démarré */
    router.isStarted = false;
    /* Ajout de express-ejs-layouts*/
    expressApp.use(ejsLayout);
    /* j'utilise ic EJS comme moteur de template */
    expressApp.set('view engine', 'ejs');
    /* assets sera le répertoire où se trouverons nos fichers côté client */
    expressApp.use(express.static(path.join(__dirname, 'assets')));

    /* views est défini comme notre dossier de vus par défaut */
    expressApp.set ('views', path.join(__dirname, '/views/'));
    if (typeof callback != 'undefined') {
        callback();
    }
}

/* Routes */
function loadRoutes(callback) {
    expressApp.get('/', function (req, res) {
        res.render('homepage/index');
    });
    if (typeof callback != 'undifined') {
        callback();
    }
}

module.exports = {
    start: start
}
