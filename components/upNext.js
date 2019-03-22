import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import RoundedCard from './roundedCard.js';
import CardAnimated from './cardAnimated.js';
import { EventRegister } from 'react-native-event-listeners';
import { FN } from '../styles';
import globals from '../globals';

class Tag extends React.Component {
	render() {
		return (
			<View style={[styles.tag]}>
				<Text style={[styles.tagText]}>{this.props.children}</Text>
			</View>
		);
	}
} 

export default class UpNext extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	className: '',
	  	tags: [],
	  	loading: true
	  };
	}

	loadInfo() {
		var p = globals.get_next_class_info();
		if (p) p.then(resJson => {
			console.log(resJson)
			this.setState({ loading: false, className: resJson });
		});
	}

	componentWillMount() {
		if (globals.SCHEDULE.loaded) this.loadInfo();
    else {
      EventRegister.addEventListener('load_schedule', (data) => {
        this.loadInfo();
      });
    }
	}

	render() {
		return (
			<CardAnimated>
				<RoundedCard>
					<Text style={[styles.titleText]}>Up Next</Text>
					<Text style={[styles.classText]}>Research Methods and Statistics I</Text>
					<View style={[styles.tagContainer]}>
						<Tag>Tag1</Tag>
					</View>
				</RoundedCard>
			</CardAnimated>
		);
	}
}

export class UpNextOverlay extends React.Component {
	render() {
		return (
			<View style={[styles.overlay]}>
				<TouchableOpacity>
					<Text> Press </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export class ClassCard extends React.Component {
	render() {
		return (
			<View>
				<Text>hi</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		height: 400,
		width: '100%',
		backgroundColor: 'white',
		bottom: 0 
	},
	titleText: {
		fontSize: FN(26),
		fontWeight: 'bold',

	},
	classText: {
		fontSize: FN(18),
		fontFamily: 'Arial',
		color: '#575757',
		paddingTop: FN(10)
	},
	tagContainer: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 11
	},
	tag: {
		backgroundColor: '#EFEFEF',
		padding: FN(8),
		borderRadius: 10
	},
	tagText: {
		color: '#6F9AAA',
		fontSize: FN(18),
		fontFamily: 'Arial',
		fontWeight: 'bold',
	}
});