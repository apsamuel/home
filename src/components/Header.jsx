import React from 'react'

// import { withStyles } from '@mui/material'
import {
  Box,
  AppBar,
  Toolbar,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  // Divider,
  // Menu,
  // MenuItem,
  Switch,
  FormGroup,
  FormControlLabel,
  Typography,
  // Button,
  IconButton,
} from '@mui/material'

import {
  Menu as MenuIcon,
  Info as InfoIcon,
  ConnectWithoutContact as ContactIcon,
  DataObject as ResumeIcon,
  Book as BlogIcon,
} from '@mui/icons-material'


class HomeHeader extends React.Component {
  #menuData = [
    {
      name: 'About',
      icon: () => {
        return <InfoIcon />;
      },
    },
    {
      name: 'Resume',
      icon: () => {
        return <ResumeIcon />;
      },
    },
    {
      name: 'Blog',
      icon: () => {
        return <BlogIcon />;
      },
    },
    {
      name: 'Contact',
      icon: () => {
        return <ContactIcon />;
      },
    },
  ];
  constructor(props) {
    super(props);
    // unwrap props
    this.props = { ...props };
    // state
    this.state = {
      anchorMenuElement: false,
      drawerOpen: false,
      darkMode: false,
    };
    // reactive handlers

    this.handleMenu = this.handleMenu.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDrawer = this.handleDrawer.bind(this);
  }

  handleSwitch(event) {
    // console.log(event);
    this.setState((state) => ({
      ...state,
      darkMode: event.target.checked,
    }));
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
    console.log(
      `the theme switch was toggled to ${
        this.state.darkMode ? 'dark' : 'light'
      } mode`
    );
  }

  handleMenu(event) {
    if (this.state.anchorMenuElement === true) {
      console.log(`menu item closed at ${new Date().toJSON()}`);
    } else {
      console.log(`menu item opened at ${new Date().toJSON()}`);
    }

    this.setState((state) => ({
      ...state,
      anchorMenuElement: !this.state.anchorMenuElement,
    }));
  }

  handleDrawer(event) {
    this.setState((state) => ({
      ...state,
      drawerOpen: !this.state.drawerOpen,
    }));
    console.log(`drawer item opened at ${new Date().toJSON()}`);
  }

  handleClose(event) {
    // console.log(event)
    console.log(
      `menu item closed at ${new Date().toJSON()} by ${event.target.id}`
    );
    this.setState((state) => ({
      ...state,
      anchorMenuElement: false,
    }));
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <div>
              <React.Fragment>
                <SwipeableDrawer
                  anchor={'left'}
                  open={this.state.drawerOpen}
                  onClose={this.handleDrawer}
                  onOpen={this.handleDrawer}
                >
                  {
                    <Box
                      sx={{ width: 'auto' }}
                      role="presentation"
                      onClick={this.handleDrawer}
                      onKeyDown={this.handleDrawer}
                    >
                      <List>
                        {this.#menuData.map((item, index) => (
                          <ListItem button key={item.name}>
                            <ListItemIcon>
                              {item.icon()}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  }
                </SwipeableDrawer>
              </React.Fragment>
            </div>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Aaron Peter Samuel
            </Typography>

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    aria-label="theme-switch"
                    checked={this.state.darkMode}
                    onChange={this.handleSwitch}
                  />
                }
                label={this.state.darkMode ? 'light mode' : 'dark mode'}
              ></FormControlLabel>
            </FormGroup>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default HomeHeader
