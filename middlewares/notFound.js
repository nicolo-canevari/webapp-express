// Middleware per gestire le rotte non trovate
function notFound(req, res, next) {

    res.status(404).json({

        status: 404,
        error: "Not Found",
        message: `La rotta ${req.originalUrl} non esiste`

    });

}

module.exports = notFound;