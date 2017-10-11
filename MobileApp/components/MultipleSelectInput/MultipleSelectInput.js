import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  UIManager,
  LayoutAnimation,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import reject from 'lodash/reject';
import find from 'lodash/find';
import IconMd from 'react-native-vector-icons/MaterialIcons';
import IconIon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZING } from "../../styles";
import Dimensions from 'Dimensions';

var {height, width} = Dimensions.get('window');

// set UIManager LayoutAnimationEnabledExperimental
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const colorPack = {
  primary: '#00A5FF',
  primaryDark: '#215191',
  light: '#FFF',
  textPrimary: '#525966',
  placeholderTextColor: '#A9A9A9',
  danger: '#C62828',
  borderColor: '#e9e9e9',
  backgroundColor: '#fff',
};


export default class MultiSelect extends Component {
  static propTypes = {
    single: PropTypes.bool,
    selectedItems: PropTypes.array,
    items: PropTypes.array.isRequired,
    uniqueKey: PropTypes.string,
    tagBorderColor: PropTypes.string,
    tagTextColor: PropTypes.string,
    fontFamily: PropTypes.string,
    tagRemoveIconColor: PropTypes.string,
    onSelectedItemsChange: PropTypes.func.isRequired,
    selectedItemFontFamily: PropTypes.string,
    selectedItemTextColor: PropTypes.string,
    itemFontFamily: PropTypes.string,
    itemTextColor: PropTypes.string,
    selectedItemIconColor: PropTypes.string,
    searchInputPlaceholderText: PropTypes.string,
    searchInputStyle: PropTypes.object,
    selectText: PropTypes.string,
    altFontFamily: PropTypes.string,
    submitButtonColor: PropTypes.string,
    submitButtonText: PropTypes.string,
    textColor: PropTypes.string,
    fontSize: PropTypes.number,
    fixedHeight: PropTypes.bool,
  };

