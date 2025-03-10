// Importo il modulo express
const express = require('express');
// Creo un'istanza dell'applicazione Express
const app = express();
// Definisco la porta su cui il server ascolterà le richieste HTTP
const port = 3000;


// Gestisce la rotta principale
app.get('/', (req, res) => {

    res.send('Ciao sono la rotta Home della tua Webapp');

})

// Utilizzo il router dei post per le rotte /posts
// app.use("/movies", postRouter);


// Middleware per gestire le richieste JSON
app.use(express.json());

// Importo i Middleware
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// Middleware per gestire le rotte non trovate (404)
app.use(notFound);

// Middleware per gestire errori generici del server (500)
app.use(errorHandler);

// Ascolta sulla porta 3000
app.listen(port, () => {

    // stampo sul terminale
    console.log(`Server in ascolto sulla porta ${port}`)

});

// Gestione dei file statici della cartella 'public'
app.use(express.static('public'));





