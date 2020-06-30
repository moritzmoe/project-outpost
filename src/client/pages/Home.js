/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react';
import { useSetStoreValue, useStoreValue } from 'react-context-hook';
import {
  PieChart, Pie, Cell
} from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container, Typography, Fab, Grid
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';
import { date } from 'date-fns/locale/af';
import PurchaseDialog from './PurchaseDialog';
import PurchaseCard from '../components/PurchaseCard';

import PurchaseDetailDialog from '../components/PurchaseDetailDialog';
import InformationDialog from '../components/InformationDialog';

const data = [
  { name: 'Group A', value: 50 },
  { name: 'Group B', value: 20 },
  { name: 'Group C', value: 30 },
];
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


class SimplePieChart extends React.Component {
  render() {
  	return (
    	<PieChart width={350} height={350} onMouseEnter={this.onPieEnter}>
      <Pie
        data={data}
        dataKey="value"
        cx={175}
        cy={175}
        innerRadius={100}
        outerRadius={130}
        fill="#8884d8"
        paddingAngle={5}
      >
        {
          	data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
          }
      </Pie>
    </PieChart>
    );
  }
}

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
          totalScore = parseInt(totalScore, 10) + parseInt(item.score, 10);
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
    // purchases.map((purchase) => {
    //  // console.log(purchase.id, id);
    // console.log(purchase.id === id);

    //  if (purchase.id === id) {
    //    setPurchaseDetail(purchase);
    // console.log(purchase);
    //  }
    // });
    // const found = purchases.filter(item => item.id === id);
    // setPurchaseDetail({ input: found[0] }, () => {
    //  setPurchaseDetail(found[0]);
    //  console.log(purchaseDetail);
    setPurchaseDetailDialogOpen(true);
    // });
    console.log(`Purchase Details for ${id} called.\n Still needs to be implemented`);
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
