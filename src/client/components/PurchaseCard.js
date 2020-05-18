/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Card, CardActionArea, CardContent,
  Typography, List, ListItem, ListItemText
} from '@material-ui/core';
import ItemList from './ItemList';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: 320,
    margin: theme.spacing(1)
  }
}));


export default function PurchaseCard(props) {
  const classes = useStyles();

  const { purchase, openDetails } = props;
  const [createdDate, setCreatedDate] = useState(new Date());
  const [totalCO2, setTotalCO2] = useState(0);

  useEffect(() => {
    setCreatedDate(new Date(purchase.createdAt));
    let totalScore = 0;
    purchase.Items.map((item) => {
      totalScore = parseInt(totalScore, 10) + parseInt(item.score, 10);
    });
    setTotalCO2(totalScore);
  }, [purchase]);
  return (
    <div>
      <Grid key={purchase.id} item>
        <Card className={classes.root}>
          <CardActionArea onClick={() => openDetails(purchase.id)}>
            <CardContent>
              <Grid container>
                <Grid item xs={7}>
                  <Typography variant="h5" component="h2">
                    {createdDate.getDate()}
                    .
                    {createdDate.getMonth() + 1}
                    .
                    {createdDate.getFullYear()}
                  </Typography>
                  <Typography variant="body2" component="h2">
                    {createdDate.getHours()}
                    :
                    {createdDate.getMinutes()}
                    h
                  </Typography>
                </Grid>
                <Grid item xs={5} align="right">
                  <Typography variant="h4" align="right" color="primary">
                    {totalCO2}
                    {' '}
                    g
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <ItemList items={purchase.Items} />
                </Grid>
              </Grid>

            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </div>
  );
}

PurchaseCard.propTypes = {
  purchase: PropTypes.object.isRequired,
  openDetails: PropTypes.func.isRequired
};
