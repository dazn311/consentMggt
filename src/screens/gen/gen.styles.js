import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    depositContext: {
        flex: 1,
        fontSize: 11,
        padding: '8px 0'
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        // marginLeft: -10 //нижняя таблица первой страницы
    },news: {
        '&:hover': {
            background: "#f00",
        },
    },
    fixedHeight: {
        // height: 240,
    },
}));

export default useStyles
