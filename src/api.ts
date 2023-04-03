import express from 'express'

const app= express()

let cnt=0
//Aggiungo un counter
app.get('/', (req, res)=> {
	cnt +=1
  res.send({hello: 'monno', cnt})  
//A differenza dei SSR che tornano delle stringhe i server API tornano un oggetto js
//potrei scrivere cnt:cnt 
})

const port=3000
app.listen (port, ()=>{
    console.log('Server start at http://localhost:3000')
})
