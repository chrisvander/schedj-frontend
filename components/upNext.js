import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import RoundedCard from './roundedCard.js';
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
	  	loading: true,
	  	visible: true
	  };
	}

	loadInfo() {
		var p = globals.get_next_class_info();
		if (p) p.then(resJson => {
			this.setState({ 
				loading: false, 
				className: resJson.name, 
				tags: [resJson.cl.location, resJson.cl.start_time] 
			});
		});
		else this.setState({ visible: false });
	}

	componentWillMount() {
		if (globals.SCHEDULE.loaded) this.loadInfo();
    else EventRegister.addEventListener('load_schedule', () => this.loadInfo());
	}

	render() {
		if (this.state.visible) 
			return (
				<RoundedCard style={this.state.loading ? {flexDirection: 'row', justifyContent: 'center'} : {}}>
					{this.state.className ?  
						<React.Fragment>
							<Text style={[styles.titleText]}>Up Next</Text>
							<Text style={[styles.classText]}>{this.state.className ? this.state.className : ''}</Text>
							<View style={[styles.tagContainer]}>
								{this.state.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
							</View> 
						</React.Fragment> : 
						<ActivityIndicator size={'large'}/> 
					}
				</RoundedCard>
			);
		else return (<React.Fragment />);
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
		alignSelf: 'stretch'
	},
	classText: {
		fontSize: FN(18),
		fontFamily: 'Arial',
		color: '#575757',
		paddingTop: FN(10)
	},
	tagContainer: {
		flexDirection: 'row',
		marginTop: 11
	},
	tag: {
		backgroundColor: '#EFEFEF',
		padding: FN(8),
		borderRadius: 10,
		marginRight: FN(8)
	},
	tagText: {
		color: '#6F9AAA',
		fontSize: FN(18),
		fontFamily: 'Arial',
		fontWeight: 'bold'
	}
});