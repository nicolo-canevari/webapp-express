// Middleware per gestire le immagini
function setImagePath(req, res, next) {

    // Creo il patch assoluto dell' immagine
    req.imagePath = `${req.protocol}://${req.get(`host`)}/img/movies/`;
    // Passa il controllo al prossimo middleware o alla funzione della rotta
    next()

}

module.export = setImagePath;