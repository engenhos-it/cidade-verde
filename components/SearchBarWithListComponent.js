import React, { Component } from 'react'
import { Text, View, Platform, StyleSheet } from 'react-native'
import { SearchBar, Icon, Button, ListItem } from 'react-native-elements'

export default class SearchBarWithListComponent extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data || [],
            search: '',
            filteredList: [],
            filterProperty: this.props.filterProperty,
            listItemKeyProp: this.props.listItemKeyProp,
            listItemTitleProp: this.props.listItemTitleProp,
            onPressCallBack: this.props.onPressCallBack
        }        
    }

    updateSearch = search => {        
        const { filterProperty, data } = this.state        
        const filteredList = data.filter(item =>  search !== '' && item[filterProperty].toUpperCase().includes(search.toUpperCase()))
        this.setState({ search, filteredList });            
    };

    onListItemPressed = (item) => {
        const { onPressCallBack, filterProperty} = this.state;

        onPressCallBack(item);
        this.searchBar.blur();        
        this.setState(
        {
            search: item[filterProperty],
            filteredList : []
        });                                                           
    }

    renderListItem = item =>(<ListItem key={item[this.state.listItemKeyProp]}
                                        title={item[this.state.listItemTitleProp]}
                                        onPress={() => this.onListItemPressed(item)}/>)    

    render() {    
        return (
            <View style={styles.searchBarContainer} >
                <SearchBar 
                    ref={searchBar => this.searchBar = searchBar}                       
                    platform={Platform.OS}
                    placeholder={this.props.placeholder}
                    onChangeText={this.updateSearch}
                    value={this.state.search}   />
                {this.state.filteredList.map(item => this.renderListItem(item))}                        
            </View>               
        )
  }
}

const styles = StyleSheet.create({    
    searchBarContainer : {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0
      } 
})