import express from 'express'

const app= express()

app.use(express.json())
//Questo middleware dice ad express di aspettarsi nel body della request di un post dei dati json

//let cnt=0
//Aggiungo un counter
// app.get('/', (req, res)=> {
// 	cnt +=1
//   res.send({hello: 'monno', cnt})  
//A differenza dei SSR che tornano delle stringhe i server API tornano un oggetto js
//potrei scrivere cnt:cnt 
//})

// app.post('/', (req, res)=> {
// 	const body =req.body
// 	console.log(body)
// 	res.send({body:body})  
//Sto provando con insomnia a generare una chiamata post che mi diminuisce il contatore 
//Il POST mi permette di avere un body nella request che vado a vedere con il console.log(body)
//Per verificare vado su insomnia e seleziono JSON scrivendo  la risposta sarà {} e qui nel
//terminal la risposta è undefined -> questo perchè devo definire un middleware per express che gli dica
//che nel body gli arriveranno dei JSON e che deve parsificarli, nello specifico il middleware USE.
//Ora se vado a fare il post su insomnia mi ritorna nel 'body':{{"msg":"Ciao"}}quello che gli avevo scritto 
//})


// const port=3000
// app.listen (port, ()=>{
//     console.log('Server start at http://localhost:3000')
// })


////////////////////////  ESERCIZIO PER LA SOMMA E LA MEDIA CON POST API  //////////////////////////////

//Dichiaro una funzione che mi farà la somma e la media (esattamente come prima)
//const computeSumMed = (nums: number[]) : [number, number] =>{
//(nums: number[]) : [number, number] significa che mi ritorna un array di numeri e nello specifico
//una tupla con 2 numeri
	// let sum= 0
	// for (let n of nums) {
	// 	sum+=n
	// } 
//Per fare la somma utilizzo un ciclo for -> dovrebbe esserci anche la possibilità con il Math.

//const med = sum/nums.length
//media
	//return [sum, med]
	//La chiama tupla che mi ritorna un numero fisso di elementi (numeri, stringhe ecc) a differenza del vettore
//}

//La GET è la stessa dell'esempio di prima
// app.get ('/stats', (req, res)=>{
// 	const nums: number[] = (req.query.nums as string[]).map((n)=>{
// 		return Number(n)
// 	})
// 	const [sum,med] = computeSumMed(nums)
// 	//Qui chiamo la tupla
// 		res.send(`
// 		<p>La somma è: ${sum}</p>
// 		<p>La media è: ${med}</p>
// 		`)
// })

//app.post ('/stats', (req, res)=>{
	// const body: number[] = req.body
	// 	console.log(body)
	// 		return res.send ({body}) per verificare
	
	//const numbers: number[] =req.body
	//Per differenziarlo da nums sopra
// 		const [sum, med] = computeSumMed(numbers)
// 			return res.send({sum, med})
// })
//Qui creo la post con il body che è un array di numeri che verifico su insomnia (ricorda sempre il
//middleware USE)

// const port=3000
// app.listen (port, ()=>{
//     console.log('Server start at http://localhost:3000')
// })

////////////////////////////// CRUD (Create Read Update Delete) //////////////////////////////////////

//Definiamo un'interfaccia per gestire un blogpost e cioè lo creeremo(POST)-leggeremo(GET)-
//aggiorneremo(PUT/PATCH) e cancelleremo (DELETE)

//Oggetto interfaccia di un blogpost
interface BlogPost {
	date: Date
	title: string
	body: string
	id: number
	draft: boolean
}

type BlogData = Pick<BlogPost, 'title' | 'body'>
//INPUT VALIDATION (per evitare che nel creare un post qualcuno inserisca dati inidonei) 
//assegno a BlogPostsolo 2 campi title e body e lo inserisco qua e sotto
//definisco la funzione validateInput

//Mi serve un oggetto che sarà un array di posts su cui andremo a lavorare ne creo 2
let posts: BlogPost[] = [{
	//Devo cambiare da const a let per il delete che implementerò
	id: 0,
	title: 'first post',
	date: new Date(),
	body: 'This is the first post',
	draft: false

},

{
	id: 1,
	title: 'second post',
	date: new Date(),
	body: 'This is the second post',
	draft: false

}]

app.get ('/posts', (req, res)=>{
	//VIsualizzo tutti i post presenti
	res.send(posts)
})

