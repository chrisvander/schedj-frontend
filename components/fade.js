import React from 'react';
import { Animated } from 'react-native';

export default class Fade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillMount() {
    const { visible } = this.props;
    this.visibility = new Animated.Value(visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
    }
    Animated.timing(this.visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 300,
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  render() {
    const {
      visible, style, children, ...rest
    } = this.props;

    const containerStyle = {
      opacity: this.visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this.visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View style={visible ? combinedStyle : containerStyle} {...rest}>
        {visible ? children : null}
      </Animated.View>
    );
  }
}
