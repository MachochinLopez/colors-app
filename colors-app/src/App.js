import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = React.useState(savedPalettes || seedColors);
  
  const findPalette = id => {
    return palettes.find(palette => {
      return palette.id === id;
    });
  };

  const savePalette = newPalette => {
    setPalettes([...palettes, newPalette]);
  };

  const deletePalette = id => {
    setPalettes(palettes.filter(palette => palette.id !== id));
  };

  React.useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  return (
    <Switch>
    <Route
      exact
      path="/palette/new"
      render={(routeProps) => <NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} />}
    />
      <Route 
        exact
        path="/palette/:id"
        render={routeProps => { 
          const { id } = routeProps.match.params;
          return <Palette palette={ generatePalette(findPalette(id)) } />}
        }
      />
      <Route 
        exact
        path="/palette/:paletteId/:colorId"
        render={routeProps => { 
          const { paletteId } = routeProps.match.params;
          return <SingleColorPalette 
            palette={ generatePalette( findPalette(paletteId) ) } 
            colorId={routeProps.match.params.colorId}
          />}
        }
      />
      <Route 
        exact
        path="/"
        render={routeProps => <PaletteList deletePalette={deletePalette} palettes={palettes} {...routeProps} />}
      />
    </Switch>
  );
}

export default App;
