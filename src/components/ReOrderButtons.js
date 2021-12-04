import React from 'react'

const ReOrderButtons = ({size}) => {
    return (
        <div className="flex">
            <button  style={{padding:"0px", margin:"0px", fontSize: size}} className="btn h5">⬆️</button>
            <button style={{padding:"0px", margin:"0px", fontSize: size}} className="btn h5">⬇️</button>
        </div>
    )
}

export default ReOrderButtons
