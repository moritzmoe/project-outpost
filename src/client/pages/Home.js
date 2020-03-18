/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Container from '@material-ui/core/Container';

export default class Home extends React.Component {
  constructor() {
    super();
    // Set default message
    this.state = {
      message: 'Loading...'
    };
  }

  componentDidMount() {
    // GET message from server using fetch api
    fetch('/api/home')
      .then(res => res.text())
      .then(res => this.setState({ message: res }));
  }

  render() {
    return (
      <Container maxWidth="sm">
        <h1>Home</h1>
        <p>{this.state.message}</p>
      </Container>
    );
  }
}
