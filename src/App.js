import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Component from "@reactions/component";
import GridLayout from "react-grid-layout";

let save = (k, v) => (localStorage[k] = JSON.stringify(v));

let { Provider, Consumer } = React.createContext();

/*
  - should persist. (https://jsonbin.io/)
  - should work offline (localStorage)
*/

const JSON_BIN_ID = "5af1893b60ee75553094f4e3";

let getStateFromInterwebs = () =>
  fetch(`https://api.jsonbin.io/b/${JSON_BIN_ID}`).then(r => r.json());

let State = props => (
  <Component
    initialState={{ layoutz: {}, loading: true }}
    didMount={async ({ setState }) => {
      let layoutz = await getStateFromInterwebs();
      setState({ layoutz, loading: false });
    }}
  >
    {({ state }) => <Provider {...props} value={state} />}
  </Component>
);

export default () => (
  <BrowserRouter>
    <>
      <Route exact path="/" render={() => <div>Welcome to layoutland</div>} />
      <Route
        path="/:id"
        render={() => (
          <State>
            <Consumer>
              {({ layoutz, loading }) =>
                loading ? "loadin" : <div>{JSON.stringify(layoutz)}</div>
              }
            </Consumer>
          </State>
        )}
      />
    </>
  </BrowserRouter>
);

//
// let Grid = () => (
//   <Provider
//     value={{
//       layoutz:
//     }}
//   >
//     <Consumer>
//       {layout => (
//         <GridLayout
//           className="layout"
//           layout={layout}
//           cols={12}
//           rowHeight={30}
//           width={1200}
//           onLayoutChange={x => save("LAYOUT", x)}
//         >
//           <div key="a">a</div>
//           <div key="b">b</div>
//           <div key="c">c</div>
//         </GridLayout>
//       )}
//     </Consumer>
//   </Provider>
// );
