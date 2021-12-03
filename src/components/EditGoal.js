import React from 'react'
import EditButton from './EditButton'
const EditGoal = ({toggleShowEditGoal, goalId}) => {
    return (
        <div className="container" >
            <h1>TESTING Editing Goal with Id {goalId}</h1>
            <EditButton  toggleShowEditGoal={toggleShowEditGoal} goalId = {goalId} />
        </div>
    )
}

export default EditGoal
