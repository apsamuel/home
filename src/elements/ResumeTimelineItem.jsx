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
  Dialog,
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
  DateRange,
  Category,
  FlightLand,
  FlightTakeoff,
  Savings,
  Shuffle,
  ConnectWithoutContact,
  ManageAccounts,
  Timeline as TimelineIcon,
  Link as LinkIcon

} from '@mui/icons-material'

import ResumePieChart from '../elements/ResumeTimelineItemPieChart.jsx'
import ResumeDetail from '../components/ResumeDetail.jsx'


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
      detail: false,
      totalRoles: 0,
      elapsedTime: 0
      // elapsedTime: 0,
    };
    this.theme = this.props.theme;
    this.handleDetailOpen = this.handleDetailOpen.bind(this);
    this.handleDetailClose = this.handleDetailClose.bind(this);
  }

  componentDidMount() {
    // console.log(this.props)

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

    fetch(
      `http://127.0.0.1:8081/api/resume/workhistory/stats`
    )
      .then((res) => {
        const json = res.json();
        console.log(
          `fetching company history stats for company ${this.state.properties.companyName} (${this.state.properties.companyId}`
        );
        return json;
      })
      .then((json) => {
        // console.log(`collected workhistory stats ${JSON.stringify(json)}`);
        const { companyHistoryStats } = json
        const companyStats = companyHistoryStats.find(company => company.companyId === this.state.properties.companyId)
        console.log(companyStats)
        console.log(`stats is a ${typeof json}`);
        console.log(`${Object.keys(json)}`);
        this.setState((state) => ({
          ...state,
          totalRoles: companyStats.companyTotalRoles,
          elapsedTime: companyStats.companyElapsedTimeServed
        }));
      });



  }

  handleDetailOpen() {
    console.log(`opening detail for ${this.state.properties.companyName} (${this.state.properties.companyId})`);
    this.setState((state) => ({
      ...state,
      detail: !state.detail
    }))
  }

  handleDetailClose() {
    this.setState((state) => ({
      ...state,
      detail: false
    }))
  }

  render() {
    const { history } = this.props

    return (
      <TimelineItem key={this.state.properties.companyId}>
        <Switch>
          <Route
            //exact
            // path="/resume/:companyName/:companyId"
            // component={<ResumeDetail {...this.props} {...this.state} />}
            // path={`/resume/${this.state.properties.companyName.replaceAll(
            //   ' ',
            //   ''
            // ).toLowerCase()}/${this.state.properties.companyId}`}

            path={`${this.props.match.url}/:companyName/:companyId`}
          >
            <ResumeDetail {...this.props} {...this.state} />
          </Route>
        </Switch>

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
                      <Stack spacing={2} direction='row'>
                        <Box>
                          <Tooltip
                            title={`This company may also do business under the following names: ${this.props.companyAliases.join(
                              ', '
                            )}`}
                          >
                            <Typography component='div' variant='h6'>
                              {this.props.companyName}
                            </Typography>
                          </Tooltip>
                        </Box>
                        <Box>
                          <Chip
                            label={this.props.companyEmploymentType.toLowerCase()}
                            color={
                              this.props.companyEmploymentType.toLowerCase() ===
                              'internship'
                                ? 'success'
                                : 'primary'
                            }
                            variant='outlined'
                          />
                        </Box>
                      </Stack>
                    }
                    // subheader={
                    //   <Stack direction='row' spacing={2}>
                    //     <Chip
                    //       label={`${this.state.properties.companyStartDate.replaceAll(
                    //         '-',
                    //         '/'
                    //       )}`}
                    //       color='primary'
                    //       variant='outlined'
                    //     />
                    //     <Chip
                    //       label={`${this.state.properties.companyEndDate.replaceAll(
                    //         '-',
                    //         '/'
                    //       )}`}
                    //       color={
                    //         this.state.properties.companyEndDate === 'current'
                    //           ? `success`
                    //           : `primary`
                    //       }
                    //       variant='outlined'
                    //     />
                    //   </Stack>
                    // }
                  ></CardHeader>
                  <CardContent
                    sx={{
                      display: 'flex'
                    }}
                  >
                    <Stack
                      direction='column'
                      spacing={5}
                      sx={{
                        alignContent: 'center',
                        alignItems: 'flex-start',
                        borderStyle: 'solid',
                        padding: 5
                      }}
                      divider={<Divider orientation='horizontal' flexItem />}
                    >
                      <Box>
                        <Stack
                          direction='row'
                          spacing={2}
                          sx={{
                            alignContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <DateRange />
                          <Typography
                            sx={{ fontWeight: 600 }}
                            variant='subtitle1'
                          >
                            Employment Period:
                          </Typography>
                          <Tooltip title='started'>
                            <Chip
                              icon={<FlightLand />}
                              label={`${this.state.properties.companyStartDate.replaceAll(
                                '-',
                                '/'
                              )}`}
                              color='primary'
                              variant='outlined'
                            />
                          </Tooltip>
                          <Tooltip title='ended'>
                            <Chip
                              icon={<FlightTakeoff />}
                              label={`${this.state.properties.companyEndDate.replaceAll(
                                '-',
                                '/'
                              )}`}
                              color={
                                this.state.properties.companyEndDate ===
                                'current'
                                  ? `success`
                                  : `primary`
                              }
                              variant='outlined'
                            />
                          </Tooltip>
                        </Stack>
                      </Box>
                      <Box>
                        <Stack
                          direction='row'
                          spacing={2}
                          sx={{
                            alignContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Category />
                          <Typography
                            sx={{ fontWeight: 600 }}
                            variant='subtitle1'
                          >
                            Company Type:
                          </Typography>
                          <Chip
                            label={this.state.properties.companyType}
                            icon={(() => {
                              switch (
                                this.state.properties.companyType
                                  .toString()
                                  .toLowerCase()
                              ) {
                                case 'financial services':
                                  console.log(
                                    `hit financial services case ${this.state.properties.companyType}`
                                  );
                                  return <Savings />;
                                case 'telecommunications':
                                  return <ConnectWithoutContact />;
                                case 'managed services':
                                  return <ManageAccounts />;
                                default:
                                  console.log(
                                    `using default case ${this.state.properties.companyType}`
                                  );
                                  return <Shuffle />;
                              }
                            })()}
                          />
                        </Stack>
                      </Box>
                      {Array.isArray(this.state.stats.roleStatsRoleNames) ? (
                        <Stack
                          direction='row'
                          spacing={2}
                          sx={{
                            alignContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <TimelineIcon />
                          <Typography
                            sx={{ fontWeight: 600 }}
                            variant='subtitle1'
                          >
                            Role History:
                          </Typography>
                          <Timeline>
                            {this.state.stats.roleStatsRoleNames.map(
                              (roleName) => (
                                <TimelineItem key={`${roleName}`}>
                                  <TimelineSeparator>
                                    <TimelineDot
                                      variant='outlined'
                                      color='success'
                                    />
                                    <TimelineConnector
                                      sx={{ bgcolor: 'grey.a700' }}
                                    />
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
                        </Stack>
                      ) : (
                        <Box>Positions: None</Box>
                      )}

                      {this.state.properties.companyLinks &&
                      Array.isArray(this.state.properties.companyLinks) ? (
                        <Stack
                          direction='row'
                          spacing={2}
                          sx={{
                            alignContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <LinkIcon/>
                          <Typography
                            sx={{ fontWeight: 600 }}
                            variant='subtitle1'
                          >
                            Links:
                          </Typography>
                          {this.state.properties.companyLinks.map((link) => (
                            <Tooltip title={link.type}>
                              <Button
                                size='small'
                                variant='outlined'
                                href={link.url}
                                startIcon={<LinkIcon />}
                              >
                                {link.type}
                              </Button>
                            </Tooltip>
                          ))}
                        </Stack>
                      ) : (
                        <Stack
                          direction='row'
                          spacing={2}
                          sx={{
                            alignContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          No Links
                        </Stack>
                      )}
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Stack>
                      <Button
                        variant='outlined'
                        onClick={this.handleDetailOpen}
                        startIcon={<WorkHistory />}
                      >
                        Role Details
                      </Button>
                      <Dialog
                        sx={{
                          top: '64px !important'
                        }}
                        fullScreen
                        open={this.state.detail}
                        onClose={this.handleDetailClose}
                      >
                        <ResumeDetail {...this.props} {...this.state} />
                      </Dialog>
                    </Stack>
                    {/* <IconButton
                      size='small'
                      onClick={this.handleDetailOpen}
                    >
                      <WorkHistory />
                    </IconButton>

                    <IconButton size='small'>
                      <Info />
                    </IconButton> */}
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