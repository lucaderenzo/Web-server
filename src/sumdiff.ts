/* 
    /sum/2/3 -> 2+3= 5
		/diff/2/3 -> 2-3= -1

		/stats?nums=1&nums=2&nums=3 -> media=2 /somma=6

*/

import express from'express'

const app= express()

// app.get('/sum/:num1/:num2', (req,res) =>{
// 	const num1 = Number(req.params.num1)
// 	const num2 = Number(req.params.num2)
// //Qui senza il parametro Number num resterebbe una stringa e non farebbe la somma

// 		const sum= num1 + num2
// 			res.send(`<p>${num1} + ${num2} = ${sum}</p>`)
// })

// app.get('/diff/:num1/:num2', (req, res)=>{
// 	const num1= Number(req.params.num1)
// 	const num2= Number(req.params.num2)
// 		const diff= num1-num2
// 			res.send(`<p>${num1} - ${num2} = ${diff}</p>`)
// })

/////////////////////////// USO DEI QUERY PARAMETERS PER FARE LA MEDIA E LA SOMMA ///////////////////

//Se vado nel browser alla localhost:3000/stats mi ritrovo la risposta OK
//se digito /stats?nums=1 qui nel terminale mi ritrovo 1 
//se digito /stats?nums=1&nums=2&nums=3 nel terminale mi ritorna un array ['1','2','3'] di stringhe

app.get('/stats', (req,res) =>{
	//console.log(req.query.nums)
		const nums = (req.query.nums as string[]) .map((n)=>{
			return Number(n)
//Sapendo che mi ritorna un array di stringhe devo trasformare nums in numeri e lo faccio con .map che mi
//ritorna proprio un Number(n) dove n sono i numeri che digito nel browser
		})

	let sum= 0
		for (let n of nums) {
			sum+=n
		} 
//Per fare la somma utilizzo un ciclo for -> dovrebbe esserci anche la possibilità con il Math.

	const media = sum/nums.length
//La media
		
			res.send(
				`<p>La somma è: ${sum}</p>
				 <p>La media è: ${media}</p>
				`)
})

app.listen (3000, ()=>{
	console.log('Started at localhost:3000')
})