app.get ('/posts/:id', (req, res)=>{
	//Per visualizzare solo un post specifico ed utilizzo all'uopo i parametri :id
	const id = Number(req.params.id)
	//So già che sarà un numero quindi -> Number
	const post = posts.find((post) => post.id ===id)
	//Utilizzo il metodo find per ciclare posts
	if (! post ) {
		return res.status (404).send({msg: 'not found'})
	}
	//Gestisco l'errore
	return res.send({post})
	//Mi deve ritornare il post chiamato -> su insomnia digito http://localhost:3000/posts/0 e mi tira fuori
	//il primo post ad esempio -- se digito 2 mi ritorna not found ma con un errore nel terminale che posso
	//evitare inserendo sempre il return prima del res.send (oppure non mettendo res.send({post}) ma solo
	//res.send (post) senza le graffe signica una stringa ma è preferibile aggiungere il return nel caso non
	//fosse una stringa a dover ritornare)
})

//Ora creiamo un nuovo post nel body del post su insomnia scrivo in JSON
// {	
// 	"title": "new post",
// 	"body": "This is a new post"
// }

app.post ('/posts/', (req, res)=>{
	const postData: Pick<BlogPost, 'body' | 'title'> = req.body
		try {validateInput(postData)}
		catch (error) {
			return res.status(403).send(error)
		}
	//Creiamo i dati che poi passiamo a newPost
	const lastPost = posts[posts.length -1]
	const newPost: BlogPost = {
		//id:2,
		id: lastPost ? lastPost.id +1: 0,
		//Non mi serve l'id nei parametri sopra ma devo prendere quello giusto altrimenti tutti i nuovi post 
		//che creerò avranno id=2 e allora creo una lastPost che quivale alla lunghezza dei posts -1 e all'id
		//assegno lastPost.id +1 così ogni nuovo post avrà un numero progressivo
		//C'è un altro problema e cioè se non ci sono posts mi ritorna un errore perchè l'id sarà undefined e
		//lastPost.id sarà undefined per risolvere aggiungo lastPost ? lastPost.id +1: 0 e cioè se lastPost
		//esiste assegna id+1 altrimenti assegna 0
		date: new Date(),
		//data di creazione del post
		title: postData.title,
		draft: false,
		body: postData.body
	}
	//Creo il nuovo post e lo salvo con il push()
	posts.push(newPost)	
	return res.status(201).send(newPost)
	//Non è obbligatorio ma consigliato inserire lo status (201) in risposta
})

//Delete

app.delete ('/posts/:id', (req, res)=>{
	
	const id = Number(req.params.id)
	//So già che sarà un numero quindi -> Number
	const toDelete = posts.find((post) => post.id ===id)
	//Utilizzo il metodo find per ciclare posts
	if (! toDelete ) {
		return res.status (404).send({msg: 'not found'})
		//Gestisco l'errore
	}
	posts = posts.filter((post) => post.id !== toDelete.id)
	//Faccio un filtro che mi ritorna un array nuovo uguale al precedente tranne che per il toDelete.id
	//Posso anche scrivere solo id il toDelete è sottointeso 
	return res.send({toDelete})
})



//UPDATE
app.put('/posts/:id', (req, res)=>{
	const postData: Pick<BlogPost, 'body' | 'title'> = req.body
		try {validateInput(postData)}
		catch (error) {
			return res.status(403).send(error)
		}
//Input validation
	const id = Number(req.params.id)
	
	const postToUpdateIndex = posts.findIndex((post) => post.id ===id)
	//Utilizzo il metodo findIndex qui che mi ritorna l'indice del post che vogliamo cambiare.
	//L'indice e l'Id non sono la stessa cosa
	if (!posts[postToUpdateIndex] ) {
		return res.status (404).send({msg: 'not found'})
	}

	posts[postToUpdateIndex] ={
	//quindi se troviamo il post cambiato
		...posts[postToUpdateIndex],
		//lo sovrascriviamo a tutto il post precedente ma solo nella parte title e body che sono le due
		//variabili che cambiamo con l'UPDATE
		title: postData.title,
		body: postData.body
	}
	return res.send({postToUpdateIndex})

})

//Rendiamo pubblico un post
app.post('/posts/:id/public', (req, res)=>{
//Aggiungiamo nell'URL il /public

	const id = Number(req.params.id)
	
	const postToPublicIndex = posts.findIndex((post) => post.id ===id)
	//Utilizzo il metodo findIndex qui che mi ritorna l'indice del post che vogliamo cambiare.
	//L'indice e l'Id non sono la stessa cosa
	if (!posts[postToPublicIndex] ) {
		return res.status (404).send({msg: 'not found'})
	}
	posts[postToPublicIndex].draft =true
	//Mi mette il campo draft a true
	return res.send(posts[postToPublicIndex])
})

const validateInput= (postData: BlogData) =>{
	if (!postData.title){
		throw new Error ('Title field is required')
	}
	if (!postData.body){
		throw new Error ('Body field is required')
	}
}

const port=3000
app.listen (port, ()=>{
    console.log('Server start at http://localhost:3000')
})
