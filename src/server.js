"use strict";
//InStallazione di un web server
//Inizializziamo node con -> npm init
//Installiamo typescript con npm i -g typescript
//Poi inizializziamo typescript con -> tsc.cmd --init
//Installiamo express con -> nmp install express -> è la libreria più utilizzata in node per i web server
//Installiamo anche i tipi per la libreria express con -> npm i -D @types/express 
//Inizializziamo git con -> git init -> e creiamo un file README.md
//Poi su github e si crea una nuova repository e si digitano i comandi che si trovano sul sito in particolare
//-> git remote add origin -> poi lui fa un git status per verificare i file da aggiungere
//poi fa un -> git add . poi un -> git commit -am "commenti" -> e poi infine -> git push origin master
//Se tutto ok mi trovo dentro la repositoru tutti i pacchetti di VSC e il file resdme con dentro quello
//che ho scritto a video
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Ora iniziamo ad usare express e creo un file server.ts e lo mette dentro la cartella SRC
const express_1 = __importDefault(require("express"));
//Importa express per inizializzare il nostro server
const app = (0, express_1.default)();
//Il server
app.get('/', (req, res) => {
    return res.send('<h1>Ciao</h1> <p>Questo è il mio primo web server</p>');
});
app.listen(3000, () => {
    console.log('Server start at http://localhost:3000');
    //Abilita il server sulla porta 3000 (mai minore di 3000) e quando pronta stampa a video il messaggio
    //Per verificare digito nel terminale -> ts-node src/server.ts
});
