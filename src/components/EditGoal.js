import React from 'react'
import { useState } from "react"
import EditButton from './EditButton'
import ItemRemoveButton from './ItemRemoveButton'
import ReOrderButtons from './ReOrderButtons'
import { HuePicker, SliderPicker } from "react-color"
import GoalList from './GoalList'

const EditGoal = ({submitGoalEdits,toggleShowEditGoal,addTask,removeTask,reOrderTaskUp,reOrderTaskDown, reOrderGoalUp,reOrderGoalDown, goalId, goalColor, goal,goals}) => {
    var [goalName,setGoalName] = useState(goal.title)
    var [goalDueDate, setGoalDueDate] = useState(goal.dueDate)
    var [color,setColor] = useState(goalColor)
    var [newTask,setNewTask] = useState("")

    // const editGoalColor = (newColor,event) =>{
    //     // let colorValue = newColor.hex + "80";
    //     // setColor(colorValue)

    //     // console.log(color.hex)

    // }

    const editGoalTitle = (newTitle)=>{
        goal.title= newTitle
        setGoalName(newTitle)

    }

    const editGoalDueDate = (newDueDate) =>{
        goal.dueDate = newDueDate
        setGoalDueDate(newDueDate)
    }

    const editGoalColor =(newColor,event) => {
        let newColorValue = newColor.hex + "80";
        goal.color =newColorValue
        setColor(newColorValue)
    }

    // const reOrderTaskUp = (taskId, taskArr) =>{
    //     for(let i = 0; i< taskArr.length; i++){
    //         if(taskArr[i].id == taskId){
    //             let switchIndex = i-1
    //             if(i == 0){
    //                 switchIndex = taskArr.length -1
    //             }
    //             let tempTask = taskArr[switchIndex]
    //             taskArr[switchIndex] = taskArr[i]
    //             taskArr[i] = tempTask;
    //             break;
    //         }
    //     }
    //     goal.tasks = taskArr
        
    // }

    return (
        <div style={{border:"solid 6px", borderColor: color}}>
            <div className="flex header">
                <div className="header">
                    <input className="h3" placeholder={goal.title} value={goalName} onChange={(event) => {editGoalTitle(event.target.value)}}></input>
                    <ReOrderButtons reOrderUp={() => reOrderGoalUp(goal.id,goals)} reOrderDown={() => reOrderGoalDown(goal.id,goals)} size="40px" />
                </div>
    
                    <button onClick={() => {submitGoalEdits(goals);toggleShowEditGoal(goalId)}} className="btn" style={{backgroundColor:color, marginRight:"20px", color:"black", fontWeight:"bold"}}>Done</button>
 
            </div>
           <input className="h4" placeholder="Due Date" value={goalDueDate} onChange={(event) => {editGoalDueDate(event.target.value)}} />
            <div className="flex">
                <div>
                    <HuePicker color={goal.color} onChange={(color,event) => editGoalColor(color,event)} />
                {goal.tasks.map((task)=>
                    <div className="flex" style={{marginTop:"5px"}}>
                        <ReOrderButtons reOrderUp={() => reOrderTaskUp(goalId,task.id,goal.tasks)} reOrderDown={() => reOrderTaskDown(goalId,task.id,goal.tasks)} size="20px" />
                        <input className="p" value={task.title} onChange={(event) => {editTaskTitle(task.id,event.target.value)}}></input>
                        <ItemRemoveButton size="20px" className="p small-btn" removeGoal={() => removeTask(goalId,task.id)} allDone="1" />
                    </div>
                    )}
                    <div className="flex" style={{marginTop: "7px"}}>
                        <label style={{fontWeight:"bold", fontSize:"12px", backgroundColor:"white",padding:"12px 2px 2px"}} for="New Task">Add Task: </label>
                        <input style={{margin:"5px 7px 2px 0px"}}  name="New Task" className="p" value={newTask} placeholder="New Task" onChange={(event) => {setNewTask(event.target.value)}}></input>
                        <button style = {{backgroundColor:"green", color:"white",fontSize:"20px",fontWeight:"bold",margin:"5px 0px 5px 0px", padding:"0px 5px 0px 5px"}}
                         onClick ={(event) => {addTask(goalId,newTask); setNewTask("")}} className="plus-btn"> + </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditGoal
