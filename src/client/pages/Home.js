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
import { Container, Typography, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import PurchaseDialog from '../components/PurchaseDialog';

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
  const setPageName = useSetStoreValue('pageName');

  useEffect(() => {
    axios.get('/api/items').then((res) => {
      let totalScore = 0;
      res.data.map((item) => {
        totalScore = parseInt(totalScore, 10) + parseInt(item.score, 10);
      });
      setScore(totalScore);
    });
    setPageName('Home');
  }, []);

  const handlePurchaseDialogClose = () => {
    setPurchaseDialogOpen(false);
  };

  const handlePurchaseDialogOpen = () => {
    setPurchaseDialogOpen(true);
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h5" component="h2" gutterBottom>
          Your total Score:
        </Typography>
        <Typography variant="h3" component="h2" gutterBottom>
          {score}
        </Typography>
        <SimplePieChart />
        <Fab color="primary" aria-label="add" className={classes.fab} variant="extended" onClick={handlePurchaseDialogOpen}>
          <AddIcon />
          Add Purchase
        </Fab>
        <PurchaseDialog isOpen={purchaseDialogOpen} handleClose={handlePurchaseDialogClose} />
      </Container>
    </div>
  );
}
