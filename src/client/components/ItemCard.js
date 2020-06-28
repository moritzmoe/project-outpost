/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';
import {
  makeStyles, Grid, Fab, Card, CardActionArea, CardContent, Typography, Button
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
  const convertCo2ToScore = useStoreValue('co2Convert');

  const { item, openDetails, openRec } = props;
  let clickHelp = true;

  const handleRecClick = () => {
    clickHelp = false;
    setOpenRecommendation(true);
  };

  const handleHoverCard = () => {
    clickHelp = true;
    console.log(clickHelp);
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
                { openRec ? (
                  <Grid item xs={7}>
                    <Button
                      color="primary"
                      aria-label="info"
                      className={classes.fabInfo}
                      variant="outlined"
                      onClick={handleRecClick}
                    >
                      <EcoIcon />
                    </Button>
                  </Grid>
                ) : ''}
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

ItemCard.defaultProps = {
  openRec: false
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  openDetails: PropTypes.func.isRequired,
  openRec: PropTypes.bool
};
