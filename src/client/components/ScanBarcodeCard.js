import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Card, CardActionArea, CardContent, Typography
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: 300,
    margin: theme.spacing(1)
  },
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default function ScanBarcodeCard(props) {
  const { handleClick } = props;
  const classes = useStyles();
  return (
    <div className={classes.alignItemsAndJustifyContent}>
      <Card className={classes.root}>
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="h2" align="center">
                  <AddShoppingCartIcon fontSize="inherit" />
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6">
                  Add Item via
                </Typography>
                <Typography variant="h4">
                  Barcode
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

ScanBarcodeCard.propTypes = {
  handleClick: PropTypes.func.isRequired
};
