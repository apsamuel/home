import React from 'react';
import {
  ExpandedMore,
  DoubleArrow,
  WorkHistory,
} from '@mui/icons-material';
import { withRouter } from 'react-router-dom';
import {
  Stack,
  Box,
  Paper,
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Chip
} from '@mui/material';

class ResumeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.theme = this.props.theme;
    this.state = {
      roles: []
    };
  }

  componentDidMount() {
    console.log(`mounted resume details with ${this.props}`);
    console.log(this);
  }

  render() {
    return (
      <div
        sx={
          {
            // primary div
          }
        }
      >
        <Stack
          direction={'row'}
          sx={{
            // centering primary content
            paddingTop: 5,
            justifyContent: 'center'
          }}
        >
          <Box>
            <Paper>
              <Card
                // primary spacing between card components sx={{
                spacing={5}
                sx={{
                  padding: 5
                }}
              >
                {/* Work History Item Detail Card */}
                <Stack direction={'row'} spacing={5}>
                  {/* Company Overview - Left*/}
                  <Stack spacing={5} sx={{ border: '1px solid' }}>
                    <Box
                      sx={{
                        padding: 5
                      }}
                    >
                      <Stack direction={'row'}>
                        {/* Company Name & Logo are side by side*/}
                        <Stack
                          direction={'row'}
                          spacing={1}
                          sx={{ padding: 5 }}
                        >
                          <Box>
                            <Typography variant='h4'>
                              {this.props.companyName}
                            </Typography>
                          </Box>
                          <Box>
                            <Avatar
                              alt={this.props.companyName}
                              variant={'circle'}
                              src={`http://127.0.0.1:8081/api/static/images/${this.props.companyImage}`}
                              sx={{
                                // top: 5,
                                bgcolor: 'primary.main',
                                width: 46,
                                height: 46
                              }}
                            />
                          </Box>
                        </Stack>
                      </Stack>
                      <Stack
                        direction={'column'}
                        spacing={1}
                        sx={{
                          alignItems: 'center',
                          alignContent: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Box>
                          <Chip
                            label={this.props.companyType}
                            color='primary'
                          />
                        </Box>
                        <Box>
                          <Typography
                            sx={{ fontWeight: 600 }}
                            variant='subtitle2'
                          >
                            {this.props.companyAddress}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant='subtitle2'>
                            {this.props.companyCity}, {this.props.companyState}
                          </Typography>
                        </Box>
                      </Stack>
                      {/* Divides overview and general details horizontally */}
                      <Box>
                        <Divider />
                      </Box>
                      <Stack
                        direction={'column'}
                        spacing={2}
                        sx={{ paddingTop: 5 }}
                      >
                        <Stack direction={'row'} spacing={5}>
                          <Box>
                            <Typography variant='h6' sx={{ fontWeight: 600 }}>
                              Started:
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant='h6'>
                              {this.props.companyStartYear}
                            </Typography>
                          </Box>
                        </Stack>
                        <Stack direction={'row'} spacing={5}>
                          <Box>
                            <Typography variant='h6' sx={{ fontWeight: 600 }}>
                              Ended:
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant='h6'>
                              {this.props.companyEndYear}
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>

                  {/* Main Vertical Division */}
                  <Divider
                    orientation='vertical'
                    flexItem={true}
                    style={{ position: 'relative' }}
                  />

                  {/* Role(s) Details, etc - Right */}
                  <Stack
                    spacing={5}
                    sx={{ border: '1px solid', paddingTop: 5 }}
                  >
                    <Box sx={{ padding: 5 }}>
                      <Stack>
                        <Stack direction={'row'} spacing={2}>
                          <WorkHistory />
                          <Typography variant='h5'>Role History</Typography>
                        </Stack>
                        {/* Positions Held */}
                        <Box>
                          {this.props.roles.map((role, index) => (
                            <Accordion>
                              <AccordionSummary>
                                <Typography>{role.roleName}</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <List>
                                  {role.roleResponsibilities.map(
                                    (responsibility, index) => (
                                      <div>
                                        <ListItem>
                                          <ListItemIcon>
                                            <DoubleArrow />
                                          </ListItemIcon>
                                          <ListItemText
                                            primary={
                                              <React.Fragment>
                                                <Typography
                                                  component='span'
                                                  variant='body2'
                                                  color='text.primary'
                                                >
                                                  {responsibility}
                                                </Typography>
                                              </React.Fragment>
                                            }
                                          />
                                        </ListItem>
                                        <Divider
                                          variant='inset'
                                          component='li'
                                        />
                                      </div>
                                    )
                                  )}
                                </List>
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </Card>
            </Paper>
          </Box>
        </Stack>
      </div>
    );
  }
}

export default withRouter(ResumeDetail);
