import "isomorphic-fetch";
require("mock-local-storage");

global.navigator = {
  userAgent: "Mozillal"
};
global.Image = window.Image;

process.on("unhandledRejection", function(reason, p) {
  console.log(
    "Possibly Unhandled Rejection at: Promise ",
    p,
    " reason: ",
    reason
  );
  // application specific logging here
});
