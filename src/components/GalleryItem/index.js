import React, {cloneElement} from "react"
import {makeStyles} from "@material-ui/core/styles"
import { motion } from "framer-motion"
import {Frame} from "framer"

const useStyles = makeStyles({
    frame: {
        display: "flex !important",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
    },
    galleryItem: {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        pointerEvents: "auto",
        "@media only screen and (max-width: 600px)": {
            maxHeight: "90vh"
        }
    }
})

export default function GalleryItem(props) {
    const classes = useStyles()

    const handleOver = e => {
        e.stopPropagation()
    }

    return (
        <motion.div {...props} style={{...props.style, pointerEvents: "none"}}>
            <Frame background={""} className={classes.frame} width="100%" height="100%">
                {cloneElement(props.children, {
                    className: classes.galleryItem,
                    onPointerOver: handleOver,
                    onClick: e => e.preventDefault(),
                    onContextMenu: e => e.preventDefault()
                })}
            </Frame>
        </motion.div>
    )
}