import React from 'react'
import { useState } from "react"
import EditButton from './EditButton'
import ItemRemoveButton from './ItemRemoveButton'
import ReOrderButtons from './ReOrderButtons'
import { HuePicker, SliderPicker } from "react-color"
import GoalList from './GoalList'

const EditGoal = ({toggleShowEditGoal,removeTask,reOrderTaskUp,reOrderTaskDown, reOrderGoalUp,reOrderGoalDown, goalId, goalColor, goal,goals}) => {
    var [goalName,setGoalName] = useState(goal.title)
    var [dueDate,setDueDate] = useState(goal.dueDate)
    var [taskArr, setTaskArr] = useState(goal.tasks)
    var [color,setColor] = useState(goalColor)

    // const editGoalColor = (newColor,event) =>{
    //     // let colorValue = newColor.hex + "80";
    //     // setColor(colorValue)

    //     // console.log(color.hex)

    // }

    const editGoalTitle = (newTitle)=>{
        goal.title= newTitle
        setGoalName(newTitle)

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

    const editGoalOrder =(goalId) => {

    }

    return (
        <div style={{border:"solid 6px", borderColor: color}}>
            <div className="flex header">
                <div className="header">
                    <input className="h3" placeholder={goal.title} value={goalName} onChange={(event) => {editGoalTitle(event.target.value)}}></input>
                    <ReOrderButtons reOrderUp={() => reOrderGoalUp(goal.id,goals)} reOrderDown={() => reOrderGoalDown(goal.id,goals)} size="40px" />
                </div>
    
                    <button onClick={() => toggleShowEditGoal(goalId)} className="btn" style={{backgroundColor:color, marginRight:"20px", color:"black", fontWeight:"bold"}}>Done</button>
 
            </div>
            <div className="flex">
                <div>
                    <HuePicker color={goal.color} onChange={(color,event) => editGoalColor(color,event)} />
                {goal.tasks.map((task)=>
                    <div className="flex" >
                        <ReOrderButtons reOrderUp={() => reOrderTaskUp(goalId,task.id,goal.tasks)} reOrderDown={() => reOrderTaskDown(goalId,task.id,goal.tasks)} size="20px" />
                        <input className="p" value={task.title} onChange={(event) => {editTaskTitle(task.id,event.target.value)}}></input>
                        <ItemRemoveButton size="20px" className="p small-btn" removeGoal={() => removeTask(goalId,task.id)} allDone="1" />
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditGoal
