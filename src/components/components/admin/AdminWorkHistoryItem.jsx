import React from 'react';

import { withRouter } from 'react-router-dom';
import {
  Box,
  Stack,
  // Divider,
  Typography,
  Accordion,
  AccordionSummary,
  // AccordionDetails,
  AccordionActions,
  // Card,
  // CardHeader,
  // CardContent,
  // CardActions,
  // Dialog,
  // Avatar,
  // Chip,
  // Tooltip,
  // IconButton,
  Button
} from '@mui/material';

import {  ExpandMore } from '@mui/icons-material';
import AdminWorkHistoryItemEditDialog from '../admin/AdminWorkHistoryItemEditDialog.jsx';

class AdminWorkHistoryItem extends React.Component {
  #defaultSpacing = 5
  #defaultAlignment = 'center'
  #defaultDirection = 'row'
  constructor(props) {
    super(props);
    // this.props = { ...props }
    this.theme = this.props.theme;
    this.state = {
      // workHistoryManagerExpanded: false,
      roleHistory: [],
      editDialogOpen: false
    };
    this.handleEditDialogOpen = this.handleEditDialogOpen.bind(this);
    this.handleEditDialogClose = this.handleEditDialogClose.bind(this);
  }

  handleEditDialogOpen() {
    console.log(`opening dialog`)
    this.setState((state) => ({
      ...state,
      editDialogOpen: !state.editDialogOpen
    }))
  }

  handleEditDialogClose() {
    console.log(`closing dialog`)
    this.setState((state) => ({
      ...state,
      editDialogOpen: false
    }))
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:8081/api/resume/rolehistory/${this.props.companyId}`)
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
          roleHistory: [...json]
        }));
      });
  }

  render() {
    // const theme = this.props.theme
    return (
      <Stack
        direction={this.#defaultDirection}
        sx={{
          alignItems: this.#defaultAlignment,
          alignContent: this.#defaultAlignment,
          justifyContent: this.#defaultAlignment,
          padding: this.#defaultSpacing
        }}
        spacing={this.#defaultSpacing}
        key={`primary-stack-${this.props.companyId}`}
      >
        <Accordion key={`accordion-${this.props.companyId}`}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            key={`accordion-summary-${this.props.companyId}`}
          >
            <Stack
              direction={this.#defaultDirection}
              sx={{
                alignItems: this.#defaultAlignment,
                alignContent: this.#defaultAlignment,
                justifyContent: this.#defaultAlignment,
                padding: this.#defaultSpacing
              }}
              spacing={this.#defaultSpacing}
              key={`accordion-summary-stack-${this.props.companyId}`}
            >
              <Typography>{this.props.companyName}</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionActions key={`accordion-actions-${this.props.companyId}`}>
            <Stack
              direction={this.#defaultDirection}
              sx={{
                alignItems: this.#defaultAlignment,
                alignContent: this.#defaultAlignment,
                justifyContent: this.#defaultAlignment,
                padding: this.#defaultSpacing
              }}
              spacing={this.#defaultSpacing}
              key={`accordion-actions-stack-${this.props.companyId}`}
            >
              <Button variant='outlined' onClick={this.handleEditDialogOpen}>
                Delete
              </Button>
              <Button variant='outlined' onClick={this.handleEditDialogOpen} >
                Update
              </Button>
              <AdminWorkHistoryItemEditDialog
                roleHistory={this.state.roleHistory}
                handleEditDialogClose={this.handleEditDialogClose}
                editDialogOpen={this.state.editDialogOpen}
                { ...this.props }

              />
            </Stack>
          </AccordionActions>
        </Accordion>
      </Stack>
    );
  }
}

export default withRouter(AdminWorkHistoryItem);
