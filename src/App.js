import  {useState} from 'react'
import AddTaskForm from './Components/AddTaskForm';
import  ToDo from './Components/ToDo';
import UpdateForm from './Components/UpdateForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import'./App.css';

function App() {

  //Tasks (to Do List State)
  const [toDo, settoDo] = useState([]);

  //Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  //Add Task

  const addTask=()=>{
if(newTask){
  let num= toDo.length + 1;
  let newEntry={id: num, title: newTask, status: false}
  settoDo([...toDo, newEntry])
  setNewTask("");
}
  }

  //delete Task

  const deleteTask=(id)=>{
    let newTasks=toDo.filter(task=> task.id !== id)
    settoDo(newTasks);
      }

      //Mark Task as Done or Completed

      const markDone=(id)=>{
        let newTask= toDo.map(task=>{
          if(task.id===id){
            return({...task, status:!task.status})
          }
          return task;
        })
        settoDo(newTask);
          }

    //Cancel Update

    const cancelUpdate=()=>{
    setUpdateData('');
    }

        //Change Task for Update

        const changeTask= (e) =>{
          let newEntry= {
            id:updateData.id,
            title:e.target.value,
            status:updateData.status ? true: false
          }
          setUpdateData(newEntry);
            }

            //UpdateTask

            const updateTask=()=>{
              let filterRecords=[...toDo].filter(task=> task.id !== updateData.id);
              let updatedObject=[...filterRecords, updateData]
              settoDo(updatedObject);
              setUpdateData('');
                }


  return (
    <div className="container App">
      <br></br>
      <h2>Ebenezer's To Do App</h2>
      <br></br>

      {/*Upate Task*/}
{updateData&& updateData ? (
<UpdateForm
updateData={updateData}
updateTask={updateTask}
changeTask={changeTask}
cancelUpdate={cancelUpdate}
/>
):(
<AddTaskForm
newTask={newTask}
setNewTask={setNewTask}
addTask={addTask}
/>
)}

<br></br>

    {/* Display To Dos*/}

      {toDo && toDo.length? '' : 'No Tasks....'}

<ToDo
toDo={toDo}
markDone={markDone}
deleteTask={deleteTask}
setUpdateData={setUpdateData}
/>


    </div>
  )
}

export default App;
