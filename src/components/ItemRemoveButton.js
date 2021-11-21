import React from 'react'

const ItemRemoveButton = ({removeGoal, allDone}) => {
    return (
        <button style={{fontSize:"25px"}} className="btn h2" onClick={(event) => {event.stopPropagation(); removeGoal()}}>
            {allDone != 0 ? "❌": "✔️"}
        </button >
    )
}

export default ItemRemoveButton
