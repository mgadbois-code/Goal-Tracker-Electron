import { useState } from "react"
import { HuePicker, SliderPicker } from "react-color"
import React from "react"

import Button from "./Button"

// plus-btn needs to add tasks to taskArr, submit button needs to create a new goal object with the info and add it to goals in App.js
// need a method that takes the task name in the task field and creates a new task object and adds it to taskArr

const AddGoal = (props) => {
    var [goalName,setGoalName] = useState("")
    var [dueDate,setDueDate] = useState("")
    var [taskName, setTaskName] = useState("")
    var [taskArr, setTaskArr] = useState([])
    var [color,setColor] = useState("#ff000080")
    var [visible, setVisible] = useState(true)

    const addTask = (event) => {
        event.preventDefault()
        setTaskArr([...taskArr,{id:taskArr.length+1, title:taskName, done:false}])
        // console.log(taskArr)
        setTaskName("")
    }
    const removeTask = (event, task) => {
        let index = 1;
        setTaskArr(taskArr.filter(t => t.id != task.id).map(task => {task.id = index; index++; return task}))
    }

    const changeColor = (color,event) =>{
        let colorValue = color.hex + "80";
        setColor(colorValue)
        props.onChange();

        // console.log(color.hex)

    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          event.preventDefault();
        //   console.log("Enter Press")
        }
      }

      const onSubmit = (event) => {
          event.preventDefault();
          if(!goalName){
              props.showDialogBox("Enter a name for your goal")
              return;
            }
            else if(taskArr.length == 0){
                props.showDialogBox("Add at least one task to your goal")
                return;
            }
            
            else{
                let goal = {title: goalName, dueDate: dueDate, tasks: taskArr, color: color, visible:true};
                props.addGoal(goal)
                props.setShowGoals();
          }
         

      }

    return (
        <form  className="goal-form-container">
            <div className="goal-form">
                <div className= "add-field">
                    <label>Goal Name: </label>
                    <input onKeyPress={handleKeyPress} type="text" value={goalName}  onChange={(event) => {event.preventDefault(); setGoalName(event.target.value)}} placeholder="Goal Title" />
                </div>
                <div className= "add-field">
                    <label>Due Date (optional): </label>
                    <input onKeyPress={handleKeyPress} type="text" value={dueDate} onChange={(event) => setDueDate(event.target.value)} placeholder="Due Date"/>
                </div>
                <div style={{display: "flex", alignItems:"center"}}>
                        <label style={{marginRight: 5}}>Tasks: </label>
                        <input type="text" value={taskName} onChange= {(event) => setTaskName(event.target.value)} placeholder="Add Task"/>
                        <button onClick={(event) => addTask(event)} className="plus-btn"> ➕ </button>
                </div>
                <ul style={{listStyleType:"none", width:"90%"}} >
                    {taskArr.map((task)=> <li style={{backgroundColor:color, margin:"4px", fontWeight:"bold", padding:"2px"}} className="pointer"  onClick={() => removeTask(event,task)} ><span style={{fontSize:"15px", fontWeight:"initial"}}> ❌ </span> {task.title}</li>)}
                </ul>
            </div>
            <div className="goal-form">
                <div className= "add-field" >
                    <label>Choose Color:</label>
                    <div className="hue-picker">
                    <HuePicker width="auto" color="ggg" onChange={(color,event) => changeColor(color,event)} />
                    </div>
                    <div style={{marginTop:"10px"}}>
                    <button className="btn" text="Submit Goal" onClick={onSubmit} style={{backgroundColor:color, color: "black", fontWeight:"bolder" }}>Submit Goal</button>
                        {/* <Button type="submit" text="Submit Goal" onClick = {onSubmit} color={color}/> */}
                    </div>
                </div>
            </div>

        </form>
    )
}

export default AddGoal
