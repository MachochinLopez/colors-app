import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export default function PaletteMetaForm(props) {
  const [paletteName, setPaletteName] = React.useState("");
  
  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      return props.palettes.every(palette => palette.paletteName.toLowerCase() !== value.toLowerCase());
    });
  });
  
  const handlePaletteNameChange = event => {
    setPaletteName(event.target.value);
  };

  const selectEmoji = emoji => {
    props.handleClose();
    
    const newPalette = {
      paletteName,
      emoji: emoji.native
    };

    props.savePalette(newPalette);
  };

  return (
    <div>
      <Dialog open={props.open === "emoji"} onClose={props.handleClose}>
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker title="Choose Emoji" onSelect={selectEmoji} />
      </Dialog>
      <Dialog open={props.open === "paletteName"} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={props.openEmojiDialog}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's unique!
            </DialogContentText>
            <TextValidator 
              autoFocus
              errorMessages={["Enter a Palette Name", "Palette Name Already Taken"]}
              fullWidth
              label="Palette Name"
              margin="normal"
              name="paletteName"
              onChange={handlePaletteNameChange}
              validators={["required", "isPaletteNameUnique"]}
              value={paletteName}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}