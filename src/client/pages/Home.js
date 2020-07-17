import {
  Container, Fab, Grid, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';
import PurchaseCard from '../components/PurchaseCard';
import PurchaseDetailDialog from '../components/PurchaseDetailDialog';
import PurchaseDialog from './PurchaseDialog';

const COLORS = ['#ff726f', '#00C49F', '#FFBB28'];

const useStyles = makeStyles(theme => ({
  fabAdd: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(3),
  },
  fabInfo: {
    position: 'fixed',
    bottom: theme.spacing(4),
    left: theme.spacing(3),
  },
  co2Display: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default function Home() {
  const classes = useStyles();
  const [score, setScore] = useState(0);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [purchaseDetail, setPurchaseDetail] = useState();
  const [idDetail, setIdDetail] = useState(0);
  const [purchaseDetailDialogOpen, setPurchaseDetailDialogOpen] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const setPageName = useSetStoreValue('pageName');
  const convertCo2ToScore = useStoreValue('co2Convert');

  useEffect(() => {
    const dateFrom = new Date(new Date().setDate(new Date().getDate() - 7));
    const dateUntil = new Date();
    axios.get(`/api/purchases/?startDate=${dateFrom}&endDate=${dateUntil}&expand=ITEMS`).then((res) => {
      let totalScore = 0;
      res.data.map((purchase) => {
        purchase.Items.map((item) => {
          totalScore = parseInt(totalScore, 10) + (parseInt(item.score, 10) * item.PurchaseItem.quantity);
        });
      });
      setScore(Math.floor(totalScore / convertCo2ToScore));
      const purchasesSorted = res.data.sort((a, b) => {
        const dateA = new Date(a.createdAt); const
          dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      setPurchases(purchasesSorted);
    });
    setPageName('Home');
  }, [purchaseDialogOpen]);

  const handlePurchaseDialogClose = () => {
    setPurchaseDialogOpen(false);
  };

  const handlePurchaseDialogOpen = () => {
    setPurchaseDialogOpen(true);
  };

  const handlePurchaseDetailDialogClose = () => {
    setPurchaseDetailDialogOpen(false);
  };

  const handlePurchaseDetails = (id) => {
    setIdDetail(id);
    setPurchaseDetailDialogOpen(true);
  };

  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography justify="center" variant="h5" gutterBottom className={classes.co2Display}>
              CO2 der letzten 7 Tage:
            </Typography>
            <Typography variant="h3" color="primary" gutterBottom className={classes.co2Display}>
              {score}
              {' '}
              / 700
            </Typography>
            <Typography variant="h5" gutterBottom className={classes.co2Display}>
              Punkte
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {purchases.map(value => (
                <PurchaseCard key={value.id} purchase={value} openDetails={handlePurchaseDetails} />
              ))}
              {!purchases.length ? (
                <Grid item>
                  <Typography>Keine Einkäufe gefunden</Typography>
                </Grid>
              ) : ''}
              <PurchaseDetailDialog isOpen={purchaseDetailDialogOpen} id={idDetail} handleClose={handlePurchaseDetailDialogClose} />
            </Grid>
          </Grid>
        </Grid>

        {/* <SimplePieChart /> */}

        <Fab color="primary" aria-label="add" className={classes.fabAdd} variant="extended" onClick={handlePurchaseDialogOpen}>
          <AddIcon />
          Einkauf hinzufügen
        </Fab>
        <PurchaseDialog isOpen={purchaseDialogOpen} handleClose={handlePurchaseDialogClose} />
      </Container>
    </div>
  );
}
