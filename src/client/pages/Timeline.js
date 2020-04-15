/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import { useSetStoreValue } from 'react-context-hook';

import Container from '@material-ui/core/Container';

export default function Timeline() {
  const setPageName = useSetStoreValue('pageName');

  useEffect(() => {
    setPageName('Timeline');
  }, []);

  return (
    <Container maxWidth="sm">
      <h1>Timeline</h1>
    </Container>
  );
}
