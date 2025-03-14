// Middleware per gestire le immagini
function setImagePath(req, res, next) {

    // Imposto il percorso base dell'immagine
    req.imagePath = `${req.protocol}://${req.get('host')}/img/movies/`;

    // Passa al prossimo middleware o route handler
    next();

}

module.exports = setImagePath;