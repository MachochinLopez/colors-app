import React from 'react';
import PaletteMetaForm from './PaletteMetaForm';
// Material UI
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

import useStyles from './styles/PaletteFormNavStyles';

export default function PaletteFormNav(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState("default");

  const handleClickOpen = () => {
    setOpen("paletteName");
  };

  const openEmojiDialog = () => {
    setOpen("emoji");
  };

  const handleClose = () => {
    setOpen("default");
  };

  const handleDrawerOpen = () => {
    props.setOpen(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, props.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Button
            className={classes.button}
            variant="contained" 
            color="secondary" 
            onClick={() => {props.history.push('/')}}
          >
            Go Back
          </Button>
          <Button
            className={classes.button}
            variant="contained" 
            color="primary" 
            onClick={handleClickOpen}
          >
            Save
          </Button>
        </div>
      </AppBar>
      <PaletteMetaForm
        openEmojiDialog={openEmojiDialog}
        handleClose={handleClose}
        open={open}
        palettes={props.palettes}
        savePalette={props.savePalette}
      />
    </div>
  );
}
