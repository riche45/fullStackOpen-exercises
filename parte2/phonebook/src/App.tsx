import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './App.css'

interface Person {
  id: number
  name: string
  number: string
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState<{ message: string | null, type: 'success' | 'error' }>({
    message: null,
    type: 'success'
  })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        showNotification('Error al cargar los contactos', 'error')
      })
  }, [])

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: 'success' })
    }, 5000)
  }

  const addPerson = async (event: React.FormEvent) => {
    event.preventDefault()
    
    const existingPerson = persons.find(p => p.name === newName)
    
    if (existingPerson) {
      if (window.confirm(`${newName} ya existe en la agenda. ¿Deseas actualizar su número?`)) {
        try {
          const updatedPerson = await personService.update(existingPerson.id, {
            name: newName,
            number: newNumber
          })
          setPersons(persons.map(p => p.id === existingPerson.id ? updatedPerson : p))
          showNotification(`Se actualizó el número de ${newName}`, 'success')
        } catch (error) {
          showNotification(`Error al actualizar el número de ${newName}`, 'error')
        }
      }
    } else {
      try {
        const newPerson = await personService.create({
          name: newName,
          number: newNumber
        })
        setPersons(persons.concat(newPerson))
        showNotification(`Se agregó ${newName} a la agenda`, 'success')
      } catch (error) {
        showNotification('Error al agregar el contacto', 'error')
      }
    }
    
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = async (id: number) => {
    const person = persons.find(p => p.id === id)
    if (!person) return

    if (window.confirm(`¿Deseas eliminar a ${person.name}?`)) {
      try {
        await personService.remove(id)
        setPersons(persons.filter(p => p.id !== id))
        showNotification(`Se eliminó ${person.name} de la agenda`, 'success')
      } catch (error) {
        showNotification(`Error al eliminar a ${person.name}`, 'error')
        // Si el contacto ya fue eliminado del servidor, actualizamos la lista local
        if ((error as any).response?.status === 404) {
          setPersons(persons.filter(p => p.id !== id))
        }
      }
    }
  }

  const personsToShow = filter
    ? persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Agenda telefónica</h2>
      <Notification message={notification.message} type={notification.type} />
      
      <Filter filter={filter} setFilter={setFilter} />
      
      <h3>Agregar nuevo contacto</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      
      <h3>Números</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
