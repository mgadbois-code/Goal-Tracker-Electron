import { useState } from "react"

import React from "react"

import Goal from "./Goal"
const GoalList = (props) => {
    
    
    return (
        <div>
           { props.goals.map((goal,index) => {
               let showEditGoal = false
               if(goal.hasOwnProperty("showEditGoal")){
                    showEditGoal= goal.showEditGoal
               }
               
               return <Goal showEditGoal={showEditGoal} key = {index} removeGoal={props.removeGoal} toggleShowEditGoal={props.toggleShowEditGoal} toggleDone = {props.toggleDone} goal= {goal} onToggle={props.onToggle} toggleVisible={props.toggleVisible}/>
                }
           )}
        </div>
    )
}

export default GoalList
