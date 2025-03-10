// Importo la libreria "mysql2"
const mysql = require('mysql2');

// Creo la connessione al database utilizzando le credenziali
const connection = mysql.createConnection({

    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Pizzapazza33',
    database: process.env.DB_NAME || 'movies_db'

});

//   Avvio la connessione al database
connection.connect((err) => {

    if (err) {
        // Se c'è un errore nella connessione, lo stampiamo in console
        console.error('Errore di connessione al database:', err);

        // Interrompiamo l'esecuzione in caso di errore
        return;

    }

    // Se la connessione va a buon fine
    console.log('Connesso al database MySQL');

});

// Esporto l'oggetto connection per usarlo in altri file
module.exports = connection;