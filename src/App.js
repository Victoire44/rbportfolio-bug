import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Route, Switch, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import Home from "./pages/Home"
import Project from "./components/Project"
import "bootstrap/dist/css/bootstrap.min.css"
import Favicon from "./favicon.png"
import { AnimatePresence, AnimateSharedLayout } from "framer-motion"

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
    },
})

const useStyles = makeStyles(theme => ({
    body: {
        backgroundImage: "radial-gradient(circle, #2B2F39, #191C23,#000000)",
        backgroundSize: "100% 100%",
        height: "100vh",
        padding: 0,
        margin: 0,
        boxSizing: "border-box",
        overflow: "hidden",
    }
}))

export default function App() {
    const [resetScroll, setResetScroll] = useState(false)
    const location = useLocation()
    const lastSlash = location.pathname.indexOf("/", 1)
    const page = location.pathname.substring(0, lastSlash === -1 ? location.pathname.length : lastSlash).replace("/home", "/")
    const classes = useStyles()

    return (
        <ThemeProvider theme={darkTheme}>
                <Helmet>
                    <link rel="icon" type="image/png" href={Favicon} />
                    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono&display=swap" rel="stylesheet"/>           
                    <title>Remi Besse</title>
                    <meta name="author" content="Victoire Baron <victoirebaron@hotmail.fr>" />
                    <body className={classes.body} />
                </Helmet>
                <AnimatePresence exitBeforeEnter>
                    <Switch location={location} key={page}>
                        <Route exact path={["/home/:id", "/home", "/"]}
                            render={props => <Projects {...props.location.state}
                                match={props.match}
                                reset={resetScroll} />}
                        />
                    </Switch>
                </AnimatePresence>
        </ThemeProvider>
    )
}

function Projects({ match, intro, reset }) {
    const { id } = match.params

    return (
        <div key="page/projects">
            <AnimateSharedLayout type="crossfade">
                <Home intro={id ? false : intro} reset={reset} scrollEnabled={!id} />
                {id && <Project id={id} />}
            </AnimateSharedLayout>
        </div>
    )
}
