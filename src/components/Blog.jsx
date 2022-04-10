import React from 'react';

import {
  withRouter,

} from 'react-router-dom';
import { Box, Typography } from '@mui/material';


class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.props = { ...props };
    this.theme = this.props.theme;
  }

  render() {
    // const theme = this.props.theme
    return (
      <Box>
        <Typography variant="h6">Blog</Typography>
      </Box>
    );
  }
}

export default withRouter(Blog);
