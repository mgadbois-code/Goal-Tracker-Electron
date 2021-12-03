import React from 'react'
import PencilIcon from './pencil_icon.svg';


const EditButton = ({toggleShowEditGoal, goalId}) => {
    return (
        <div >
            <PencilIcon className="pointer" onClick = {(event)=> {event.stopPropagation();toggleShowEditGoal(goalId)}} />
        </div>
    )
}

export default EditButton
