import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
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
      <Route exact path="/" render={routeProps => <PaletteList palettes={seedColors} {...routeProps} />} />
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
        render={() => <h1>SINGLE COLOR</h1>}
      />
    </Switch>
    // <div>
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;
