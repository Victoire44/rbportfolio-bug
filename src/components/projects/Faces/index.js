import React, { useState } from "react"
import { motion } from "framer-motion"
import Gallery from "../../Gallery"
import GalleryItem from "../../GalleryItem"
import Item from "../../Item"
import b from "./assets/b.jpg"
import duo from "./assets/duo.jpg"
import face from "./assets/face.jpg"
import portrait from "./assets/portrait.jpg"
import quatro from "./assets/quatro.jpg"
import faces from "./assets/faces.jpg"
import ImageTitle from "../ImageTitle"

export function FacesItem() {
    const [isHover, setIsHover] = useState(false)

    return (
        <Item id="faces" top={22} left={7} width={29} fontSize={1.5} scrollSpeed={17}>
            <motion.div layoutId="project-container-faces"
                onPointerOver={() => setIsHover(true)}
                onPointerOut={() => setIsHover(false)}
                onPointerUp={() => setIsHover(false)}
            >
                <motion.img src={faces} alt="Faces" layoutId="project-image-faces" style={{width: "300px"}} />
                <ImageTitle
                    isHover={isHover}
                    title="Faces"
                    top="80%"
                    left="58%"
                    topHover="80%"
                    leftHover="55%"
                />
            </motion.div>
        </Item>
    )
}

export default function Faces() {

    return (
        <motion.div layoutId="project-container-faces">
            <Gallery>
                <GalleryItem><motion.img layoutId="project-image-faces" src={faces} alt="Face" /></GalleryItem>
                <GalleryItem><img src={b} alt="Face" /></GalleryItem>
                <GalleryItem><img src={quatro} alt="Quatro" /></GalleryItem>
                <GalleryItem><img src={face} alt="Face" /></GalleryItem>
                <GalleryItem><img src={portrait} alt="Portrait" /></GalleryItem>
                <GalleryItem><img src={duo} alt="Duo" /></GalleryItem>
            </Gallery>
        </motion.div>
    )
}
