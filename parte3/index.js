const express = require('express')
const morgan = require('morgan')
const app = express()

// Configurar morgan para mostrar los datos del body en solicitudes POST
morgan.token('postData', (req) => {
    return req.method === 'POST' 
        ? JSON.stringify(req.body)
        : ' '
})

// Usar morgan con formato personalizado
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

app.use(express.json())

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

// GET /api/persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// GET /info
app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
    `)
})

// GET /api/persons/:id
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// DELETE /api/persons/:id
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

// POST /api/persons
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name or number missing' 
        })
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    const person = {
        id: Math.floor(Math.random() * 1000000),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
    .on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Puerto ${PORT} ya está en uso. Por favor:`)
            console.error('1. Detén el servidor que está corriendo (Ctrl+C)')
            console.error('2. Intenta de nuevo')
            process.exit(1)
        } else {
            console.error('Error al iniciar el servidor:', error)
            process.exit(1)
        }
    })
    .on('listening', () => {
        console.log(`Server running on port ${PORT}`)
    }) 