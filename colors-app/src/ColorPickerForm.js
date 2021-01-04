import React from 'react';
// Material UI
import Button from '@material-ui/core/Button';
// Color Picker
import { ChromePicker } from 'react-color';
// Form Validator
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styles from './styles/ColorPickerFormStyles';
import { withStyles } from '@material-ui/core/styles';

export default withStyles(styles)(function ColorPickerForm(props) {
  
  /***************
   *    STATE    *
   ***************/

  const [background, setBackground] = React.useState("");
  const [colorName, setColorName] = React.useState("");
  
  /**************************
   *    VALIDATION RULES    *
   **************************/

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', value => {
      return props.colors.every(color => color.name.toLowerCase() !== value.toLowerCase());
    });
    ValidatorForm.addValidationRule('isColorUnique', value => {
      return props.colors.every(color => color.color !== background);
    });
  });

  /*******************
   *    FUNCTIONS    *
   *******************/

  const handleChangeComplete = color => {
    setBackground(color.hex);
  };

  const handleColorNameChange = event => {
    setColorName(event.target.value);
  }

  /**
   * Añade el color a la lista de la paleta.
   */
  const handleSubmit = () => {
    const newColor = {
      color: background,
      name: colorName
    };
    props.addNewColor(newColor);
    setColorName("");
  }

  /****************
   *    RENDER    *
   ****************/

  return (
    <div className={props.classes.root}>
      <ChromePicker 
        color={background}
        onChangeComplete={handleChangeComplete}
        className={props.classes.picker}
      />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          className={props.classes.colorNameInput}
          value={colorName}
          name="colorName"
          label="Color Name"
          onChange={handleColorNameChange}
          validators={[
            'required',
            'isColorNameUnique',
            'isColorUnique'
          ]}
          errorMessages={[
            'Enter a color name',
            'Color name must be unique',
            'Color already used'
          ]}
          variant="filled"
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          style={{backgroundColor: props.paletteIsFull ? "grey ": background}}
          type="submit"
          disabled={props.paletteIsFull}
          className={props.classes.addColor}
        >
          {props.paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
});