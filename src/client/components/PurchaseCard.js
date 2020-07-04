/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Card, CardActionArea, CardContent,
  Typography, List, ListItem, ListItemText, IconButton
} from '@material-ui/core';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: 320,
    height: 150,
    margin: theme.spacing(1)
  },
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100
  }
}));


export default function PurchaseCard(props) {
  const classes = useStyles();

  const { purchase, openDetails } = props;
  const [createdDate, setCreatedDate] = useState(new Date());
  const [totalCO2, setTotalCO2] = useState(0);
  const [firstItems, setFirstItems] = useState('');

  const convertCo2ToScore = useStoreValue('co2Convert');

  useEffect(() => {
    setCreatedDate(new Date(purchase.createdAt));
    let totalScore = 0;
    let itemNames = '';
    if (purchase.Items.length > 0) {
      if (purchase.Items.length >= 3) {
        purchase.Items.slice(0, 3).map((item) => {
          itemNames = itemNames.concat(`${item.name}, `);
        });
        itemNames = itemNames.substring(0, itemNames.length - 2);
      } else {
        itemNames = purchase.Items[0].name;
      }
      itemNames = itemNames.trim();
      itemNames = itemNames.concat('...');
    } else {
      itemNames = 'Keine Produkte';
    }
    setFirstItems(itemNames);
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
                <Grid item xs={6}>
                  <Typography variant="subtitle2" component="h2">
                    Dein Einkauf vom:
                  </Typography>
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
                    {(createdDate.getMinutes() < 10 ? '0' : '') + createdDate.getMinutes()}
                    {' '}
                    Uhr
                  </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                  <Typography variant="h4" align="right" color="primary">
                    {(Math.floor(totalCO2 / convertCo2ToScore))}
                    {' '}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.alignItemsAndJustifyContent}>
                  <Typography variant="body2" component="h2">
                    {firstItems}
                  </Typography>
                  {/* <ItemList items={purchase.Items} /> */}
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
