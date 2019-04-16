import React from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { LargeNavBar, UpNext, RoundedCard } from '../components';
import { EventRegister } from 'react-native-event-listeners';
import { Col, Row, Grid } from "react-native-easy-grid";
import globals from "../globals.js";

export default class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      schedule: null
    }
  }

  componentWillMount() {
    if (globals.SCHEDULE.loaded) 
      this.setState({ loading: false, schedule: globals.SCHEDULE });
    else {
      EventRegister.addEventListener('load_schedule', (data) => {
        this.setState({ loading: false, schedule: data });
      });
    }
  }

  loading() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  render() {
    var hours = ['8am','9am','10am','11am','12pm'];
    for (var i=1; i<10; i++) hours.push(i + 'pm');
    var weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
    const clinfo = this.state.schedule.clinfo;
    return (
    	<React.Fragment>
        <LargeNavBar title={'Schedule'} gearHidden={true}/>
        {this.state.loading && this.loading()}
	      {!this.state.loading &&
          <SafeAreaView> 
            <Grid>
              <Row style={{ backgroundColor: '#F0F8FF', height: 300 }}>
                <Col style={{ width: 60 }}>
                  <Row size={1}></Row>
                  {hours.map((obj, i) => 
                    <Row size={2} key={i} style={{ 
                        flexDirection: 'column', 
                        alignItems: 'flex-end',
                        color: '#333333',
                        paddingRight: 5
                    }}>
                      <Text>{obj}</Text>
                    </Row>
                  )}
                  <Row size={1}></Row>
                </Col>
                <Col>
                  <ScrollView horizontal={true}>
                    <Grid style={{ 
                      width: 700, 
                      height: 400, 
                      backgroundColor: '#EFEFEF' 
                    }}>
                      {weekdays.map((obj, i) => 
                        <Col key={i}>
                          <Row size={1}>
                            <Text>{obj}</Text>
                          </Row>
                          {hours.map((obj,i) => 
                            <Row size={2} key={i} style={{
                              borderTopColor: '#BBBBBB',
                              borderTopWidth: 1
                            }}></Row>
                          )}
                        </Col>
                      )}
                    </Grid>
                  </ScrollView>
                </Col>
              </Row>
              <Row>
                
              </Row>
            </Grid>
          </SafeAreaView>
        }
      </React.Fragment>
    );
  }
}