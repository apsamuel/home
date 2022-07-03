import React from 'react';

import {
  withRouter,

} from 'react-router-dom';
import {
  Box,
} from '@mui/material';


class ResumeDetail extends React.Component {
  constructor(props) {
    super(props)
    this.theme = this.props.theme
    this.state = {}

  }

  componentDidMount() {
    console.log(`mounted resume details with ${this.props}`)
  }

  render() {
    return (
      <div>
        <Box>
          {this.props.companyName} {this.props.companyId}
        </Box>
      </div>
    );
  }
}

export default withRouter(ResumeDetail);