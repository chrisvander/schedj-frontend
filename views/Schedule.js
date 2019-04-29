import React from 'react';
import {
  Text, SafeAreaView, ActivityIndicator, ScrollView,
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { FN } from '../styles';
import { LargeNavBar } from '../components';
import globals from '../globals';

const hoursArr = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM'];
for (let i = 1; i < 10; i += 1) hoursArr.push(`${i} PM`);
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      schedule: null,
    };
  }

  componentWillMount() {
    if (globals.SCHEDULE.loaded) {
      this.setState({
        loading: false,
        schedule: globals.SCHEDULE,
      });
    } else {
      EventRegister.addEventListener('load_schedule', (data) => {
        this.setState({
          loading: false,
          schedule: data,
        });
      });
    }
  }

  generateDayCol(dayCl, i) {
    const classes = [];
    for (const j in hoursArr) {
      classes.push(
        <Row
          size={2}
          key={j}
          style={{
            borderTopColor: '#CCCCCC',
            borderTopWidth: 1,
          }}
        >
          <Text />
        </Row>,
      );
    }
    return classes;
  }

  render() {
    const { loading, schedule } = this.state;
    const { clinfo } = schedule;
    const table = weekdays.map((weekday, i) => this.generateDayCol(clinfo[i]));
    const WeekdaySchedule = props => table[props.i];
    // globals.get_class_info({ CRN:73948 }).then(res=>console.log(res));
    return (
      <React.Fragment>
        <LargeNavBar title="Schedule" gearHidden />
        {loading && (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
        )}
        {!loading
          && (
          <SafeAreaView>
            <Grid>
              <Row style={{ height: 350 }}>
                <Col style={{ width: 60 }}>
                  <Row size={1.5} />
                  {hoursArr.map(obj => (
                    <Row
                      size={2}
                      key={obj}
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        paddingRight: 5,
                        color: '#7C7C7C',
                      }}
                    >
                      <Text style={{ fontSize: FN(14) }}>{obj}</Text>
                    </Row>
                  ))}
                  <Row size={0.5} />
                </Col>
                <Col>
                  <ScrollView horizontal>
                    <Grid style={{
                      width: 700,
                      height: 350,
                    }}
                    >
                      {weekdays.map((obj, i) => (
                        <Col key={obj}>
                          <Row
                            style={{
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                            size={2}
                          >
                            <Text style={{
                              color: '#7C7C7C',
                            }}
                            >
                              {obj}
                            </Text>
                          </Row>
                          <WeekdaySchedule i={i} />
                        </Col>
                      ))}
                    </Grid>
                  </ScrollView>
                </Col>
              </Row>
              <Row />
            </Grid>
          </SafeAreaView>
          )
        }
      </React.Fragment>
    );
  }
}
