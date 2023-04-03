/* 
    /sum/2/3 -> 2+3= 5
		/diff/2/3 -> 2-3= -1

*/

import express from'express'

const app= express()

app.get('/sum/:num1/:num2', (req,res) =>{
	const num1 = Number(req.params.num1)
	const num2 = Number(req.params.num2)
//Qui senza il parametro Number num resterebbe una stringa e non farebbe la somma

		const sum= num1 + num2
			res.send(`<p>${num1} + ${num2} = ${sum}</p>`)
})

app.get('/diff/:num1/:num2', (req, res)=>{
	const num1= Number(req.params.num1)
	const num2= Number(req.params.num2)
		const diff= num1-num2
			res.send(`<p>${num1} - ${num2} = ${diff}</p>`)
})

app.listen (3000, ()=>{
	console.log('Started at localhost:3000')
})


