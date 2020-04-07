/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

export default class Home extends React.Component {
  constructor() {
    super();
    // Set default message
    this.state = {
      message: 'Loading...',
      score: ''
    };
    this.setScore();
  }

  componentDidMount() {
    // GET message from server using fetch api
    this.props.reportPageName('Home');
    fetch('/api/home')
      .then(res => res.text())
      .then(res => this.setState({ message: res }));
  }

  setScore = (evt) => {
    // evt.preventDefault();
    let totalScore = 0;
    axios.get('/api/items').then((data) => {
      data.data.map((item) => {
        totalScore = parseInt(totalScore, 10) + parseInt(item.score, 10);
      });
      this.setState({ score: totalScore });
    });
  };

  render() {
    return (
      <Container maxWidth="sm">
        <h1>Home</h1>
        <p>{this.state.message}</p>
        <Typography variant="h5" component="h2" gutterBottom>
          Your total Score:
        </Typography>
        <Typography variant="h3" component="h2" gutterBottom>
          {this.state.score}
        </Typography>
      </Container>
    );
  }
}
