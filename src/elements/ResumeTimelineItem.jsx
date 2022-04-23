import React from 'react';
import { withRouter } from 'react-router-dom';
import './ResumeTimelineItem.css';
import {
  // Box,
  Stack,
  Typography,
  Card,
  CardHeader,
  // CardMedia,
  // CardContent,
  // CardActions,
  Avatar,
  Chip,
  Tooltip,
  CardContent,
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
      display: true,
      properties: {
        ...props
      },
      roles: [],
      stats: {}
    }
    this.theme = this.props.theme
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:8081/api/resume/rolehistory/${this.state.properties.companyId}`)
      .then((res) => {

        const json = res.json();
        console.log(
          `fetching role history for company ${this.state.properties.companyName} (${this.state.properties.companyId}`
        );
        return json;
      })
      .then((json) => {
        console.log('updating roles');
        this.setState((state) => ({
          ...state,
          roles: [
            ...json
          ],
        }));
      });

    fetch(
      `http://127.0.0.1:8081/api/resume/rolehistory/${this.state.properties.companyId}/stats`
    )
      .then((res) => {
        const json = res.json();
        console.log(
          `fetching role history stats for company ${this.state.properties.companyName} (${this.state.properties.companyId}`
        );
        return json;
      })
      .then((json) => {
        console.log('updating stats');
        this.setState((state) => ({
          ...state,
          stats: {
            ...json
          },
        }));
      });

    // console.log(`mounted resume timeline item for )`)
    // console.log(this.state)
  }

  render() {
    return (
      <TimelineItem key={this.state.properties.companyId}>
        <TimelineSeparator
          sx={
            {
              // padding: '10px',
              // backgroundColor: 'black',
            }
          }
        >
          <TimelineDot>
            {this.state.properties.direction === 'left' ? (
              <ArrowCircleRight />
            ) : (
              <ArrowCircleLeft />
            )}
          </TimelineDot>
          <TimelineConnector
          />
        </TimelineSeparator>

        <TimelineContent>
          <Stack direction="column">
            <Card
              sx={{
                display: 'flex',
                background: 'primary',
                // alignContent: 'center'
              }}
            >
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '0 -5px',
                }}
              >
                <CardHeader
                  disableTypography={true}
                  sx={{
                    '.MuiCardHeader-content': {
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      justifyContent: 'center',
                      gap: '15px',
                    },
                  }}
                  avatar={
                    <Avatar
                      variant="circular"
                      src={`http://127.0.0.1:8081/api/static/images/${this.state.properties.companyImage}`}
                      sx={{
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56,
                      }}
                    />
                  }
                  title={

                      <Typography component="div" variant="subtitle1">
                        {this.props.companyName}
                      </Typography>

                  }
                  subheader={
                    <Stack direction="row" spacing={2}>
                      <Chip
                        label={`${this.state.properties.companyStartDate.replaceAll(
                          '-',
                          '/'
                        )}`}
                        color="primary"
                      />
                      <Chip
                        label={`${this.state.properties.companyEndDate.replaceAll(
                          '-',
                          '/'
                        )}`}
                        color={
                          this.state.properties.companyEndDate === 'current'
                            ? `success`
                            : `primary`
                        }
                      />
                    </Stack>
                  }
                ></CardHeader>
                <CardContent>
                  <Typography>Details</Typography>
                </CardContent>
              </Stack>
            </Card>
          </Stack>
        </TimelineContent>
      </TimelineItem>
    );
  }
}

export default withRouter(ResumeTimelineItem)

// export {
//   withRouter(ResumeTimeLineItem)
// }