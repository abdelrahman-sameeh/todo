import './app.css'
import { useRef, useState } from "react";

let tasks;
if (localStorage.getItem('todos') && localStorage.getItem('todos').length) {
  tasks = JSON.parse(localStorage.getItem('todos'));
} else {
  tasks = [];
}

function App() {

  const [description, setDescription] = useState('');
  const [myId, setMyId] = useState()
  const inputEle = useRef();
  const btn_add_change = useRef()


  const handleInput = (e) => {
    setDescription(e.target.value);
  }

  const handleAdd_Edit = (e) => {
    e.preventDefault();
    if(btn_add_change.current.innerHTML==='Add'){
      tasks.push({
        id: Date.now(),
        desc: description
      });
      localStorage.setItem('todos', JSON.stringify(tasks));
      setDescription('');
    }
    
    
    if(btn_add_change.current.innerHTML==='Change'){
      btn_add_change.current.innerHTML = 'Add';
      tasks.map(todo=>{
        if(+todo.id ===myId){
          todo.desc = inputEle.current.value;
        }
      })
      localStorage.setItem('todos', JSON.stringify(tasks))
      setDescription('');
      inputEle.current.value = ''
    }
    
    
  }

  const handleDeleteAll = (e) => {
    e.preventDefault();
    tasks = [];
    localStorage.removeItem('todos')
    window.location.reload()
  }

  const handleDelete = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('todos', JSON.stringify(tasks));
    window.location.reload();
  }

  const handleEdit = (id, desc) => { 
    btn_add_change.current.innerHTML = "Change";
    inputEle.current.value = desc;
    setMyId(id);
  }

  


  return (
    <div className="App">
      <div className="container mt-5">

        <form className="d-flex justify-content-center gap-2" >
          <div className="form-group">
            <input type="text" ref={inputEle} onChange={handleInput} className="form-control" placeholder="Enter your task" />
          </div>
          <div className="btns d-flex gap-1">
            <button onClick={handleAdd_Edit} className="btn btn-success me-1" ref={btn_add_change} >Add</button>
            <button onClick={handleDeleteAll} className="btn btn-danger">Delete all</button>
          </div>
        </form>

        {/* tasks */}
        <div className="todos mt-3 ">

          {
            tasks.length ? tasks.map((todo, index) => {
              return (
                <div key={todo.id} id={todo.id} className="todo mt-2" >
                  
                  <div className="d-flex justify-content-between align-items-center gap-5">
                    <div className="d-flex gap-2">
                      <input type="checkbox" className='checkbox' />
                      <p className="m-0">{index +1}- {todo.desc}</p>
                    </div>
                    <div className="controls d-flex gap-1">
                      <button onClick={() => handleEdit(todo.id, todo.desc)} className="btn btn-primary edit-btn" >Edit</button>
                      <button onClick={() => handleDelete(todo.id)} className="btn btn-danger">Delete</button>
                    </div>
                  </div>
                </div>
              )
            })
              :
              <h2> There is no tasks </h2>
          }

        </div>

      </div>

    </div>
  );
}

export default App;
