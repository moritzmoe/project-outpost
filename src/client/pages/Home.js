/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react';
import { useSetStoreValue } from 'react-context-hook';
import {
  PieChart, Pie, Cell
} from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container, Typography, Fab, Grid
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { date } from 'date-fns/locale/af';
import PurchaseDialog from './PurchaseDialog';
import PurchaseCard from '../components/PurchaseCard';

import PurchaseDetailDialog from '../components/PurchaseDetailDialog';

const data = [
  { name: 'Group A', value: 50 },
  { name: 'Group B', value: 20 },
  { name: 'Group C', value: 30 },
];
const COLORS = ['#ff726f', '#00C49F', '#FFBB28'];

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

  useEffect(() => {
    const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    axios.get(`/api/purchases/time/${sevenDaysAgo}?expand=ITEMS`).then((res) => {
      let totalScore = 0;
      res.data.map((purchase) => {
        purchase.Items.map((item) => {
          totalScore = parseInt(totalScore, 10) + parseInt(item.score, 10);
        });
      });
      setScore(Math.floor(totalScore / convertCo2ToScore));
      setPurchases(res.data);
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
            <Typography variant="h5" gutterBottom className={classes.co2Display}>
              Your total Score of the last 7 days:
            </Typography>
            <Typography variant="h3" color="primary" gutterBottom className={classes.co2Display}>
              {score}
              {' '}
              / 700 Score
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {purchases.map(value => (
                <PurchaseCard key={value.id} purchase={value} openDetails={handlePurchaseDetails} />
              ))}
              <PurchaseDetailDialog isOpen={purchaseDetailDialogOpen} id={idDetail} handleClose={handlePurchaseDetailDialogClose} />
            </Grid>
          </Grid>
        </Grid>

        {/* <SimplePieChart /> */}

        <Fab color="primary" aria-label="add" className={classes.fab} variant="extended" onClick={handlePurchaseDialogOpen}>
          <AddIcon />
          Add Purchase
        </Fab>
        <PurchaseDialog isOpen={purchaseDialogOpen} handleClose={handlePurchaseDialogClose} />
      </Container>
    </div>
  );
}
