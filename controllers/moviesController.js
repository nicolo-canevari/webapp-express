// Importo il file di connessione al database
const connection = require('../data/db.js');


// ROTTE (endpoints) =

// Funzione INDEX per visualizzare tutti i "movies"
function index(req, res) {

    // Query da lanciare
    const sql = 'SELECT * FROM movies'

    // Eseguo la query
    connection.query(sql, (err, results) => {

        if (err) {

            // Se c'è un errore, invia una risposta con status 500
            return res.status(500).json({ error: 'Database query failed' });

        }

        // Rispondi con i risultati della query
        res.json(results);

        // I risultati verranno stampati qui
        console.log(results);

    });

}

// Funzione SHOW per visualizzare un singolo "movie" tramite ID
function show(req, res) {

    // Estraggo l'ID dal parametro della rotta
    const movieId = req.params.id;

    // Query per ottenere un singolo film
    const sql = 'SELECT * FROM movies WHERE id = ?';

    // Eseguo la query con l'ID come parametro
    connection.query(sql, [movieId], (err, results) => {

        if (err) {
            // Gestione dell'errore
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Se il film non viene trovato
        if (results.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Risponde con il film trovato
        res.json(results[0]);

    });

}



// Esporto le funzioni
module.exports = { index, show }
