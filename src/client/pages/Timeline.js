/* eslint-disable react/prop-types */
import DateFnsUtils from '@date-io/date-fns';
import {
  Container, Fab, Grid, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import axios from 'axios';
import 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSetStoreValue } from 'react-context-hook';
import PurchaseCard from '../components/PurchaseCard';
import PurchaseDetailDialog from '../components/PurchaseDetailDialog';
import PurchaseDialog from './PurchaseDialog';


const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(3),
  },
  co2Display: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const convertCo2ToScore = 67;

export default function Timeline() {
  const classes = useStyles();
  const [score, setScore] = useState(0);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [purchaseDetail, setPurchaseDetail] = useState();
  const [idDetail, setIdDetail] = useState(0);
  const [purchaseDetailDialogOpen, setPurchaseDetailDialogOpen] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [countPurchases, setCountPurchases] = useState(0);
  const [dateFrom, setDateFrom] = React.useState(new Date(new Date().setDate(new Date().getDate() - 28)));
  const [dateUntil, setDateUntil] = React.useState(new Date());
  const setPageName = useSetStoreValue('pageName');

  useEffect(() => {
    getPurchases(dateFrom, dateUntil);
    setPageName('Timeline');
  }, [purchaseDialogOpen]);

  const getPurchases = (datefrom, dateuntil) => {
    axios.get(`/api/purchases/?startDate=${datefrom}&endDate=${dateuntil}&expand=ITEMS`).then((res) => {
      let totalScore = 0;
      let allPurchases = 0;
      res.data.map((purchase) => {
        purchase.Items.map((item) => {
          allPurchases += 1;
          totalScore = parseInt(totalScore, 10) + parseInt(item.score, 10);
        });
      });
      setScore(Math.floor((totalScore / convertCo2ToScore) / allPurchases));
      const purchasesSorted = res.data.sort((a, b) => {
        const dateA = new Date(a.createdAt); const
          dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      setPurchases(purchasesSorted);
      setCountPurchases(allPurchases);
    });
  };

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
    // });
  };

  const handleDateFromChange = (datefrom) => {
    getPurchases(datefrom, dateUntil);
    setDateFrom(datefrom);
  };

  const handleDateUntilChange = (dateuntil) => {
    getPurchases(dateFrom, dateuntil);
    setDateUntil(dateuntil);
  };

  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography justify="center" variant="h5" gutterBottom className={classes.co2Display}>
              Durchschnittlich
            </Typography>
            <Typography variant="h3" color="primary" gutterBottom className={classes.co2Display}>
              {score}
              {' '}
              Punkte
            </Typography>
            <Typography variant="h5" gutterBottom className={classes.co2Display}>
              je Einkauf
            </Typography>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-evenly">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Einkäufe von"
                format="dd/MM/yyyy"
                value={dateFrom}
                onChange={handleDateFromChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog2"
                label="Bis"
                format="dd/MM/yyyy"
                value={dateUntil}
                onChange={handleDateUntilChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
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

        <Fab color="primary" aria-label="add" className={classes.fab} variant="extended" onClick={handlePurchaseDialogOpen}>
          <AddIcon />
          Einkauf hinzufügen
        </Fab>
        <PurchaseDialog isOpen={purchaseDialogOpen} handleClose={handlePurchaseDialogClose} />
      </Container>
    </div>
  );
}
