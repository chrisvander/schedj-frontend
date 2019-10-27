import React from 'react';
import {
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import { FN } from '../styles';
import { LargeNavBar, Drawer, RoundedCard, Tag, SButton } from '../components';
import globals from '../globals';

const hoursArr = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM'];
for (let i = 1; i < 10; i += 1) hoursArr.push(`${i} PM`);
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const fullCenter = { alignItems: 'center', justifyContent: 'center' };
let drawerPosition = 0;

function generateDayCol(dayCl, colors) {
  const day = JSON.parse(JSON.stringify(dayCl));
  const startTimes = [];
  const dayStart = moment('8 am', 'h a');
  for (let j = 0; j < dayCl.length; j += 1) {
    const start = moment(day[j].start_time, 'h:mm a');
    // record time as an int throughout the day
    startTimes.push(moment.duration(start.diff(dayStart)).asHours() * 2);
    const end = moment(day[j].end_time, 'h:mm a');
    // pushback duration of each class
    day[j].duration = Math.ceil(moment.duration(end.diff(start)).asHours() * 20) / 10;
  }
  const tableResponse = [];
  let totalSize = 0;
  while (totalSize < hoursArr.length * 2) {
    if (startTimes[0] <= totalSize) {
      startTimes.shift();
      const course = day.shift();
      tableResponse.push(
        <Row
          size={course.duration}
          key={totalSize}
          style={{
            borderTopColor: colors[course.CRN],
            borderTopWidth: 1,
            backgroundColor: colors[course.CRN],
            flexDirection: 'column',
            overflow: 'hidden',
            paddingLeft: 3,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>{course.name}</Text>
          <Text style={{ color: '#222' }}>{`${course.start_time} - ${course.end_time}`}</Text>
        </Row>,
      );
      totalSize += course.duration;
      const leftover = Math.round(10 * (Math.ceil(course.duration / 2) * 2 - course.duration)) / 10;
      tableResponse.push(
        <Row
          size={leftover}
          key={totalSize}
          style={{
            borderTopColor: colors[course.CRN],
            borderTopWidth: 1,
          }}
        />,
      );
      totalSize += leftover;
    } else {
      tableResponse.push(
        <Row
          size={2}
          key={totalSize}
          style={{
            borderTopColor: '#CCCCCC',
            borderTopWidth: 1,
          }}
        >
          <Text />
        </Row>,
      );
      totalSize += 2;
    }
  }
  return tableResponse;
}

function makeGrid({ clinfo, colors }) {
  const table = weekdays.map((weekday, i) => generateDayCol(clinfo[i], colors));
  const WeekdaySchedule = props => table[props.i];
  return (
    <Grid style={{ paddingTop: 10, backgroundColor: '#F1F9FF' }}>
      <Row>
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
      <Row style={{ height: 110, width: '100%', padding: 15 }}>
        <Col>
          <SButton
            onPress={() => {
              EventRegister.emit('schedule_breakdown');
            }}
          >
            Show Breakdown
          </SButton>
        </Col>
      </Row>
    </Grid>
  );
}

function scheduleBreakdown({ clinfo, startDate }) {
  const orig = moment(startDate, 'MMM DD, YYYY').subtract(1, 'd');
  const dates = weekdays.map(() => {
    orig.add(1, 'd');
    return {
      month: orig.format('MMM'),
      day: orig.format('D'),
    };
  });
  return (
    <ScrollView>
      {clinfo.map((item, i) => (
        <View
          key={dates[i].day}
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <View
            style={[fullCenter, {
              width: 70,
              margin: 9.5,
              marginRight: 12,
              padding: 3,
              borderRightColor: '#BCBCBC',
              borderRightWidth: 1,
              textAlign: 'center',
            }]}
          >
            <Text
              style={{
                fontFamily: 'Arial',
                fontSize: 30,
                fontWeight: 'bold',
                color: '#7C7C7C',
              }}
            >
              {dates[i].day}
            </Text>
            <Text
              style={{
                fontFamily: 'Arial',
                fontSize: 18,
                fontWeight: 'bold',
                color: '#7C7C7C',
              }}
            >
              {dates[i].month.toUpperCase()}
            </Text>
          </View>
          <View style={{ flex: 1, marginTop: 12.5, marginRight: 12.5 }}>
            {item.map((cl, j) => (
              <RoundedCard key={dates[i].day + cl.start_time}>
                <Text>{cl.location}</Text>
                <Text>Heaa</Text>
                <Tag>{cl.location}</Tag>
                <Tag>{cl.start_time}</Tag>
              </RoundedCard>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      schedule: null,
      drawerHeight: 400,
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

  componentWillUnmount() {
    EventRegister.removeEventListener('load_schedule');
  }

  render() {
    const { loading, schedule } = this.state;
    const { navigation } = this.props;

    if (loading) return (<React.Fragment />);
    if (!schedule.end) {
      return (
        <React.Fragment>
          <View style={[{ margin: 10 }, fullCenter]}>
            <Text style={{ fontSize: 25, textAlign: 'center' }}>You have no classes this week.</Text>
            <Text style={{ textAlign: 'center', marginTop: 5 }}>Either that, or we really messed this up.</Text>
          </View>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <LargeNavBar navigation={navigation} title="Schedule" />
        {loading && (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
        )}
        {!loading && makeGrid(schedule)}
        <Drawer offset="100%" event="schedule_breakdown" shadowBefore={false}>
          {!loading && scheduleBreakdown(schedule)}
        </Drawer>
      </React.Fragment>
    );
  }
}
