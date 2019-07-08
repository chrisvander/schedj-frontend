import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { EventRegister } from 'react-native-event-listeners';
import * as Animatable from 'react-native-animatable';

const arrow = require('../assets/icons/downArrow.png');

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topMargin: Dimensions.get('window').height,
      drawerHeight: 800,
      safeAreaHeight: 0,
    };
  }

  componentWillMount() {
    const { expanded, expandedOffset } = this.props;
    const { event } = this.props;
    let { offset } = this.props;

    if (!offset) offset = 400;
    else if (offset === '100%') offset = Dimensions.get('window').height;
    else if (offset === '50%') offset = Dimensions.get('window').height / 2;
    this.offset = offset;
    if (expanded) offset = expandedOffset || 0;
    setTimeout(() => this.setState({ topMargin: offset }), 5);

    this.defaultVal = expandedOffset || 0;

    if (event) {
      EventRegister.addEventListener(event, () => this.setState({
        topMargin: expanded ? this.offset : this.defaultVal,
      }));
    }
  }

  componentWillUnmount() {
    const { event } = this.props;
    EventRegister.removeEventListener(event);
  }

  render() {
    const { children } = this.props;
    const { topMargin, drawerHeight, safeAreaHeight } = this.state;
    let expanded = false;
    if (topMargin === this.defaultVal) expanded = true;
    const elevate = children.shadowBefore || expanded;
    return (
      <SafeAreaView
        pointerEvents={expanded ? 'auto' : 'box-none'}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'transparent',
        }}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          if (drawerHeight !== this.defaultVal - height) {
            this.setState({
              drawerHeight: Dimensions.get('window').height - this.defaultVal,
              safeAreaHeight: height,
            });
          }
        }}
      >
        <Animatable.View
          duration={400}
          transition={['top', 'shadowOpacity']}
          style={{
            position: 'relative',
            top: topMargin,
            bottom: 0,
            left: 0,
            right: 0,
            height: drawerHeight,
            width: '100%',
            backgroundColor: 'white',
            shadowColor: '#000000',
            shadowOpacity: elevate ? 0.29 : 0.0,
            elevation: elevate ? 5 : 0,
            shadowRadius: 7,
            shadowOffset: {
              height: 1,
              width: 0,
            },
            borderRadius: 34,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ topMargin: expanded ? this.offset : this.defaultVal });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
            }}
          >
            <Image source={arrow} style={{ transform: [{ rotateX: expanded ? '0deg' : '180deg' }] }} />
          </TouchableOpacity>
          <Animatable.View
            duration={400}
            transition="height"
            style={{
              height: safeAreaHeight - topMargin - getBottomSpace() + getStatusBarHeight() - 80,
              overflow: 'visible',
            }}
          >
            {children}
          </Animatable.View>
        </Animatable.View>
      </SafeAreaView>
    );
  }
}
