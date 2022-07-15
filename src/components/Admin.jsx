import React from 'react';

import { withRouter } from 'react-router-dom';
import {
  Box,
  Stack,
  // Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  // Dialog,
  Avatar,
  // Chip,
  // Tooltip,
  IconButton,
  Button
} from '@mui/material';

import {
  Construction,
  Info,
  ExpandMore
} from '@mui/icons-material';

// try sub-components

import AdminWorkHistoryItem from './components/admin/AdminWorkHistoryItem.jsx'

class Admin extends React.Component {
  constructor(props) {
    super(props);
    // this.props = { ...props }
    this.theme = this.props.theme;
    this.state = {
      workHistoryManagerExpanded: false,
      workHistory: [],
      accordionPanelExpanded: false,
    };
  }

  handleWorkHistoryManagerExpanded() {
    console.log(`handling work history manager card expansion`)
    this.setState((state) => ({
      ...state,
      workHistoryManagerExpanded: !this.state.workHistoryManagerExpanded
    }));
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8081/api/resume/workhistory')
      .then((res) => {
        // console.log(res.json())
        const json = res.json();
        // res.json()
        return json;
      })
      .then((json) => {
        console.log('updating workhistory');
        this.setState((state) => ({
          ...state,
          workHistory: [...json]
        }));
      });
  }

  render() {
    // const theme = this.props.theme
    return (
      <Stack
        direction='column'
        spacing={5}
        sx={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          padding: 10,
          border: '1px solid #ccc'
        }}
      >
        <Box>
          <Card>
            <CardHeader
              title='Resume Manager'
              subheader={`${this.state.workHistory.length} records`}
              action={
                <IconButton>
                  <Info />
                </IconButton>
              }
              avatar={
                <Avatar>
                  <Construction />
                </Avatar>
              }
            />
            <CardContent>
              <Stack
                direction='column'
                spacing={2}
                sx={{
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box>
                  <Button>Testing</Button>
                </Box>
                <Box>
                  {this.state.workHistory.map((item, index) => (
                    <AdminWorkHistoryItem
                      key={`${item.companyId}-${index}-admin-work-history-item`}
                      {...item}
                    />
                  ))}
                </Box>
              </Stack>
            </CardContent>
            <CardActions disableSpacing>
              <Stack direction='row' spacing={5}>
                <Button variant='outlined'>Action 1</Button>
                <Button variant='outlined'>Action 2</Button>
              </Stack>
            </CardActions>
          </Card>
        </Box>
      </Stack>
    );
  }
}

export default withRouter(Admin);
