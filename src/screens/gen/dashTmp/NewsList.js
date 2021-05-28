import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { deepOrange, deepPurple, grey } from '@material-ui/core/colors';
import image1 from '../../static/images/avatar/1.png'
import image2 from '../../static/images/avatar/2.png'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],

  },
  listItem: {
    color: theme.palette.getContrastText(deepPurple[900]),
    backgroundColor: grey[500],
    paddingTop: '0',
    paddingBottom: '0',
    paddingRight: '0',
    '&:hover': {
      backgroundColor: deepPurple[200],
      color: theme.palette.getContrastText(deepPurple[900]),
    }
  },
  listColorOgg: {
    color: theme.palette.getContrastText(deepPurple[900]),
    backgroundColor: grey[400],
    '&:hover': {
      backgroundColor: deepPurple[200],
      color: theme.palette.getContrastText(deepPurple[900]),
    }
  },
}));

export default function NewsItemsList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem className={ classes.listItem} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.orange} alt="Remy Sharp" src={image1} >АП</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Согласование?"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Алексей Пашин
              </Typography>
              {" — Если не ошибаюсь…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem className={ classes.listColorOgg} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.purple} alt="Travis Howard" src={image2} >ВЛ</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Дор. знаки"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Васильев Матвей
              </Typography>
              {" — Это знаки не…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem  className={ classes.listColor} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Смирнов А.В." src="/static/images/avatar/3.jpeg" />
        </ListItemAvatar>
        <ListItemText
          primary="Придомовая.."
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Смирнов А.В.
              </Typography>
              {' — Придомовая территория…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
