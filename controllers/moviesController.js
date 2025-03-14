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

// Funzione STORE per l'aggiunta di un nuovo post
const store = (req, res) => {

    // Ottengo l'ID del film dalla rotta
    const movieId = req.params.id;

    // Estraggo i dati dal corpo della richiesta (req.body)
    const { name, vote, text } = req.body;

    // Controlla che tutti i campi siano presenti
    if (!name || !vote || !text) {

        // Se manca uno dei campi, ritorna un errore 400 con un messaggio
        return res.status(400).json({ error: "Tutti i campi sono obbligatori" });

    }

    const sql = 'INSERT INTO reviews (movie_id, name, vote, text, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';

    // Eseguo la query SQL per inserire la nuova recensione
    connection.query(sql, [movieId, name, vote, text], (err, result) => {

        if (err) {

            return res.status(500).json({ error: 'Errore durante l\'inserimento della recensione' });

        }

        // Respondo con i dati della recensione salvata
        res.status(201).json({

            id: result.insertId,
            name,
            vote,
            text

        });

    });

};


// Funzione STORE per aggiungere un nuovo film
function storeMovie(req, res, next) {

    const { title, director, genre, release_year, abstract } = req.body;

    // Gestisco il valore del nome del file immagine creato da Multer
    const imageName = req.file ? req.file.filename : null;

    // Controllo se tutti i campi obbligatori sono presenti
    if (!title || !director || !genre || !release_year) {

        return res.status(400).json({ error: "Titolo, regista, genere e anno di uscita sono obbligatori" });

    }

    // Creo la query per inserire il nuovo film nel database
    const query = "INSERT INTO movies (title, director, genre, release_year, image, abstract, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())";

    // Eseguo la query per l'inserimento del film
    connection.query(query,

        [title, director, genre, release_year, imageName, abstract],

        (err, result) => {

            if (err) {

                console.log(err);
                return next(new Error("Errore interno del server"));

            }

            // Risposta di successo
            res.status(201).json({

                status: "success",
                message: "Film creato con successo!",
                movieId: result.insertId,

            });

        }

    );

}


// Esporto le funzioni
module.exports = { index, show, store, storeMovie }
