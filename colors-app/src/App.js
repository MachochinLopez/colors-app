import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';

const findPalette = id => {
  return seedColors.find(palette => {
    return palette.id === id;
  });
};

function App() {
  return (
    <Switch>
    <Route
      exact
      path="/palette/new"
      render={() => <NewPaletteForm />}
    />
      <Route 
        exact
        path="/palette/:id"
        render={routeProps => { 
          const { id } = routeProps.match.params;
          return <Palette palette={ generatePalette( findPalette(id) ) } />}
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
        render={routeProps => <PaletteList palettes={seedColors} {...routeProps} />}
      />
    </Switch>
    // <div>
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;