  static defaultProps = {
    single: false,
    selectedItems: [],
    items: [],
    uniqueKey: '_id',
    tagBorderColor: colorPack.primary,
    tagTextColor: colorPack.primary,
    fontFamily: '',
    tagRemoveIconColor: colorPack.danger,
    onSelectedItemsChange: () => {},
    selectedItemFontFamily: '',
    selectedItemTextColor: colorPack.primary,
    itemFontFamily: '',
    itemTextColor: colorPack.textPrimary,
    selectedItemIconColor: colorPack.primary,
    searchInputPlaceholderText: 'Search',
    searchInputStyle: { color: colorPack.textPrimary },
    textColor: colorPack.textPrimary,
    selectText: 'Select',
    altFontFamily: '',
    submitButtonColor: '#CCC',
    submitButtonText: 'Submit',
    fontSize: 14,
    fixedHeight: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      selector: false,
      searchTerm: '',
      selectedItems: this.props.selectedItems,
      items: this.props.items,
    };
  }

  _getSelectLabel = () => {
    const { selectText, single } = this.props;
    const { selectedItems } = this.state;
    if (!selectedItems || selectedItems.length === 0) {
      return selectText;
    } else if (single) {
      const item = selectedItems[0];
      return item.name;
    }
    return `${selectText} (${selectedItems.length} selected)`;
  };

  _displaySelectedItems = () => {
    const {
      fontFamily,
      tagRemoveIconColor,
      tagBorderColor,
      uniqueKey,
      tagTextColor,
    } = this.props;
    const { selectedItems } = this.state;
    return [...selectedItems].map(item => (
      <View
        style={{
            width: item.name.length * 8 + 60,
            justifyContent: 'center',
            height: 40,
            borderColor: tagBorderColor,
          }}
        key={item[uniqueKey]}
      >
        <Text
          style={[
            {
              flex: 1,
              color: tagTextColor,
              fontSize: 15,
            },
            fontFamily ? { fontFamily } : {},
          ]}
        >
          {item.name}
        </Text>
        <TouchableOpacity onPress={() => { this._removeItem(item); }}>
          <IconMd
            name="cancel"
            style={{
              color: tagRemoveIconColor,
              fontSize: 22,
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
      </View>
    ));
  };

  _removeItem = (item) => {
    const { uniqueKey, onSelectedItemsChange } = this.props;
    const { selectedItems } = this.state;
    const newItems = reject([...selectedItems], singleItem => (
      item[uniqueKey] === singleItem[uniqueKey]
    ));
    this.setState({
      selectedItems: newItems,
    });
    // broadcast new selected items state to parent component
    onSelectedItemsChange(newItems);
  };

  _removeAllItems = () => {
    const { onSelectedItemsChange } = this.props;
    this.setState({
      selectedItems: [],
    });
    onSelectedItemsChange([]);
  };

  _toggleSelector = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      selector: !this.state.selector,
    });
  };

  _submitSelection = () => {
    const { onSelectedItemsChange } = this.props;
    this._toggleSelector();
    // reset searchTerm
    this.setState({ searchTerm: '' });
    // broadcast selected items state to parent component
    onSelectedItemsChange([...this.state.selectedItems]);
  };

  _itemSelected = (item) => {
    const { uniqueKey } = this.props;
    return (
      !!find(this.state.selectedItems, singleItem => (
        item[uniqueKey] === singleItem[uniqueKey]
      ))
    );
  }

  _toggleItem = (item) => {
    const { single, uniqueKey } = this.props;
    if (single) {
      this.setState({
        selectedItems: [item],
      }, this._submitSelection);
    } else {
      const selectedItems = [...this.state.selectedItems];
      const status = this._itemSelected(item);
      let newItems = [];
      if (status) {
        newItems = reject(selectedItems, singleItem => (
          item[uniqueKey] === singleItem[uniqueKey]
        ));
      } else {
        selectedItems.push(item);
      }
      this.setState({
        selectedItems: status ? newItems : selectedItems,
      });
    }
  };

  _itemStyle = (item) => {
    const {
      selectedItemFontFamily,
      selectedItemTextColor,
      itemFontFamily,
      itemTextColor,
    } = this.props;
    const isSelected = this._itemSelected(item);
    const fontFamily = {};
    if (isSelected && selectedItemFontFamily) {
      fontFamily.fontFamily = selectedItemFontFamily;
    } else if (!isSelected && itemFontFamily) {
      fontFamily.fontFamily = itemFontFamily;
    }
    const color = isSelected ? { color: selectedItemTextColor } : { color: itemTextColor };
    return {
      ...fontFamily,
      ...color,
    };
  };

  _getRow = (item) => {
    const { selectedItemIconColor } = this.props;
    return (
      <TouchableOpacity
        onPress={() => this._toggleItem(item)}
        style={{ paddingLeft: SIZING.mediumGutter, paddingRight: SIZING.mediumGutter }}
      >
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                {
                  flex: 1,
                  fontSize: 20,
                  paddingTop: 5,
                  paddingBottom: 5,
                },
                this._itemStyle(item),
              ]}
            >
              {item.name}
            </Text>
            {
              this._itemSelected(item) ?
                <IconIon
                  name="ios-checkmark-outline"
                  size={24}
                  style={{
                    fontSize: 20,
                    color: selectedItemIconColor,
                  }}
                /> :
                null
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _filterItems = (searchTerm) => {
    const items = [...this.state.items];
    const filteredItems = [];
    items.forEach((item) => {
      const parts = searchTerm.trim().split(/[ \-:]+/);
      const regex = new RegExp(`(${parts.join('|')})`, 'ig');
      if (regex.test(item.name)) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  };

  _renderItems = () => {
    const { fontFamily, uniqueKey } = this.props;
    const { selectedItems } = this.state;
    let items;
    let component = null;
    const searchTerm = this.state.searchTerm.trim();
    if (searchTerm) {
      items = this._filterItems(searchTerm);
    } else {
      items = this.state.items;
    }
    if (items.length) {
      component = (
        <FlatList
          data={items}
          extraData={selectedItems}
          keyExtractor={item => item[uniqueKey]}
          renderItem={rowData => this._getRow(rowData.item)}

        />
      );
    } else {
      component = (
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text
            style={[
              {
                flex: 1,
                marginTop: 20,
                textAlign: 'center',
                color: colorPack.danger,
              },
              fontFamily ? { fontFamily } : {},
            ]}
          >
            No item to display.
          </Text>
        </View>
      );
    }
    return component;
  };

  render() {
    const {
      single,
      fontFamily,
      altFontFamily,
      searchInputPlaceholderText,
      searchInputStyle,
      submitButtonColor,
      submitButtonText,
      fontSize,
      textColor,
      fixedHeight,
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginBottom: 10,
          height: height - 200
        }}
      >
        {
          this.state.selector
          ?
            <View>
              <View>
                <View
                  style={{
                    marginLeft: SIZING.mediumGutter,
                    paddingLeft: 0,
                    marginRight: SIZING.mediumGutter,
                    backgroundColor: colorPack.light,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <TextInput
                    autoFocus={true}
                    onChangeText={searchTerm => this.setState({ searchTerm })}
                    placeholder={searchInputPlaceholderText}
                    placeholderTextColor={colorPack.placeholderTextColor}
                    style={{
                      marginLeft: 0,
                      paddingLeft: 0,
                      marginRight: 0,
                      paddingRight: 0,
                      fontSize: 20
                    }}
                  />
                  <IconIon
                    name="ios-search-outline"
                    size={24}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  height: height - 150
                }}
              >
                <View style={{
                  paddingTop: 10,
                  height: height - 150
                }}>
                  {this._renderItems()}
                </View>
                {
                  !single &&
                  <TouchableOpacity
                    onPress={() => this._submitSelection()}
                    style={{ backgroundColor: submitButtonColor }}
                  >
                    <Text
                      style={[ fontFamily ? { fontFamily } : {}]}
                    >
                      {submitButtonText}
                    </Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
            :
            <View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#e8e8e8', marginLeft: SIZING.mediumGutter, marginTop: SIZING.mediumGutter, marginRight: SIZING.mediumGutter, paddingBottom: SIZING.mediumGutter}}>
                <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <TouchableWithoutFeedback onPress={this._toggleSelector}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={[
                          {
                            flex: 1,
                            fontSize: 20,
                            color:  textColor || colorPack.placeholderTextColor,

                          },
                          altFontFamily ? { fontFamily: altFontFamily } : fontFamily ? { fontFamily } : {},
                        ]}
                      >
                        {this._getSelectLabel()}
                      </Text>
                      <IconIon
                        name="ios-arrow-down-outline"
                        size={24}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              {
                (!single && this.state.selectedItems.length) ?
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
                  >
                    {this._displaySelectedItems()}
                  </View>
                  :
                  null
              }
            </View>
        }
      </View>
    );
  }
}
