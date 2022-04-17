import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  // Box,
  Typography
} from '@mui/material';

import {
  // Timeline,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  // TimelineOppositeContent,
  TimelineDot,
  TimelineItem,
} from '@mui/lab';

import {
  ArrowCircleRightRounded as ArrowCircleRight,
  ArrowCircleLeftRounded as ArrowCircleLeft,
} from '@mui/icons-material'

class ResumeTimeLineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
    this.props = {
      ...props
    }
    this.theme = this.props.theme
  }

  render() {
    return (
      <TimelineItem key={this.props.companyId}>
        <TimelineSeparator>
          <TimelineDot>
            {this.props.direction === 'left' ? (
              <ArrowCircleLeft />
            ) : (
              <ArrowCircleRight />
            )}
          </TimelineDot>
        </TimelineSeparator>
        <TimelineConnector />
        <TimelineContent>
          <Typography>{this.props.companyName}</Typography>
        </TimelineContent>
      </TimelineItem>
    );
  }
}

export default withRouter(ResumeTimeLineItem)