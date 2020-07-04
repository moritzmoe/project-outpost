import {
  Card, CardActionArea, CardContent, Grid, makeStyles, Typography
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PropTypes from 'prop-types';
import React from 'react';

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
                  Produkt hinzufügen via
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
