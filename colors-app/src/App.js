import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';

function App() {
  const [palettes, setPalettes] = React.useState(seedColors);
  
  const findPalette = id => {
    return palettes.find(palette => {
      return palette.id === id;
    });
  };
  
  const savePalette = newPalette => {
    setPalettes([...palettes, newPalette]);
  };

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
        render={routeProps => <PaletteList palettes={palettes} {...routeProps} />}
      />
    </Switch>
    // <div>
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;
