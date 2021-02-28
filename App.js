import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, PanResponder, Animated, Dimensions } from 'react-native';
import ajax from './ajax'

class App extends Component {
  state = { 
              screens: [  {
                txt: 'Screen1',
                images: ['https://homepages.cae.wisc.edu/~ece533/images/airplane.png', 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png', 'https://homepages.cae.wisc.edu/~ece533/images/baboon.png'], 
              },

               {
                txt: 'Screen2',
                images: ['https://homepages.cae.wisc.edu/~ece533/images/watch.png', 'https://homepages.cae.wisc.edu/~ece533/images/zelda.png', 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png'], 
              },

              {
                txt: 'Screen3',
                images: ['https://homepages.cae.wisc.edu/~ece533/images/peppers.png', 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png', 'https://homepages.cae.wisc.edu/~ece533/images/serrano.png'], 
              },],
              
              imageIndexChild: 0,
              imageIndexParent: 0,
        }
  imageXPosChild = new Animated.Value(0);
  imageXPosParent = new Animated.Value(0);
  parentPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      console.log('Moving in parent')
      this.imageXPosParent.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      if(gs.dx > 0 ) { 
        this.handleSwipeParent(-1);
      }
      else {
        this.handleSwipeParent(1);
      }
      /*console.log('Parent Released')
      this.width = Dimensions.get('window').width;
      if(Math.abs(gs.dx) > this.width * 0.2 ) {
        const direction = Math.sign(gs.dx);
        //-1 fro swipe left && +1 for swipe right
        Animated.timing(this.imageXPosParent, {
            toValue: direction * this.width,
            duration: 250,
        }).start(() => {this.handleSwipeChild(-1*direction)});
    }
    else {
        Animated.spring(this.imageXPosParent, {
            toValue: 0,
        }).start();
    }*/
    //this.handleSwipeParent();
    }
  })
    

  childPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      console.log('Moving in child')
      this.imageXPosChild.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      console.log('child Released')
      if(gs.dx > 0 ) { 
        this.handleSwipeChild(-1);
      }
      else {
        this.handleSwipeChild(1);
      }
      /*this.width = Dimensions.get('window').width;
      if(Math.abs(gs.dx) > this.width * 0.2 ) {
          const direction = Math.sign(gs.dx);
          //-1 fro swipe left && +1 for swipe right
          Animated.timing(this.imageXPosChild, {
              toValue: direction * this.width,
              duration: 250,
          }).start(() => {this.handleSwipeChild(-1*direction)});
      }
      else {
          Animated.spring(this.imageXPosChild, {
              toValue: 0,
          }).start();
      }*/
    }
  })    

  handleSwipeChild = (indexDirection) => {
    /*if(!this.state.txt[this.state.imageIndexChild + indexDirection]){
      Animated.spring(this.imageXPosChild, {
          toValue: 0,

      }).start();
      return;
    }
    this.setState((prevState)=>({
      imageIndexChild: prevState.imageIndexChild + indexDirection
    }),() => {
        //Next Image animation
        this.imageXPosChild.setValue(indexDirection * this.width);
        Animated.spring(this.imageXPosChild, {
            toValue: 0,
        
        }).start();
    })*/
    console.log('In handlechild')
    console.log(indexDirection)
    this.setState({imageIndexChild: this.state.imageIndexChild + indexDirection})
    if(this.state.imageIndexChild + indexDirection>2){
      this.setState({imageIndexChild: 2});
    }
    if(this.state.imageIndexChild + indexDirection<0){
      this.setState({imageIndexChild: 0});
    }

  }

  handleSwipeParent = (indexDirection) => {
    console.log('In handleparent')
    console.log(indexDirection)
    this.setState({imageIndexParent: this.state.imageIndexParent + indexDirection})
    if(this.state.imageIndexParent + indexDirection>2){
      this.setState({imageIndexParent: 2});
    }
    if(this.state.imageIndexParent + indexDirection<0){
      this.setState({imageIndexParent: 0});
    }
  }
  //<Text style={styles.parentText}>{this.state.txtParent[this.state.imageIndexParent]}</Text>

  render() {
    return (
      <View style={styles.parent} {...this.parentPanResponder.panHandlers}>
        <Text style={styles.parentText}>{this.state.screens[this.state.imageIndexParent].txt}</Text>
        <Image style={styles.child} {...this.childPanResponder.panHandlers}
           source={{ uri: this.state.screens[this.state.imageIndexParent].images[this.state.imageIndexChild] }}/>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentText: {
    marginLeft: 110,
    fontWeight: 'bold',
    fontSize: 50,
  },
  parent: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'stretch',
  },
  child: {
    marginTop: 270,
    marginLeft: 100,
    height: 200,
    width: 250,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default App;
