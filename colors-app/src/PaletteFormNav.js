import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function PaletteFormNav(props) {
  const [paletteName, setPaletteName] = React.useState("");

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      return props.palettes.every(palette => palette.paletteName.toLowerCase() !== value.toLowerCase());
    });
  });

  const handleDrawerOpen = () => {
    props.setOpen(true);
  };

  const handlePaletteNameChange = event => {
    setPaletteName(event.target.value);
  }
 
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(props.classes.appBar, {
          [props.classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(props.classes.menuButton, props.open && props.classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={() => props.savePalette(paletteName)}>
            <TextValidator 
              value={paletteName}
              name="paletteName"
              label="Palette Name"
              onChange={handlePaletteNameChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter a Palette Name", "Palette Name Already Taken"]}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Save Palette
            </Button>
            <Button variant="contained" color="secondary" onClick={() => {props.history.push('/')}}>Go Back</Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  );
}
