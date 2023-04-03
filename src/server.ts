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

//Ora iniziamo ad usare express e creo un file server.ts e lo mette dentro la cartella SRC

import express from 'express'
//Importa express per inizializzare il nostro server

const app= express()
//Il server

// app.get('/', (req, res)=>{
//   return  res.send('<h1>Ciao</h1> <p>Questo è il mio primo web server</p>')
// //Faccio una richiesta al server con url principale '/' e una callback con una request e una response che
// //appunto è quello che mi aspetto di ritorno al nostro browser nello specifico una stringa res.send(stringa)
// //Posso vedere cosa c'è nella richiesta con console.log(req.url) o (req.headers)
// })

// app.get ('/ciao', (req, res)=>{
//   return res.send ('<h1>Ciao</h1> <p>Questa è la pagina Ciao</p>')
// //Così setto una pagina con un url esistente (fai attenzione a non mettere dopo le righe per il 404)

// })

// //Per creare pagine in modo dinamico con gli url parameters
// app.get ('/greeting/:name', (req, res) =>{
//   console.log(req.params)
//     const name: string = req.params.name
//     //Così gli dico di inserire il name dentro i params
//     return res.send (`<h1>Ciao ${name}</h1> <p>Questa è la pagina dei saluti dinamica</p>`)
// })
// app.get ('*', (req, res)=>{
//   return res.status(404).send ('<h1>404 </h1> <p>Pagina non trovata</p>')
// //Così setto una pagina con un url non esistente -> * significa qualsiasi altra cosa

// })

// app.listen(3000, () =>{
//     console.log('Server start at http://localhost:3000')
// //Abilita il server sulla porta 3000 (mai minore di 3000) e quando pronta stampa a video il messaggio
// //Per verificare digito nel terminale -> ts-node src/server.ts
// })

//////////////////////////////////  USO DEI QUERY PARAMETERS  ///////////////////////////////////////////
//Vado a conteggiare il numero di accessi alla mia pagina web

let count= 0;

//`/?minus=2`
app.get ('/', (req,res)=>{
  const minus = Number(req.query.minus)
    if (Number.isInteger(minus)) {
//se minus è un numero
      count -= minus
    } else {
      count +=1
    }
    console.log(req.query)
  
    //console.log(req.query)
//Vedo i query parameters nel terminale qualora se ad esempio '/?firstname= luca&lastname=derenzo' li abbia
//digitati nel browser ma devo inserire console.log(req.query)
      return res.send (`
        <h1>Ciao Luca</h1>
        <p>Questo è il mio primo server web</p>
        <p>Numero di accessi: ${count}</p>
      `)
})

app.listen(3000, ()=>{
  console.log('Server start at http://localhost:3000')
})