/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { useSetStoreValue } from 'react-context-hook';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

export default function Home() {
  const [score, setScore] = useState(0);
  const setPageName = useSetStoreValue('pageName');

  useEffect(() => {
    axios.get('/api/items').then((data) => {
      let totalScore = 0;
      data.data.map((item) => {
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
      </Container>
    </div>
  );
}
