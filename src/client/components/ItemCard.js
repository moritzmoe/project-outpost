/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Fab, Card, CardActionArea, CardContent, Typography
} from '@material-ui/core';
import EcoIcon from '@material-ui/icons/Eco';
import RecommendationDialog from './RecommendationDialog';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: 320,
    margin: theme.spacing(1)
  }
}));

export default function ItemCard(props) {
  const classes = useStyles();
  const [openRecommendation, setOpenRecommendation] = useState(false);

  const { item, openDetails } = props;
  let clickHelp = true;
  const convertCo2ToScore = 67;

  const handleRecClick = () => {
    setOpenRecommendation(true);
  };

  const handleHoverButton = () => {
    clickHelp = false;
  };

  const handleHoverCard = () => {
    clickHelp = true;
  };

  const handleClick = () => {
    if (clickHelp) {
      openDetails(item.id);
    }
  };

  const handleRecommendationClose = () => {
    setOpenRecommendation(false);
  };


  return (
    <div>
      <Grid key={item.id} item>
        <Card className={classes.root}>
          <CardActionArea onMouseMove={handleHoverCard} onClick={handleClick}>
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

                <Grid item xs={7}>
                  <Fab
                    color="primary"
                    aria-label="info"
                    className={classes.fabInfo}
                    variant="extended"
                    onClick={handleRecClick}
                    onMouseEnter={handleHoverButton}
                    onFocus={handleHoverButton}
                  >
                    <EcoIcon />
                  </Fab>
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
        <RecommendationDialog isOpen={openRecommendation} id={item.id} handleClose={handleRecommendationClose} />
      </Grid>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  openDetails: PropTypes.func.isRequired
};
