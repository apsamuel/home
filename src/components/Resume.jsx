import React from 'react';
import {
  withRouter,
  Switch,
  Route
} from 'react-router-dom';
import {
  Box,
  // Typography
} from '@mui/material';

import {
  Timeline,
  // TimelineSeparator,
  // TimelineConnector,
  // TimelineContent,
  // TimelineDot,
  // TimelineItem,
} from '@mui/lab'


import {
  ArrowCircleRightRounded as ArrowCircleRight,
  ArrowCircleLeftRounded as ArrowCircleLeft,
} from '@mui/icons-material'

import  ResumeTimelineItem  from '../elements/ResumeTimelineItem.jsx'
import ResumeDetail from '../components/ResumeDetail.jsx'
class Resume extends React.Component {
  constructor(props) {
    super(props);
    // this.props = { ...props };
    this.theme = this.props.theme;
    this.state = {
      generalInfo: {},
      skillsInfo: {},
      educationHistory: [],
      workHistory: [],
      workHistoryStats: {}
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
        console.log('updating workhistory')
        this.setState((state) => ({
          ...state,
          workHistory: [
            ...json
          ]
        }))
      })

    fetch('http://127.0.0.1:8081/api/resume/workhistory/stats')
      .then((res) => {
        // console.log(res.json())
        const json = res.json();
        // res.json()
        return json;
      })
      .then((json) => {
        console.log(`updating workhistory ${JSON.stringify(json)}`);
        this.setState((state) => ({
          ...state,
          workHistoryStats: {...json},
        }));
      });


  }
  render() {
    // const theme = this.props.theme
    return (
      <Box>
        {/* <Switch>
          {this.state.workHistory.map((item, index) => {
            return (<Route key={`${item.companyId}`} path={`/${item.companyName}/${item.companyId}`} component={<ResumeDetail {...this.props} {...this.state}/>}>Resume Details</Route>)
          })}
        </Switch> */}
        <Timeline position="alternate">
          {this.state.workHistory.map((item, index) => {
            return (
              <ResumeTimelineItem
                key={`${item.companyId}`}
                {
                  ...item
                }
                direction={index % 2 === 0 ? "left" : "right" }
                {
                  ...this.props
                }
              />
            );
          })}
        </Timeline>
      </Box>
    );
  }
}

export default withRouter(Resume);
