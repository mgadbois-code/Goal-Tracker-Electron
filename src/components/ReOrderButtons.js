import React from 'react'

const ReOrderButtons = ({styling,size,reOrderUp, reOrderDown,id, arr}) => {
    return (
        <div className="flex">
            <button  onClick={() =>reOrderUp()} className={`${styling}`}>⬆️</button>
            <button onClick={() =>reOrderDown()} className={`${styling}`}>⬇️</button>
        </div>
    )
}

ReOrderButtons.defaultProps = {
    reOrderUp: () => console.log("up"),
    id: -1,
    arr: []
}
export default ReOrderButtons
