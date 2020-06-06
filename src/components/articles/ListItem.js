import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    // maxWidth: 1000,
    margin: '16px'
  },
  media: {
    // height: 240,
  },
});

export default function ListItem(props) {
  const history = useHistory()
  const classes = useStyles();
  const toDetail = (articleId) => () => {
    console.log(articleId)
    history.push(`/articles/${articleId}`)
  }
  return (
    <Card className={classes.root} onClick={toDetail(props.articleId)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="//img.58cdn.com.cn/escstatic/fecar/pmuse/hyba/hyba_head_pc-0413.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
