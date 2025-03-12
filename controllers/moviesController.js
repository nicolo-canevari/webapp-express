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


        if (results.length === 0) {
            // Se non ci sono film trovati, restituisci un errore 404
            return res.status(404).json({ error: 'No movies found' });

        }

        // Ciclo .map sul results (su tutto l'array di oggetti) dove posso andare a modificare il valore di img
        const moviesWithImages = results.map(movie => {

            // Se c'è un'immagine nel film, aggiorno il campo `image` con il percorso completo
            if (movie.image) {

                movie.image = `${req.imagePath}${movie.image}`;

            } else {

                movie.image = null; // Se non c'è immagine, mantengo il valore null

            }

            // Restituisco l'intero oggetto film, includendo l'immagine
            return movie;

        });

        // Rispondo con i risultati della query, ora comprensivi di immagini
        res.json(moviesWithImages);

        // I risultati verranno stampati qui
        console.log(moviesWithImages);

    });

}

// Funzione SHOW per visualizzare un singolo "movie" tramite ID
function show(req, res) {

    // Recupero l'ID dal parametro della rotta
    const movieId = req.params.id;

    // Query per ottenere un singolo film
    const sql = 'SELECT * FROM movies WHERE id = ?';

    // Query per ottenere le recensioni
    const reviewSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    // Aggiungo il percorso dell'immagine come variabile d'ambiente
    const imagePath = `${req.protocol}://${req.get('host')}/img/movies/`;

    // Eseguo la query con l'ID come parametro
    connection.query(sql, [movieId], (err, results) => {

        if (err) {

            // Se c'è un errore, invia una risposta con status 500
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Se non viene trovato il film, restituisci un errore 404
        if (results.length === 0) {

            return res.status(404).json({ error: 'Movie not found' });

        }

        // Modifica i risultati per aggiungere l'immagine
        results.forEach(movie => {

            if (movie.image) {

                // Se l'immagine esiste, crea il percorso completo
                movie.image = `${imagePath}${movie.image}`;

            } else {

                // Gestisco i casi in cui non ci sia immagine
                movie.image = null;

            }

        });

        // Recupero le recensioni per il film
        connection.query(reviewSql, [movieId], (err, reviewResults) => {

            if (err) {

                // Se c'è un errore, invia una risposta con status 500
                return res.status(500).json({ error: 'Database query failed for reviews' });

            }

            // Aggiungo le recensioni all'oggetto film
            results[0].reviews = reviewResults;

            // Risponde con i dati del film, inclusi le recensioni
            res.json(results[0]);

        });

    });

}



// Esporto le funzioni
module.exports = { index, show }
