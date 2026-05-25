"use client"

import React from 'react'
import { useState } from 'react'

const TuVarnaLogo = ({ size = 75, href = "" }) => {
    const defaultSrc = "/tu_varna_logo/TU-Varna_Logo.png";
    const hoveringSrc = "/tu_varna_logo/TU-Varna_Logo_While_Hovering.png";
    const pressedSrc = "/tu_varna_logo/TU-Varna_Logo_While_Pressing.png";
    
    const [currentSrc, setCurrentSrc] = useState(defaultSrc);
    const className = "absolute inset-0 transition-opacity "


    return (
        <a href={href}
            style={{ width: size, height: size }}
            className="group relative block" 
        >
            <img alt="Link to Tu-Varna"
                style={{ width: size, height: size }}
                src={defaultSrc}
                className={
                    className + "duration-200 group-hover:opacity-0 active:duration-75"
                }
            />
            <img alt="Link to Tu-Varna"
                style={{ width: size, height: size }}
                src={hoveringSrc}
                className={
                    className + "duration-200 opacity-0 group-hover:opacity-100 group-active:opacity-0 group-active:duration-75"
                }
            />
            <img alt="Link to Tu-Varna"
                style={{ width: size, height: size }}
                src={pressedSrc}
                className={
                    className + "duration-200 opacity-0 group-hover:opacity-0 group-active:opacity-100 group-active:duration-75"
                }
            />
        </a>
    )
}

export default TuVarnaLogo