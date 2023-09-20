import express from 'express'


const app = express()


app.get('/', (req,res) => {
    res.send('Probando')
}
)
app.get('/User', (req,res) => {
    res.send('Probando USER')
}
)
app.get('/cellfone', (req,res) => {
    res.send('Probando Celular')
}
)
app.get('/direccion', (req,res) => {
    res.send('Probando Direcciones ')
}
)