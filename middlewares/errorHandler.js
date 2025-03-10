// Middleware per la gestione degli errori
function errorHandler(err, req, res, next) {

    console.error(err.stack);

    // Risposta con status error 500
    res.status(500).json({

        error: `Internal Server Error`,
        message: `Server non reperibile`,

    });

}

module.exports = errorHandler;