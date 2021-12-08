import React from 'react'

const ReOrderButtons = ({size,reOrderUp, reOrderDown,id, arr}) => {
    return (
        <div className="flex">
            <button  style={{padding:"0px", margin:"0px", fontSize: size}} onClick={() =>reOrderUp()} className="btn h5">⬆️</button>
            <button style={{padding:"0px", margin:"0px", fontSize: size}} onClick={() =>reOrderDown()} className="btn h5">⬇️</button>
        </div>
    )
}

ReOrderButtons.defaultProps = {
    reOrderUp: () => console.log("up"),
    id: -1,
    arr: []
}
export default ReOrderButtons
