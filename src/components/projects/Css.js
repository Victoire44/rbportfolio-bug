import { makeStyles } from "@material-ui/core/styles"

const Css = makeStyles(theme => ({
    /*Home Page*/
    item: {
        "&:hover": {
            zIndex: 1000,
        }
    },
    cover: {
        opacity: .7,
        "&:hover": {
            opacity: 1,
        }
    },
    coverScale: {
        transition: "all 0.5s",
        "&:hover": {
            transform: "scale(1.04)"
        }
    },
    video: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        backgroundColor: "black"
    },
    /*Video in the Modal*/
    videoWrapper: {
        position: "relative",
        pointerEvents: "auto",
        paddingBottom: "56.25%",
        paddingTop: theme.spacing(3.1),
        height: 0,
        width: "65vw",
        "@media only screen and (max-width: 600px)": {
            width: "100vw",
        },
        "& iframe": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
        },
    },
    caption: {
        pointerEvents: "none",
        "& .MuiTypography-root": {
            fontSize: theme.spacing(2.1),
            lineHeight: 1.2,
            fontFamily: "'Space Mono', monospace",
            textTransform: "uppercase",
            color: "#fff",
            "&:first-child": {
                padding: theme.spacing(1, 0),
                fontFamily: "'Archivo Black', sans-serif"
            },
            "@media (max-width: 1200px) and (min-width: 1001px)": {
                fontSize: theme.spacing(1.9),
            },
            "@media (max-width: 1000px) and (min-width: 601px)": {
                fontSize: theme.spacing(1.7),
            },
            "@media (max-width: 600px)": {
                fontSize: theme.spacing(1.5),
            },
        }
    }
}))

export default Css