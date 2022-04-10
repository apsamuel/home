import React from 'react';
// import { Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
// import { SupportRounded } from '@mui/icons-material'

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.props = { ...props };
    this.theme = this.props.theme;
  }

  render() {
    // const theme = this.props.theme
    return (
      <Box>
        <Typography variant="h6">Resume</Typography>
      </Box>
    );
  }
}

export default Resume;
