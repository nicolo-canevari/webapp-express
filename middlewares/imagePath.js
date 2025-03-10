// Middleware per gestire le immagini
function setImagePath(req, res, next) {

    // Creo il path assoluto dell'immagine
    req.imagePath = `${req.protocol}://${req.get('host')}/img/movies/`;

    // Log per verificare il valore
    console.log('Image Path:', req.imagePath);

    // Passa il controllo al prossimo middleware o alla funzione della rotta
    next();
}

module.exports = setImagePath;