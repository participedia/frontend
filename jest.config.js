module.exports = {
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  globals: {
    fetch: true,
    REACT_APP_API_URL: "http://localhost:3000"
  }
};
