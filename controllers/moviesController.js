// Importo il file di connessione al database
const connection = require('../data/db.js');


// ROTTE (endpoints) =

// Funzione per visualizzare tutti i "posts"
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



// Esporto tutto
module.exports = { index }
