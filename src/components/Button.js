import React from "react"


const Button = (props) => {
    return (
        <div>
            <button className="btn" style={{backgroundColor: props.color, color: "white"}} onClick={props.onClick}>{props.text}</button>
        </div>
    )
}

export default Button
