import React from 'react'

// Definimos los tipos para nuestros props
interface Part {
  name: string
  exercises: number
  id: number
}

interface CourseType {
  id: number
  name: string
  parts: Part[]
}

interface CourseProps {
  course: CourseType
}

// Componente Header para mostrar el nombre del curso
const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>
}

// Componente Part para mostrar una parte individual del curso
const Part = ({ name, exercises }: { name: string; exercises: number }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

// Componente Content que renderiza todas las partes
const Content = ({ parts }: { parts: Part[] }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

// Componente Total para mostrar la suma de ejercicios
const Total = ({ parts }: { parts: Part[] }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

// Componente Course principal
export const Course = ({ course }: CourseProps) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
} 