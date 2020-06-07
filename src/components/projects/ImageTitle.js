import React, {useState} from "react"
import {Frame} from "framer"

export default function ImageTitle({isHover, style, title, topHover, leftHover, top, left}) {
    const containerVariants = {
        notHover: {transition: {staggerChildren: 0.02}},
        hover: {transition: {staggerChildren: 0.05}},
    }

    const letterVariants = {
        notHover: {
            fontSize: "100%",
            opacity: 1,
            top: top,
            left: left,
            transition: {
                duration: 0.1,
                ease: "easeIn"
            }
        },
        hover: {
            fontSize: "150%",
            top: topHover,
            left: leftHover,
            opacity: [1, 0, 1],
            transition: {
                duration: 0.15,
                ease: "easeIn"
            }
        },
        transition: {
            times: [0, 0.5, 1]
        }
    }

    return (
        <Frame
            center="y"
            height="100%"
            width="100%"
            background=""
            style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontWeight: 600,
                position: "absolute",
                color: "#fff",
                textTransform: "uppercase",
                pointerEvents: "none",
                display: "flex"
            }}
            variants={containerVariants}
            initial="notHover"
            animate={isHover ? "hover" : "notHover"}
        >
            {Array.from(title).map((letter, index) => (
                <Frame
                    key={index}
                    width="auto"
                    height="40px"
                    background=""
                    style={{position: "relative", ...style}}
                    variants={letterVariants}
                >
                    {letter === " " ? "\u00A0" : letter}
                </Frame>
            ))}
        </Frame>
    )
}