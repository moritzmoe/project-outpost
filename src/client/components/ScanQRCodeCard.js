import React from 'react';
import {
  makeStyles, Grid, Card, CardActionArea, CardContent, Typography
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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

export default function ScanQRCodeCard() {
  const classes = useStyles();
  return (
    <div className={classes.alignItemsAndJustifyContent}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="h2" align="center">
                  <ShoppingCartIcon fontSize="inherit" />
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6">
                  Einkauf hinzufügen via
                </Typography>
                <Typography variant="h4">
                  QR-Code
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
