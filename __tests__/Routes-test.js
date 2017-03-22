import { render, unmountComponentAtNode } from "react-dom";
import React from "react";
import { Route, MemoryRouter } from "react-router-dom";
import { Simulate } from "react-addons-test-utils";
import { Provider } from "react-redux";
import searchData from "./search_data.json";
import countryData from "./country_data.json";
import afterPromises from "../src/helpers/afterPromises";
import App from "../src/App";

let fetchMock = require("fetch-mock");
import configureStore from "../src/configureStore";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

let store = configureStore();
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
it("navigates around", done => {
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
            // now we can imperatively navigate as the test
            //   Simulate.click(div.querySelector(".menu-icon"), {
            //     button: 0
            //   });
            //   // history.push("/dashboard");
            // },
            // // second render from same location (after click)
            // ({ div }) => {
            //   expect(div.innerHTML).toContain("Add New");
            //   //   console.log(div.innerHTML);
            //   //   console.assert(div.innerHTML.match(/Dashboard/));
            //   //   // or we can simulate clicks on Links instead of
            //   //   // using history.push
            //   Simulate.click(div.querySelector(".menu-icon"), {
            //     button: 0
            //   });
            // },
            // // final render
            // ({ location }) => {
            //   expect(div.innerHTML).toNotContain("Add New");

            //   //   console.assert(location.pathname === "/");
            //   //   // you'll want something like `done()` so your test
            //   //   // fails if you never make it here.
            //   done();
          }
        ]
      });
    });
  } finally {
    console.log(fetchMock.calls("*"));
  }
});
