/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react';
import { useSetStoreValue } from 'react-context-hook';
import {
  PieChart, Pie, Cell
} from 'recharts';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const data = [
  { name: 'Group A', value: 50 },
  { name: 'Group B', value: 20 },
  { name: 'Group C', value: 30 },
];
const COLORS = ['#ff726f', '#00C49F', '#FFBB28'];

class SimplePieChart extends React.Component {
  render() {
  	return (
    	<PieChart width={350} height={350} onMouseEnter={this.onPieEnter}>
      <Pie
        data={data}
        cx={175}
        cy={175}
        innerRadius={100}
        outerRadius={130}
        fill="#8884d8"
        paddingAngle={5}
      >
        {
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
          }
      </Pie>
    </PieChart>
    );
  }
}

export default function Home() {
  const [score, setScore] = useState(0);
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
      </Container>
    </div>
  );
}
