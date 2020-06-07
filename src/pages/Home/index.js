import React, { useState, useEffect, useRef } from "react"
import { FacesItem } from "../../components/projects/Faces"
import { motion } from "framer-motion"

function useForceUpdate() {
    const [, setValue] = useState(0)
    return () => setValue(value => ++value)
}

export default function Home(props) {
    const forceUpdate = useForceUpdate()
    const introLaunchTimeoutRef = useRef()
    const introFinishedTimeoutRef = useRef()
    const [intro, setIntro] = useState(
        document.documentElement.clientWidth < 600 ?
            false :
            (props.intro !== undefined ? props.intro : true)
    )
    const introLaunchTimeout = 7000
    const introDuration = 6200

    useEffect(() => {
        introLaunchTimeoutRef.current = setTimeout(() => setIntro(false), introLaunchTimeout)
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener('resize', forceUpdate)
        return () => {
            clearTimeout(introLaunchTimeoutRef.current)
            clearTimeout(introFinishedTimeoutRef.current)
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    const introPlaying = () => {
        clearTimeout(introLaunchTimeoutRef.current)
        introFinishedTimeoutRef.current = setTimeout(() => setIntro(false), introDuration)
    }

    const handleKeyDown = e => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape")
            setIntro(false)
    }

    const margins = 50
    const scaler = Math.log1p(document.documentElement.clientWidth / 50) * 4.4
    const videoPositionX = 50
    const videoPositionY = 53
    const videoWidth = 36
    const videoHeight = 20
    const restScreenWidth = document.documentElement.clientWidth - videoWidth * scaler
    const restScreenHeight = document.documentElement.clientHeight - videoHeight * scaler
    const initialScroll = {
        x: -(videoPositionX * scaler - restScreenWidth / 2) - margins,
        y: -(videoPositionY * scaler - restScreenHeight / 2) - margins
    }

    const variants = {
        in: {
            x: "-5%",
            scale: 0.7,
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        out: {
            opacity: 0,
            y: "60vh",
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    return (
            <div style={{ position: "relative", top: margins, left: margins, width: "300px" }}>
                <motion.div position={"relative"} size={"100%"}
                    variants={variants}
                    initial="in"
                    animate="animate"
                    exit="out"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <FacesItem />
                </motion.div>
            </div>
    )
}

