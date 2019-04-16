import React from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { LargeNavBar, UpNext, RoundedCard } from '../components';
import { EventRegister } from 'react-native-event-listeners';
import { Col, Row, Grid } from "react-native-easy-grid";
import { FN } from "../styles";
import moment from "moment";
import globals from "../globals.js";

var hoursArr = ['8 AM','9 AM','10 AM','11 AM','12 PM'];
for (var i=1; i<10; i++) hoursArr.push(i + ' PM');
const weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday'];

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
      this.setState({ 
        loading: false, 
        schedule: globals.SCHEDULE
      });
    else {
      EventRegister.addEventListener('load_schedule', (data) => {
        this.setState({ 
          loading: false, 
          schedule: data 
        });
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

  generateDayCol(dayCl, i) {
      var classes = [];
      for (var j in hoursArr) {
        classes.push(
          <Row size={2} key={j} style={{
            borderTopColor: '#CCCCCC',
            borderTopWidth: 1
          }}><Text></Text></Row>
        );
      }
      return classes;
  }

  render() {
    const clinfo = this.state.schedule.clinfo;
    const table = weekdays.map((weekday, i) => this.generateDayCol(clinfo[i]));
    const WeekdaySchedule = (props) => table[props.i];
    // globals.get_class_info({ CRN:73948 }).then(res=>console.log(res));
    return (
    	<React.Fragment>
        <LargeNavBar title={'Schedule'} gearHidden={true}/>
        {this.state.loading && this.loading()}
	      {!this.state.loading &&
          <SafeAreaView> 
            <Grid>
              <Row style={{ height: 350 }}>
                <Col style={{ width: 60 }}>
                  <Row size={1.5}></Row>
                  {hoursArr.map((obj, i) => 
                    <Row size={2} key={i} style={{ 
                        flexDirection: 'column', 
                        alignItems: 'flex-end',
                        color: '#333333',
                        paddingRight: 5,
                        color: '#7C7C7C'
                    }}>
                      <Text style={{fontSize:FN(14)}}>{obj}</Text>
                    </Row>
                  )}
                  <Row size={0.5}></Row>
                </Col>
                <Col>
                  <ScrollView horizontal={true}>
                    <Grid style={{ 
                      width: 700, 
                      height: 350
                    }}>
                      {weekdays.map((obj, i) => 
                        <Col key={i}>
                          <Row style={{
                            flexDirection: 'column', 
                            alignItems: 'center'
                          }} size={2}>
                            <Text style={{
                              color:'#7C7C7C'
                            }}>{obj}</Text>
                          </Row>
                          <WeekdaySchedule i={i} />
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