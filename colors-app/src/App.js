import React from 'react';
// Third Party.
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Switch } from 'react-router-dom';
// Components
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
// Helpers
import { generatePalette } from './colorHelpers';
import seedColors from './seedColors';

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
    <Route render={({location}) => {
      return (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={(routeProps) => {
                  return (
                    <Page>
                      <NewPaletteForm
                        savePalette={savePalette}
                        palettes={palettes}
                        {...routeProps}
                      />
                    </Page>
                  );
                }}
              />
              <Route 
                exact
                path="/palette/:id"
                render={routeProps => { 
                  const { id } = routeProps.match.params;
                  return (
                    <Page>
                      <Palette 
                        palette={ generatePalette(findPalette(id)) }
                      />
                    </Page>
                  );
                }}
              />
              <Route 
                exact
                path="/palette/:paletteId/:colorId"
                render={routeProps => { 
                  const { paletteId, colorId } = routeProps.match.params;
                  return (
                    <Page>
                      <SingleColorPalette 
                        palette={ generatePalette( findPalette(paletteId) ) } 
                        colorId={colorId}
                      />
                    </Page>
                  );
                }}
              />
              <Route 
                exact
                path="/"
                render={routeProps => {
                  return (
                    <Page>
                      <PaletteList
                        deletePalette={deletePalette}
                        palettes={palettes}
                        {...routeProps}
                      />
                    </Page>
                  );
                }}
              />
              <Route render={routeProps => {
                  return (
                    <Page>
                      <PaletteList
                        deletePalette={deletePalette}
                        palettes={palettes}
                        {...routeProps}
                      />
                    </Page>
                  );
                }} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      );
    }}/>
  );
}

export default App;
