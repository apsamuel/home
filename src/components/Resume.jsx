import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {
  Box,
  // Typography
} from '@mui/material';

import {
  Timeline,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
} from '@mui/lab'


import {
  ArrowCircleRightRounded as ArrowCircleRight,
  ArrowCircleLeftRounded as ArrowCircleLeft,
} from '@mui/icons-material'

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.props = { ...props };
    this.theme = this.props.theme;
    this.state = {
      generalInfo: {},
      skillsInfo: {},
      educationHistory: [],
      workHistory: []
    }
  }

  componentDidMount() {
    console.log(`resume mounted`)

    fetch('http://127.0.0.1:8081/api/resume/general')
      .then((res) => {
        const json = res.json();
        return json;
      })
      .then((json) => {
        this.setState((state) => ({
          ...state,
          generalInfo: {
            ...json,
          },
        }));
      });

    fetch('http://127.0.0.1:8081/api/resume/education')
      .then((res) => {
        const json = res.json();
        return json;
      })
      .then((json) => {
        this.setState((state) => ({
          ...state,
          educationHistory: [
            ...json,
          ],
        }));
      });

    fetch('http://127.0.0.1:8081/api/resume/skills')
      .then((res) => {
        const json = res.json();
        return json;
      })
      .then((json) => {
        this.setState((state) => ({
          ...state,
          skillsInfo: [
            ...json,
          ],
        }));
      });

    fetch('http://127.0.0.1:8081/api/resume/workhistory')
      .then((res) => {
        // console.log(res.json())
        const json = res.json()
        // res.json()
        return json
      })
      .then((json) => {
        this.setState((state) => ({
          ...state,
          workHistory: [
            ...json
          ]
        }))
      })


  }
  render() {
    // const theme = this.props.theme
    return (
      <Box>
        <Timeline position="alternate">
          {this.state.workHistory.map((item, index) => {
            return (
              <TimelineItem key={item.companyId}>
                <TimelineSeparator>
                  <TimelineDot>
                    {index % 2 === 0 ? <ArrowCircleRight/> : <ArrowCircleLeft/>}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{item.companyName}</TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Box>
    );
  }
}

export default withRouter(Resume);
