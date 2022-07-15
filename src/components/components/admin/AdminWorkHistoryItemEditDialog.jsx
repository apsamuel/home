import React from 'react';

import { withRouter } from 'react-router-dom';
import {
  Box,
  Stack,
  Paper,
  Divider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  // DialogActions,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  TextField,
  MenuItem,
  ListItem,
  // Avatar,
  Chip,
  // Tooltip,
  ButtonBase
  // IconButton,
  // Button
  // Card,
  // CardHeader,
  // CardContent,
  // CardActions,
} from '@mui/material';

import {
  AdapterMoment
} from '@mui/x-date-pickers/AdapterMoment'

import {
  LocalizationProvider
} from '@mui/x-date-pickers/LocalizationProvider'

import {
  DesktopDatePicker
} from '@mui/x-date-pickers/DesktopDatePicker'

// import { ExpandMore } from '@mui/icons-material';

class AdminWorkHistoryItemEditDialog extends React.Component {
  #defaultSpacing = 5;
  #defaultAlignment = 'center';
  #defaultDirection = 'row';
  #defaultCharacterBuffer = 5
  #selectEmploymentTypes = [
    { value: 'Full-Time', label: 'Full-Time' },
    { value: 'Part-Time', label: 'Part-Time' },
    { value: 'Consultant', label: 'Consultant' },
    { value: 'Internship', label: 'Internship' },
  ];
  constructor(props) {
    super(props);
    // this.props = { ...props }
    this.theme = this.props.theme;
    this.state = {
      expanded: false,
      data: {
        ...this.props
      }
    };
  }

  componentDidMount() {}

  render() {
    // const theme = this.props.theme
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Dialog
          sx={{
            top: '64px !important'
            // backgroundColor: '#fff444',
          }}
          fullScreen
          open={this.props.editDialogOpen}
          onClose={this.props.handleEditDialogClose}
        >
          <DialogTitle>
            <Stack
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Typography component='div'>
                <Typography component='span' sx={{ fontWeight: 600 }}>
                  Record{' '}
                </Typography>
                {this.state.data.companyId} ({this.state.data.companyName})
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Box
              component='form'
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                top: '300px !important',
                '& .MuiTextField-root': {
                  m: 1
                  // width: '25ch'
                },
                border: '1px solid #000',
                padding: '10px'
              }}
              noValidate
              autoComplete='off'
              id={`${this.props.companyId}-workhistory-edit-form`}
            >
              <Stack spacing={5} direction={'row'}>
                <Box>
                  <Stack spacing={5} direction='column'>
                    {/* General Info */}
                    <Typography>General</Typography>
                    <FormGroup row>
                      {/* Company Name */}
                      <FormControl variant='outlined'>
                        <TextField
                          sx={{
                            width:
                              this.state.data.companyName.length +
                              this.#defaultCharacterBuffer +
                              'ch'
                          }}
                          required
                          id='companyName'
                          label='Company Name'
                          defaultValue={this.state.data.companyName}
                        />
                      </FormControl>
                      {/* Company Aliases */}
                      {/* <FormControl variant='outlined'>
                    <TextField
                      sx={{
                        width:
                          this.state.data.companyAliases.join(' ').length +
                          this.#defaultCharacterBuffer +
                          'ch'
                      }}
                      required
                      id='companyAliases'
                      label='Company Aliases'
                      defaultValue={this.state.data.companyAliases.join(', ')}
                    />
                  </FormControl> */}
                      <FormControl variant='outlined'>
                        <TextField
                          id='companyAliases'
                          label='Company Aliases'
                          InputProps={{
                            startAdornment: this.state.data.companyAliases.map(
                              (item, index) => {
                                return (
                                  <Chip
                                    key={item}
                                    tabIndex={-1}
                                    label={item}
                                    onDelete={() => {
                                      console.log(`deleting ${item}`);
                                    }}
                                  />
                                );
                              }
                            )
                          }}
                        ></TextField>
                      </FormControl>
                      {/* <Box position='relative' height={98}>
                    <Box
                      // position='absolute'
                      top={0}
                      bottom={0}
                      left={0}
                      right={0}
                      height={50}
                      sx={{
                        // display: 'flex',
                        // flexWrap: 'wrap',
                        // justifyContent: 'center',
                        // listStyle: 'none',
                        border: '1px solid #A09B9B',
                        borderRadius: '5px'
                        // p: 0.5,
                        // m: 0
                      }}
                      component='ul'
                    >
                      {this.state.data.companyAliases.map((item, index) => {
                        return (
                          <ListItem
                            key={`${this.props.companyId}-workhistory-edit-form-companyAliases-${index}`}
                          >
                            <Chip
                              label={item}
                              onDelete={() => {
                                console.log('deleted alias chip');
                              }}
                            />
                          </ListItem>
                        );
                      })}
                    </Box>
                  </Box> */}
                    </FormGroup>

                    <Typography>Location</Typography>
                    <FormGroup row>
                      {/* Company Address */}
                      <FormControl variant='outlined'>
                        <TextField
                          sx={{
                            width:
                              this.state.data.companyAddress.length +
                              this.#defaultCharacterBuffer +
                              'ch'
                          }}
                          required
                          id='companyAddress'
                          label='Address'
                          defaultValue={this.state.data.companyAddress}
                        />
                      </FormControl>

                      {/* Company City */}
                      <FormControl variant='outlined'>
                        <TextField
                          sx={{
                            width:
                              this.state.data.companyCity.length +
                              this.#defaultCharacterBuffer +
                              'ch'
                          }}
                          required
                          id='companyCity'
                          label='City'
                          defaultValue={this.state.data.companyCity}
                        />
                      </FormControl>

                      {/* Company State */}
                      <FormControl variant='outlined'>
                        <TextField
                          sx={{
                            width:
                              this.state.data.companyState.length +
                              this.#defaultCharacterBuffer +
                              'ch'
                          }}
                          required
                          id='companyState'
                          label='State'
                          defaultValue={this.state.data.companyState}
                        />
                      </FormControl>

                      {/* Company Zip Code, the postal code for the address */}
                      <FormControl variant='outlined'>
                        <TextField
                          sx={{
                            width:
                              this.state.data.companyZip.length +
                              this.#defaultCharacterBuffer +
                              'ch'
                          }}
                          required
                          id='companyZip'
                          label='Zip'
                          defaultValue={this.state.data.companyZip}
                        />
                      </FormControl>
                    </FormGroup>
                    {/* Start and End Times */}
                    <Typography>Employment Period</Typography>
                    <FormGroup row>
                      {/* Start Date */}
                      <FormControl variant='outlined'>
                        <DesktopDatePicker
                          sx={{
                            width:
                              this.state.data.companyStartDate.length +
                              this.#defaultCharacterBuffer +
                              'ch'
                          }}
                          label='Start Date'
                          id='companyStartDate'
                          inputFormat='MM-DD-yyyy'
                          value={this.state.data.companyStartDate}
                          renderInput={(params) => <TextField {...params} />}
                          onChange={() => {
                            console.log('changed start date');
                          }}
                        />
                      </FormControl>
                      {/* End Date */}
                      <FormControl variant='outlined'>
                        <DesktopDatePicker
                          sx={{
                            width:
                              this.state.data.companyEndDate.length +
                              this.#defaultCharacterBuffer +
                              'ch'
                          }}
                          label='End Date'
                          id='companyEndDate'
                          inputFormat='MM-DD-yyyy'
                          value={this.state.data.companyEndDate}
                          renderInput={(params) => <TextField {...params} />}
                          onChange={() => {
                            console.log('changed end date');
                          }}
                        />
                      </FormControl>
                    </FormGroup>

                    {/* Misc  */}
                    <Typography>Categorization</Typography>
                    <FormGroup row>
                      {/* Company Type, eg: Publishing, Financial Institution */}
                      <FormControl variant='outlined'>
                        <TextField
                          sx={{
                            width:
                              this.state.data.companyType.length +
                              this.#defaultCharacterBuffer +
                              'ch'
                          }}
                          required
                          id='companyType'
                          label='Sector'
                          defaultValue={this.state.data.companyType}
                        />
                      </FormControl>

                      {/* Employment Type, eg: Full-Time, Consultant, Internship */}
                      <FormControl variant='outlined'>
                        {/* <InputLabel id='companyEmploymentTypeLabel'>
                      Employment
                    </InputLabel> */}
                        <TextField
                          sx={{
                            width:
                              this.state.data.companyEmploymentType.length +
                              2 +
                              'ch'
                          }}
                          select
                          id='companyEmploymentType'
                          value={`${this.state.data.companyEmploymentType}`}
                          label='Employment'
                        >
                          {this.#selectEmploymentTypes.map((item, index) => (
                            <MenuItem
                              key={item.value}
                              id={`${this.props.companyId}-employment-type-item-${item.value}`}
                              value={item.value}
                            >
                              {item.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </FormGroup>

                    {/* Company Links  */}

                    {/* Company Logo */}
                    <FormGroup>
                      <Box position='relative' height={98}>
                        <Box
                          position='absolute'
                          top={0}
                          bottom={0}
                          left={0}
                          right={0}
                          // mx={2}
                        >
                          <TextField
                            // InputProps={{ disableUnderline: true }}
                            margin='normal'
                            fullWidth
                            disabled
                            label='Company Logo'
                            value={this.state.data.companyImage}
                            sx={{
                              '& .MuiFormLabel-root.Mui-disabled': {
                                // color: this.theme.colors.text.primary
                              },
                              '& .MuiInputLabel-root': {
                                color: 'rgb(93 86 86 / 60%)'
                              }
                            }}
                          />
                        </Box>
                        <ButtonBase
                          sx={{
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            '. &MuiButtonBase-root': {
                              color: '#000000'
                            }
                          }}
                          component='label'
                        >
                          <input type='file' accept='image/*' hidden />
                        </ButtonBase>
                      </Box>

                      <FormControl variant='outlined'>
                        <TextField
                          id='companyLinks'
                          label='Company Links'
                          InputProps={{
                            startAdornment: this.state.data.companyLinks.map(
                              (item, index) => {
                                return (
                                  <Chip
                                    key={`${this.props.companyId}-company-links-chip-${index}`}
                                    tabIndex={-1}
                                    label={item.type}
                                    onDelete={() => {
                                      console.log(`deleting ${item.url}`);
                                    }}
                                  />
                                );
                              }
                            )
                          }}
                        ></TextField>
                      </FormControl>
                    </FormGroup>
                  </Stack>
                </Box>
                <Divider
                  orientation='vertical'
                />
                <Box>
                  <Stack
                    direction='column'
                    spacing={5}
                  >
                    Testing
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </DialogContent>
        </Dialog>
      </LocalizationProvider>
    );
  }
}

export default withRouter(AdminWorkHistoryItemEditDialog);
