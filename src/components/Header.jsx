import React from 'react'

import {
  styled,
  alpha
} from '@mui/material/styles'

import {
  withRouter,
  // Switch,
  // Route,
  // Redirect,
  // Link as RouterLink
} from 'react-router-dom';

import {
  ThemeProvider,
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
  InputBase,
  Switch as FormSwitch,
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
  Search as SearchIcon,
} from '@mui/icons-material'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


class HomeHeader extends React.Component {
  #menuData = [
    {
      name: 'About',
      icon: () => {
        return <InfoIcon />;
      },
      to: '/about'
    },
    {
      name: 'Resume',
      icon: () => {
        return <ResumeIcon />;
      },
      to: '/resume'
    },
    {
      name: 'Blog',
      icon: () => {
        return <BlogIcon />;
      },
      to: '/blog'
    },
    {
      name: 'Contact',
      icon: () => {
        return <ContactIcon />;
      },
      to: '/contact'
    },
  ];
  constructor(props) {
    super(props);
    // unwrap props
    // this.props = { ...props };
    this.theme = this.props.theme
    this.title = this.props.title
    this.drawerWidth = this.props.drawerWidth
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
    console.log(
      `theme data ${JSON.stringify(this.theme)}`
    )
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
    console.log(
      `menu item closed at ${new Date().toJSON()} by ${event.target.id}`
    );
    this.setState((state) => ({
      ...state,
      anchorMenuElement: false,
    }));
  }

  render() {
    // const ref = React.createRef()
    const { history } = this.props
    return (
      <ThemeProvider theme={this.props.theme}>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
          }}
        >
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer - 1,
            }}
          >
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
                    sx={{
                      width: this.drawerWidth,
                      flexShrink: 0,
                      [`& .MuiDrawer-paper`]: {
                        width: this.drawerWidth,
                        boxSizing: 'border-box',
                      },
                    }}
                  >
                    {
                      <Box
                        sx={{
                          width: 'auto',
                          overflow: 'auto',
                        }}
                        role="presentation"
                        onClick={this.handleDrawer}
                        onKeyDown={this.handleDrawer}
                      >
                        <List>
                          {this.#menuData.map((item, index) => (

                              <ListItem button key={`${item.name}-list-item`} onClick={() => { history.push(item.to)}}>
                                <ListItemIcon
                                  key={`${item.name}-list-item-icon`}
                                >
                                  {item.icon()}
                                </ListItemIcon>
                                <ListItemText primary={item.name} key={`${item.name}-list-item-text`} />
                              </ListItem>
                          ))}
                        </List>
                      </Box>
                    }
                  </SwipeableDrawer>
                  <Toolbar />
                </React.Fragment>
              </div>

              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                noWrap
              >
                {this.title}
              </Typography>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>

              <FormGroup>
                <FormControlLabel
                  control={
                    <FormSwitch
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
          <Toolbar />
        </Box>
      </ThemeProvider>
    );
  }
}

export default withRouter(HomeHeader)
