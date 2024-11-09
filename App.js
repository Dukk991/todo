import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const url = 'http://localhost:3001'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setTasks(response.data)
      }).catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })
  }, [])
  
  const addTask = () => {
    axios.post(url + '/create', {
      description: 'task'
    })
    .then(response => {
      setTasks([...tasks,{id: response.data.id,description: task}])
      setTask('')
    }).catch(error => {
      alert(error.response.data.error ? error.response.data.error : error)
    })
  }

  const deleteTask = (id) => {
    axios.delete(url + '/delete/' + id)
      .then(response => {
        const withoutRemoved = tasks.filter((item) => item.id !== id)
        setTasks(withoutRemoved)
      }).catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })
  }
  
  return (
    <div id="container">
      <h1> VKAP todo </h1>
      <form>
        <input 
        placeholder="add a new task"
        value={task}
        onChange={e => setTask(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            addTask()
          }
        }}>
        </input>
      </form>
      <ul>
        {
          tasks.map(item => (
            <li key={item.id}>{item.description}
              <button className='delete-button' onClick={() => deleteTask(item.id)}>Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
