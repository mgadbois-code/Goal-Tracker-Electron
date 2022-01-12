import SubGoal from "./SubGoal"
import ItemRemovebutton from "./ItemRemoveButton"
import EditButton from "./EditButton"
import FocusButton from "./FocusButton"
import EditGoal from "./EditGoal"
import ReOrderButtons from "./ReOrderButtons"
import { useState } from "react"
import React from "react"


const Completed = ({goal, removeGoal,onToggle,reOrderCompletedUp,reOrderCompletedDown,completed }) => {

    //order Tasks by whether they are done
    // const doneTasks = goal.tasks.filter((task) => task.done)
    // const undoneTasks = props.goal.tasks.filter((task) => !task.done)
  
    const tasks= goal.tasks
    const done = true
    
    return (
        <div className="item pointer" style={{border:"solid 6px", borderColor: goal.color} } onClick={() => onToggle(goal.id)} >
            
            <div className="header" style={{marginTop:"-5px"}}>
               <div className="flex">
                    <h3 className="detail flex" style={{marginRight:"20px"}}  onClick={() => onToggle(goal.id)}>{goal.title}</h3>
                    <ReOrderButtons styling="completed-reorder" reOrderUp={(event) => {reOrderCompletedUp(goal.id);}} reOrderDown={(event) => {reOrderCompletedDown(goal.id)}} />
                </div>
                <div className="header">
                    <button className="btn h2" style={{fontSize:"25px"}} onClick={(event) => {event.stopPropagation(); removeGoal(goal.id)}}>🗑️</button>
                </div>

            </div>

            {goal.dueDate !=="" && <h6 onClick={() => onToggle(goal.id)} className="detail">Due: {goal.dueDate} </h6>}

            <div className="flex" style={{overflow:"auto"}}>
                {!goal.showSubGoals && tasks.map((task) =>{
                    if(task.done){
                        return <p className="flex">✅</p>
                    }
                    return <p className="flex">⬜</p>
                })}
            </div>

            {goal.showSubGoals && <SubGoal goal={goal} toggleDone={()=>{return}} tasks={tasks}/>}

        </div>
    )
}

export default Completed
