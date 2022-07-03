import React from 'react';
import {
  withRouter,
  // useRouteMatch,
  Switch,
  Link,
  Route
} from 'react-router-dom';
import './ResumeTimelineItem.css';
import {
  Box,
  Stack,
  Divider,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  Tooltip,
  IconButton,
  Button,
} from '@mui/material';

import {
  Timeline,
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
  LensBlurOutlined as LensBlur,
  WorkHistory,
  Info,

} from '@mui/icons-material'

import ResumePieChart from '../elements/ResumeTimelineItemPieChart.jsx'
import ResumeDetail from '../components/ResumeDetail.jsx'

// function getRouteMatch() {
//   const { url, path } = useRouteMatch();
// }
class ResumeTimelineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      properties: {
        ...props,
      },
      roles: [],
      stats: {},
    };
    this.theme = this.props.theme;
  }

  componentDidMount() {
    fetch(
      `http://127.0.0.1:8081/api/resume/rolehistory/${this.state.properties.companyId}`
    )
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
          roles: [...json],
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
        console.log(`collected stats ${JSON.stringify(json)}`);
        console.log(`stats is a ${typeof json}`);
        console.log(`${Object.keys(json)}`);
        this.setState((state) => ({
          ...state,
          stats: {
            ...json,
          },
        }));
      });

  }

  render() {
    const { history } = this.props

    return (
      <TimelineItem key={this.state.properties.companyId}>

          <Route
            exact
            // path="/resume/:companyName/:companyId"
            component={<ResumeDetail {...this.props} {...this.state} />}
            path={`/resume/${this.state.properties.companyName.replaceAll(
              ' ',
              ''
            )}/${this.state.properties.companyId}`}
          />



        <TimelineSeparator sx={{}}>
          <TimelineDot>
            {this.state.properties.direction === 'left' ? (
              <ArrowCircleRight />
            ) : (
              <ArrowCircleLeft />
            )}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent>
          <Stack direction='column'>
            <Tooltip
              title={
                Array.isArray(this.state.stats.roleStatsRoleNames)
                  ? `${this.state.stats.roleStatsRoleNames.join(' ')}`
                  : `None`
              }
              arrow
            >
              <Card
                sx={{
                  display: 'flex',
                  background: 'primary',
                  borderStyle: 'solid',
                  alignContent: 'center',
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingTop: 5,
                  paddingBottong: 5
                }}
              >
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0 -5px',
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 5,
                    paddingBottong: 5
                  }}
                  spacing={2}
                  divider={<Divider orientation='horizontal' flexItem />}
                >
                  <CardHeader
                    disableTypography={true}
                    sx={{
                      '.MuiCardHeader-content': {
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        justifyContent: 'center',
                        gap: '15px'
                      }
                    }}
                    avatar={
                      <Avatar
                        variant='circular'
                        src={`http://127.0.0.1:8081/api/static/images/${this.state.properties.companyImage}`}
                        sx={{
                          bgcolor: 'primary.main',
                          width: 56,
                          height: 56
                        }}
                      />
                    }
                    title={
                      <Typography component='div' variant='h6'>
                        {this.props.companyName} (
                        {this.props.companyEmploymentType})
                      </Typography>
                    }
                    subheader={
                      <Stack direction='row' spacing={5}>
                        <Chip
                          label={`${this.state.properties.companyStartDate.replaceAll(
                            '-',
                            '/'
                          )}`}
                          color='primary'
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
                  <CardContent
                    sx={{
                      display: 'flex'
                    }}
                  >
                    <Stack
                      direction='column'
                      sx={{
                        alignContent: 'center',
                        alignItems: 'center'
                      }}
                      divider={<Divider orientation='horizontal' flexItem />}
                    >
                      {Array.isArray(this.state.stats.roleStatsRoleNames) ? (
                        <Box style={{ display: 'flex' }}>
                          <Typography variant='subtitle1'>
                            Role History
                          </Typography>
                          <Timeline>
                            {this.state.stats.roleStatsRoleNames.map(
                              (roleName) => (
                                <TimelineItem key={`${roleName}`}>
                                  <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                  </TimelineSeparator>
                                  <TimelineContent>
                                    <Typography variant='caption'>
                                      {roleName}
                                    </Typography>
                                  </TimelineContent>
                                </TimelineItem>
                              )
                            )}
                          </Timeline>
                        </Box>
                      ) : (
                        <Box>Positions: None</Box>
                      )}

                      <ResumePieChart
                        sx={{}}
                        data={this?.state?.stats?.roleSummaryTechnology || []}
                      />
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      size='small'
                      onClick={() => {
                        history.push(
                          `/${this.state.properties.companyName.replaceAll(
                            ' ',
                            ''
                          )}/${this.state.properties.companyId}`
                        );
                      }}
                    >
                      <WorkHistory />
                    </IconButton>
                    <IconButton size='small'>
                      <Info />
                    </IconButton>
                  </CardActions>
                </Stack>
              </Card>
            </Tooltip>
          </Stack>
        </TimelineContent>
      </TimelineItem>
    );
  }
}

export default withRouter(ResumeTimelineItem)