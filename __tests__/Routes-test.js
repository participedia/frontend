import { render, unmountComponentAtNode } from "react-dom";
import React from "react";
import { Route, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import searchData from "./search_data.json";
import countryData from "./country_data.json";
import afterPromises from "../src/helpers/afterPromises";
import App from "../src/App";

let fetchMock = require("fetch-mock");
import store from "../src/store";

fetchMock.get(
  process.env.REACT_APP_API_URL +
    "/search?query=&selectedCategory=All&sortingMethod=chronological",
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
const renderTestSequence = (
  {
    initialEntries,
    initialIndex,
    subject: Subject,
    steps
  }
) => {
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
            render={props => (
              <Assert {...props}>
                <Subject />
              </Assert>
            )}
          />
        </MemoryRouter>
      );
    }
  }
  render(<Test />, div);
};

const MyProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
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
