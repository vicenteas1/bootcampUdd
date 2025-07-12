import './App.css'
import MyComponent from './components/MyComponent'

function App() {
  const props = {
    name: 'Vicente',
    age: 30,
    adult: true,
    hobbies: ['Jugar', 'Programar', 'Leer'],
    address: {
      street: 'Calle Larga',
      number: 2535
    },
    lastname: 'Saavedra'
  }

  return (
    <MyComponent props={props} />
  )
}

export default App
