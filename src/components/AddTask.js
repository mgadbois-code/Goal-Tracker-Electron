import { useState } from "react"
import Button from "./Button"
import React from "react"

const AddTask = (props) => {
    var [taskName, setTaskName] = useState("")
    var [taskArr, setTaskArr] = useState([])
    
    const addTask = (event) => {
        event.preventDefault()
        setTaskArr([...taskArr,taskName])
        // console.log(taskArr)
        setTaskName("")
    }

    const submitTasks = (event,taskArr) =>{
        event.preventDefault();
        props.onSubmit(taskArr)
    }

    const removeTask = (event, task) => {
        setTaskArr(taskArr.filter(t => t != task))
    }

    return (
        <form>
           <div style={{display: "flex", alignItems:"center"}}>
                        <label style={{marginRight: 5}}>Tasks: </label>
                        <input type="text" value={taskName} onChange= {(event) => setTaskName(event.target.value)} placeholder="Add Task"/>
                        <button style = {{marginRight: "5%"}} onClick={(event) => addTask(event)} className="plus-btn"> ➕ </button>
                        <Button  onClick={(event) => submitTasks(event,taskArr)} type="submit" text="Add Tasks"  color="green"/>
                </div>
                <ul style={{listStyleType:"none", width:"90%"}} >
                    {taskArr.map((task)=> <li style={{backgroundColor:props.addToGoalColor, marginBottom:"4px", fontWeight:"bold", padding:"2px"}} className="pointer"  onClick={() => removeTask(event,task)} ><span style={{fontSize:"15px", fontWeight:"initial"}}> ❌ </span> {task}</li>)}
                </ul>
            
        </form>
    )
}

export default AddTask
