import React from 'react'
import { useState } from "react"
import EditButton from './EditButton'
import ItemRemoveButton from './ItemRemoveButton'
import ReOrderButtons from './ReOrderButtons'
import { HuePicker, SliderPicker } from "react-color"

const EditGoal = ({toggleShowEditGoal,removeTask, goalId, goalColor, goal}) => {
    var [goalName,setGoalName] = useState(goal.title)
    var [dueDate,setDueDate] = useState(goal.dueDate)
    var [taskArr, setTaskArr] = useState(goal.tasks)
    var [color,setColor] = useState(goalColor)

    const changeColor = (color,event) =>{
        let colorValue = color.hex + "80";
        setColor(colorValue)

        // console.log(color.hex)

    }

    return (
        <div style={{border:"solid 6px", borderColor: color}}>
            <div className="flex header">
                <div className="header">
                    <input className="h3" placeholder={goal.title} value={goalName} onChange={(event) => {event.preventDefault(); setGoalName(event.target.value)}}></input>
                    <ReOrderButtons size="40px" />
                </div>
    
                    <button onClick={() => toggleShowEditGoal(goalId)} className="btn" style={{backgroundColor:color, marginRight:"20px", color:"black", fontWeight:"bold"}}>Done</button>
 
            </div>
            <div className="flex">
                <div>
                    <HuePicker color={color} onChange={(color,event) => changeColor(color,event)} />
                {goal.tasks.map((task)=>
                    <div className="flex" >
                        <ReOrderButtons size="20px" />
                        <input className="p" value={task.title}></input>
                        <ItemRemoveButton size="20px" className="p small-btn" removeGoal={() => removeTask(goalId,task.id)} allDone="1" />
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditGoal
