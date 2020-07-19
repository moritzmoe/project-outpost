import {
  Card, CardActionArea, CardContent, Grid, IconButton, makeStyles, Typography
} from '@material-ui/core';
import EcoIcon from '@material-ui/icons/Eco';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useStoreValue } from 'react-context-hook';
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

  const {
    item, openDetails, openRec, quantity
  } = props;
  let clickHelp = true;

  const handleRecClick = () => {
    clickHelp = false;
    setOpenRecommendation(true);
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
              <Grid container>
                <Grid item xs={10}>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {item.barcode}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {item.name.length > 18
                      ? `${item.name.substring(0, 18)}...` : item.name}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  { openRec ? (
                    <IconButton
                      color="primary"
                      aria-label="info"
                      variant="outlined"
                      onClick={handleRecClick}
                    >
                      <EcoIcon />
                    </IconButton>
                  ) : ''}
                  { (quantity > 1) ? (
                    <Typography variant="h6">
                      {quantity}
                      x
                    </Typography>
                  ) : ''}
                </Grid>
              </Grid>
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
        <RecommendationDialog
          isOpen={openRecommendation}
          id={item.id}
          handleClose={handleRecommendationClose}
        />
      </Grid>
    </div>
  );
}

ItemCard.defaultProps = {
  openRec: false,
  quantity: 1
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  openDetails: PropTypes.func.isRequired,
  openRec: PropTypes.bool,
  quantity: PropTypes.number
};
