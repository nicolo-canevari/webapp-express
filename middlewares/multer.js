const multer = require('multer');

// Configurazione di Multer per il salvataggio delle immagini nella cartella 'uploads'
const storage = multer.diskStorage({

    // La destinazione per salvare il file
    destination: "./public/img/movies/",

    // Nome del file che verrà salvato
    filename: (req, file, cb) => {

        // Genera un nome unico per il file
        const uniqueName = `${Date.now()}-${file.originalname}`;
        // Passiamo il nome unico al callback
        cb(null, uniqueName);

    },

});

// Crea l'istanza di Multer con la configurazione sopra definita
const upload = multer({ storage });

module.exports = upload;