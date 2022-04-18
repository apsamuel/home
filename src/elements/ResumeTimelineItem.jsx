import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
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

class ResumeTimelineItem extends React.Component {
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
        <TimelineSeparator
          sx={{
            padding: '10px',
            backgroundColor: 'blue',
          }}
        >
          <TimelineDot>
            {this.props.direction === 'left' ? (
              <ArrowCircleRight />
            ) : (
              <ArrowCircleLeft />
            )}
          </TimelineDot>
          <TimelineConnector
            sx={{
              backgroundColor: 'primary.main',
              position: 'relative',
              // width: '2px'
            }}
          />
        </TimelineSeparator>

        <TimelineContent>
          <Box>
            <Card>
              <CardHeader
                title={`${this.props.companyName}`}
                subheader={`${this.props.companyStartDate} - ${this.props.companyEndDate}`}
              >
                <Typography variant="h6">{this.props.companyName}</Typography>
              </CardHeader>
            </Card>
          </Box>
        </TimelineContent>
      </TimelineItem>
    );
  }
}

export default withRouter(ResumeTimelineItem)

// export {
//   withRouter(ResumeTimeLineItem)
// }