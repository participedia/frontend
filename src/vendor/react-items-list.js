const react = require("react"),
  muiTextField = require("material-ui/TextField").default,
  getMuiTheme = require("material-ui/styles/getMuiTheme").default,
  themeProvider = require("material-ui/styles/MuiThemeProvider").default,
  muiIconButton = require("material-ui/IconButton").default,
  addSVG = require("material-ui/svg-icons/av/playlist-add.js").default,
  removeSVG = require("material-ui/svg-icons/action/delete.js").default,
  colors = require("material-ui/styles/colors.js"),
  icons = { add: addSVG, remove: removeSVG },
  noop = () => {},
  listClass = react.createClass({
    displayName: "react-items-list",
    propTypes: {
      onAdd: react.PropTypes.func,
      onUpdate: react.PropTypes.func,
      onRemove: react.PropTypes.func,
      items: react.PropTypes.array
    },

    getDefaultProps() {
      return { items: [], onAdd: noop, onUpdate: noop, onRemove: noop };
    },

    getInitialState() {
      return {
        items: this.stateItemsFromProps(this.props),
        // placeholder: props.placeholder,
        lastItemValue: ""
      };
    },

    stateItemsFromProps(props) {
      console.log(props,'props')
      return props.items.map(item => {
        return {
          value: item,
          dirty: false
        };
      });
    },

    componentWillReceiveProps(nextProps) {
      this.setState({ items: this.stateItemsFromProps(nextProps) });
    },

    componentDidMount() {
      // this.newItemRef.focus();
    },

    addItem() {
      this.props.onAdd(this.state.lastItemValue);
      let items = Array.from(this.state.items);

      this.setState(
        {
          items: items.concat({
            value: this.state.lastItemValue,
            dirty: false
          }),
          lastItemValue: ""
        },
        () => {
          return this.newItemRef && this.newItemRef.focus();
        }
      );
    },

    updateItem(idx, text) {
      this.props.onUpdate(idx, this.state.items[idx].value);

      let items = Array.from(this.state.items);
      items[idx].dirty = false;

      this.setState(items);
    },

    removeItem(idx) {
      this.props.onRemove(idx);
      let items = Array.from(this.state.items);
      items.splice(idx, 1);
      this.setState({ items });
    },

    handleEdit(idx, e) {
      let items = Array.from(this.state.items);
      if (idx === items.length) {
        return this.setState({ lastItemValue: e.currentTarget.value });
      }

      items.splice(idx, 1, { value: e.currentTarget.value, dirty: true });
      this.setState({ items });
    },

    setEditColor(idx) {
      return this.state.items[idx].dirty
        ? { color: colors.orange500 }
        : { color: colors.darkBlack };
    },

    render() {
      let listItems = this.state.items.concat("").map((item, idx) => {
        let newItem = idx === this.state.items.length;

        return react.DOM.div(
          { key: idx },
          react.createElement(muiTextField, {
            name: newItem ? "newItem" : "propsProvidedItem",
            ref: newItem
              ? ref => {
                  this.newItemRef = ref;
                }
              : "",
            value: newItem ? this.state.lastItemValue : item.value,
            placeholder: this.props.placeholder,
            inputStyle: newItem
              ? { color: colors.darkBlack }
              : this.setEditColor(idx),
            onChange: this.handleEdit.bind(this, idx),
            onKeyUp: e => {
              if (e.key === "Enter") {
                if (newItem) {
                  return this.addItem();
                }
                this.updateItem(idx);
              }
            }
          }),
          react.createElement(
            muiIconButton,
            {
              onClick: newItem ? this.addItem : this.removeItem.bind(this, idx)
            },
            react.createElement(newItem ? icons.add : icons.remove),
          ),
          newItem ?
          // xx
          react.createElement("span", { onClick: this.addItem, className: "prompt" }, this.props.prompt)
          :
          undefined
        );
      });

      return react.createElement(
        themeProvider,
        { muiTheme: getMuiTheme() },
        react.DOM.div({}, listItems)
      );
    }
  });

module.exports = listClass;
