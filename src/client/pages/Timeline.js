/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import Container from '@material-ui/core/Container';

export default function Timeline(props) {
  useEffect(() => {
    props.reportPageName('Timeline');
  }, []);

  return (
    <Container maxWidth="sm">
      <h1>Timeline</h1>
    </Container>
  );
}
