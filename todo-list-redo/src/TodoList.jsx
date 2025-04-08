import React, {useState} from 'react';

function TodoList(){
    const [tasks, setTasks] = useState([]);
    const [newtask, setNewTask] = useState("");
    const[editIndex, setEditIndex] = useState(null); //New added feature for editing the to-do-list
    const[editedText, setEditedText] = useState("");


    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){
    if(newtask.trim() !== ""){
    setTasks(t => [...tasks, newtask]);
    setNewTask("");
        }
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] =
             [updatedTasks[index-1], updatedTasks[index]];

             setTasks(updatedTasks);
        }
    }


    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] =
             [updatedTasks[index+1], updatedTasks[index]];

             setTasks(updatedTasks);
    }
}
    return(
        <>
        <div className="to-do-list">
            <h1>To-Do-List</h1>

            <div>
                <input
                    type="text" placeholder="Enter a Task.."
                    value={newtask}
                    onChange={handleInputChange}/>

                    <button className="add-button" onClick={addTask}>
                        Add
                    </button>
            </div>

            <ol>
                {tasks.map((task,index) => 
                        <li key={index}>
                            {editIndex === index?(
                                <input type="text" value={editedText}
                                    onChange={() => setEditedText(editIndex.target.value)}
                                />
                            ) :(
                                <span className="text">{task}</span>
                            )}
                            <button className="delete-button" onClick={()=>deleteTask(index)}>
                                Delete
                            </button>
                            <button className="move-button" onClick={()=>moveTaskUp(index)}>
                                👆
                            </button>

                            <button className="move-button" onClick={()=>moveTaskDown(index)}>
                                👇
                            </button>

                            {editIndex === index ?(
                                <button className="save-button" onClick={()=> saveEdit(index)}>💾</button>
                            ) :(
                                <button className="edit-button" onClick={() => startEditing(index, task)}>📝</button>
                            )}
                        </li>
                    )}
            </ol>
        </div>
        
        
        </>
    );
}



export default TodoList