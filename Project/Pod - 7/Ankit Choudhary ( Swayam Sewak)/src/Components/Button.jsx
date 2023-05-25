import React from "react";

const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`z-20 cursor-pointer flex items-center justify-center py-10 px-15 border-primaryWidth rounded-20 shadow-xl hover:scale-105 transition
             ${props.varient === "light" && "bg-white/5 border-white/10 hover:bg-white/10"}
             ${props.varient === "dark" && "bg-primaryBlack/80 border-primaryBlack/50 hover:bg-primaryBlack/100"}
            ${props.style}`}
        >
            {
                props.gradient
                    ? <p className={`flex items-center justify-center font-primary font-${props.weight} text-[12.5px] leading-5 bg-primaryGradient inline-block text-transparent bg-clip-text`}>{props.children}</p>
                    : <p className={`flex items-center justify-center font-primary font-${props.weight} text-[12.5px] leading-5 text-white`}>{props.children}</p>
            }
        </button>
    )

}

export default Button;