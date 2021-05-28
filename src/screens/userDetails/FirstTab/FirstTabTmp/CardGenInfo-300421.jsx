import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from "@material-ui/core/Divider";


import PopupMenu from "./PopupMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 612, 
    // minWidth: 360
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CardGenInfo({curUser}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  if (!curUser) return (<div>loading..</div>);

  const {user_id, user_name, user_shortname, user_org_id, user_post, user_role} = curUser || {user_id, user_name, user_shortname, user_org_id, user_post, user_role};
  console.log('8989 CardGenInfo curUser', curUser);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <Card className={classes.root}>
        <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={user_name}
            subheader={'id: ' + user_id}
        />
        <CardMedia
            className={classes.media}
            image="/static/images/avatar/1.png"
            title={user_name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Статус: Активный
          </Typography>
          <Divider />
          <Typography variant="body2" color="textSecondary" component="p">
            Сотрудник огранизации № {user_org_id}.
          </Typography>
          {/*<Typography variant="body2" color="textSecondary" component="p">*/}
          {/*  Вышестоящая огранизация № {user_org_id}.*/}
          {/*</Typography>*/}

          <Typography variant="body2" color="textSecondary" component="p">
            {user_post}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            Роль: {user_role}
          </Typography>
          <Divider />
          <Typography variant="body2" color="textSecondary" component="p">
            +7 964 765-09-66
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ShmidtDU@mos.ru
          </Typography>
          <Divider />
          <Typography variant="body2" color="textSecondary" component="p">
            Дата рег.: "2021-04-07"
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon color={'disabled'} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="показать.."
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Объекты в работе:</Typography>
            <Typography paragraph>
              Таганская, Краснопресненская.
            </Typography>
            <Typography paragraph>
              20 согласованных событий.
            </Typography>
            <Typography paragraph>
              в работе 3 объекта.
            </Typography>
            <Typography>
              Дополнительная информация...
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
  );
}
