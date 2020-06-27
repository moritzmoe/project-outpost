/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Card, CardActionArea, CardContent, Typography
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: 320,
    margin: theme.spacing(1)
  }
}));

export default function ItemCard(props) {
  const classes = useStyles();

  const { item, openDetails } = props;
  const convertCo2ToScore = 67;

  return (
    <div>
      <Grid key={item.id} item>
        <Card className={classes.root}>
          <CardActionArea onClick={() => openDetails(item.id)}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {item.barcode}
              </Typography>
              <Typography variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography color="textSecondary">
                {item.SubCategory.name}
              </Typography>
              <Grid container>
                <Grid item xs={7}>
                  <Typography variant="body2" component="p">
                    {item.Packaging.name}
                  </Typography>
                </Grid>
                <Grid item xs={5} align="right">
                  <Typography variant="h4" align="right" color="primary">
                    {(Math.floor(item.score / convertCo2ToScore))}
                    {' '}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  openDetails: PropTypes.func.isRequired
};
