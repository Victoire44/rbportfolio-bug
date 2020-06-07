import React, {cloneElement, useContext, useEffect, useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import prevArrow from "./assets/prevArrow.svg"
import nextArrow from "./assets/nextArrow.svg"
import indicators from "./assets/indicators.svg"
import {Page} from "framer"

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: "85vh",
        width: "60vw",
    },
    gallery: {
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
        width: "auto",
        "& div": {
            pointerEvents: "none",
        },
        "& [data-framer-component-type='Frame']": {
            position: "relative",
            alignItems: "center",
            height: "85vh !important",
            width: "60vw !important",
            overflow: "visible !important",
            "@media only screen and (max-width: 600px)": {
                overflow: "hidden",
                width: "100vw !important"
            }
        }
    },
    controls: {
        height: "120px",
        textAlign: "center",
        "@media only screen and (max-width: 600px) and (pointer: coarse)": {
            display: "none",
        },
    },
    arrow: {
        height: "100%",
        pointerEvents: "auto",
        zIndex: "100",
        opacity: 0.5,
        padding: theme.spacing(4, 5),
        "&:hover": {
            opacity: 1
        },
        "@media only screen and (max-width: 850px)": {
            height: "110px",
            padding: theme.spacing(4, 2),
        },
    },
    nextArrow: props => ({
        visibility: props.currentPage === props.pageCount - 1 ? "hidden" : "visible",
        "@media only screen and (max-width: 600px)": {
            height: "105px",
            position: "fixed",
            right: 0,
        }
    }),
    prevArrow: props => ({
        visibility: props.currentPage === 0 ? "hidden" : "visible",
        "@media only screen and (max-width: 600px)": {
            height: "105px",
            position: "fixed",
            left: 0,
        }
    }),
    indicatorsWrapper: {
        alignSelf: "flex-end"
    },
    indicators: {
        width: "4px",
        height: "4px",
        marginRight: "2px",
        marginLeft: "2px",
        "@media only screen and (pointer: fine)": {
            display: "none",
        },
        "@media only screen and (min-width: 600px) and (pointer: coarse)": {
            display: "none",
        },
    }
}))

export default function Gallery(props) {
    const [currentPage, setCurrentPage] = useState(0)
    const classes = useStyles({currentPage, pageCount: props.children.length})
    const [overPrevArrow, setOverPrevArrow] = useState(false)
    const [overNextArrow, setOverNextArrow] = useState(false)
    const lastPage = props.children.length - 1

    const prevItem = e => {
        e.preventDefault()
        const upcomingPage = currentPage - 1
        setCurrentPage(Math.max(upcomingPage, 0))
    }
    const nextItem = e => {
        e.preventDefault()
        const upcomingPage = currentPage + 1
        setCurrentPage(Math.min(upcomingPage, lastPage))
    }
    const handleOver = e => {
        e.stopPropagation()
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [currentPage])

    const handleKeyDown = e => {
        if (e.key === "ArrowRight") nextItem(e)
        else if (e.key === "ArrowLeft") prevItem(e)
    }

    const handleClick = i =>
        i === currentPage + 1 ? nextItem :
            (i === currentPage - 1 ? prevItem :
                () => {
                })

    const scaleEffect = info => ({
        scale: 1 - 0.3 * Math.abs(info.normalizedOffset)
    })

    const style = i => i === currentPage ? {opacity: "1"} : {opacity: "0.5"}

    return (
        <div className={classes.root}>
            <div className={classes.gallery}>
                <div onPointerEnter={() => setOverPrevArrow(true)}
                     onPointerLeave={() => setOverPrevArrow(false)}
                     className={classes.controls}
                     style={{zIndex: 1301}}
                >
                    <img src={prevArrow}
                         alt="prev"
                         onClick={prevItem}
                         onPointerOver={handleOver}
                         className={`${classes.arrow} ${classes.prevArrow}`}/>
                </div>
                <Page currentPage={currentPage}
                      onChangePage={(current, previous) => setCurrentPage(current)}
                      effect={scaleEffect}
                      alignment="center">
                    {props.children.map((child, i) => cloneElement(child, {
                        style: style(i),
                        onClick: handleClick(i)
                    }))}
                </Page>
                <div onPointerEnter={() => setOverNextArrow(true)}
                     onPointerLeave={() => setOverNextArrow(false)}
                     className={classes.controls}
                     style={{zIndex: 1301}}>
                    <img src={nextArrow}
                         alt="next"
                         onClick={nextItem}
                         onPointerOver={handleOver}
                         className={`${classes.arrow} ${classes.nextArrow}`}/>
                </div>
            </div>
            <div className={classes.indicatorsWrapper}>
                {props.children.map((child, i) => <img src={indicators} alt="dot" className={classes.indicators}
                                                       style={i === currentPage ? {opacity: "0.99"} : {opacity: "0.5"}}/>)}
            </div>
        </div>
    )
}