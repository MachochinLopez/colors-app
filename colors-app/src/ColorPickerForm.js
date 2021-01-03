import React from 'react';
// Material UI
import Button from '@material-ui/core/Button';
// Color Picker
import { ChromePicker } from 'react-color';
// Form Validator
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function ColorPickerForm(props) {
  
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
    <div>
      <ChromePicker 
          color={background}
          onChangeComplete={handleChangeComplete}
        />
        <ValidatorForm onSubmit={handleSubmit}>
          <TextValidator
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
          />
          <Button
            variant="contained"
            color="primary"
            style={{backgroundColor: props.paletteIsFull ? "grey ": background}}
            type="submit"
            disabled={props.paletteIsFull}
          >
            {props.paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
    </div>
  );
}