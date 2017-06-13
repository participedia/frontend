import { render, unmountComponentAtNode } from "react-dom";
import React from "react";
import renderer from "react-test-renderer";
import { Route, MemoryRouter } from "react-router-dom";

import { IntlProvider } from "react-intl";
import { getBestMatchingMessages } from "../utils/l10n";

import searchData from "./search.json";
import countryData from "./country_data.json";

import afterPromises from "../helpers/afterPromises";

import App from "../App";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
const muiTheme = getMuiTheme({});

let fetchMock = require("fetch-mock");
jest.mock("../containers/Map", () => "Map");

fetchMock.get(
  process.env.REACT_APP_API_URL + "/search?page=1",
  JSON.stringify({ data: searchData })
);
fetchMock.get(
  process.env.REACT_APP_API_URL + "/case/countsByCountry",
  JSON.stringify(countryData)
);

// a way to render any part of your app inside a MemoryRouter
// you pass it a list of steps to execute when the location
// changes, it will call back to you with stuff like
// `match` and `location`, and `history` so you can control
// the flow and make assertions.
const renderTestSequence = ({
  initialEntries,
  initialIndex,
  subject: Subject,
  steps
}) => {
  const div = document.createElement("div");
  class Assert extends React.Component {
    componentDidMount() {
      this.assert();
    }
    componentDidUpdate() {
      this.assert();
    }
    assert() {
      const nextStep = steps.shift();
      if (nextStep) {
        nextStep({ ...this.props, div });
      } else {
        unmountComponentAtNode(div);
      }
    }
    render() {
      return this.props.children;
    }
  }
  class Test extends React.Component {
    render() {
      return (
        <MemoryRouter
          initialIndex={initialIndex}
          initialEntries={initialEntries}
        >
          <Route
            render={props =>
              <Assert {...props}>
                <Subject />
              </Assert>}
          />
        </MemoryRouter>
      );
    }
  }
  render(<Test />, div);
};

const MyProvider = () => <App />;
// the actual test!
it.skip("navigates around", done => {
  try {
    afterPromises(done, () => {
      renderTestSequence({
        // tell it the subject you're testing
        subject: MyProvider,
        // and the steps to execute each time the location changes
        steps: [
          // initial render
          ({ history, div }) => {
            // assert the screen says what we think it should
            expect(div.innerHTML).toContain("Participedia");
          }
        ]
      });
    });
  } finally {
    console.log(fetchMock.calls("*"));
  }
});

jest.mock("react-mapbox-gl", () => ({
  Layer: "foo",
  Feature: "foo",
  Popup: "foo",
  ZoomControl: "foo",
  Map: "foo"
}));
fetchMock.get(
  process.env.REACT_APP_API_URL + "/search?selectedCategory=All",
  JSON.stringify(searchData)
);

import mapData from "./map_data.json";

fetchMock.get(
  process.env.REACT_APP_API_URL + "/search/map",
  JSON.stringify(mapData)
);

// chasing dots generates random animation names for some reason, not good for snapshotting.
jest.mock("better-react-spinkit", () => ({
  ChasingDots: "ChasingDots"
}));

jest.mock("material-ui/MenuItem/MenuItem");
let locale = "en-US";
let messages = getBestMatchingMessages(locale);

test("App", () => {
  const tree = renderer
    .create(
      <IntlProvider locale={locale} messages={messages}>
        <MemoryRouter>
          <MuiThemeProvider muiTheme={muiTheme}>
            <App />
          </MuiThemeProvider>
        </MemoryRouter>
      </IntlProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Searching for a word", () => {
  const tree = renderer
    .create(
      <IntlProvider locale={locale} messages={messages}>
        <MemoryRouter initialEntries={["/search?query=france"]}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <App />
          </MuiThemeProvider>
        </MemoryRouter>
      </IntlProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
