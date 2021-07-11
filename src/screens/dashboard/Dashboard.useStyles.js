
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: theme.spacing(0)
  },  
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // height: '100vh',
    overflow: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: '94vh'
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
    // paddingLeft: theme.spacing(10),
    // minWidth: 1400,
  },
  paper: {
    padding: theme.spacing(0),
    paddingTop: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    // height: 'auto',

    // elevation: 3,
    // marginLeft: 0 //нижняя таблица первой страницы
  },news: {
    '&:hover': {
      background: "#f00",
   }, 
  },
  fixedHeight: {
    minHeight: 282,
    // marginTop: -15
  },
  chip: {margin: 0,}
}));

 
export default useStyles
