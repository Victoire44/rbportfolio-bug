import React, {useContext} from "react"
import {Link} from "react-router-dom"
import Css from "./projects/Css";

export default function Item({id, top, left, width, fontSize, scrollSpeed, children}) {
    const classes = Css()

    return (
            <Link to={`/home/${id}`}
                  key={`item-${id}`}
            >
                <div className={`${classes.cover} ${classes.coverScale}`}>
                    {children}
                </div>
            </Link>
    )
}