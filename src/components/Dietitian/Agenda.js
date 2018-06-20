import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebaseConnect } from 'react-redux-firebase'

import '../../styles/MessageList.css'
import LoadingIcon from '../Common/LoadingIcon';
import ProfileAppBar from '../Common/ProfileAppBar';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/tr'

moment.locale('tr');
BigCalendar.momentLocalizer(moment);

const enhance = compose(
  withRouter,
  firebaseConnect([
    { path: 'users' },
  ]),
  connect(({ firebase }) => ({
      users: firebase.data.users,
    })
  )
);

const changeHandler = (target, formattedNumber, selectedCountry, rawValue) => {
  console.log(`${formattedNumber} - ${rawValue}`, 'Formatted value and raw value')
}

class Agenda extends React.PureComponent {

  render() {

    if (this.props.users === undefined) {
      return (<LoadingIcon />);
    }
    
    return (  
      <div>
        <ProfileAppBar title="Randevularım"/>
        <BigCalendar
          events={[{
            id: 0,
            title: 'Deniz Akyurt ile randevum',
            start: new Date(2018, 4, 14, 14, 0, 0),
            end: new Date(2018, 4, 14, 14, 45, 0),
          },{
            id: 1,
            title: 'Deniz Akyurt ile randevum',
            start: new Date(2018, 4, 21, 14, 0, 0),
            end: new Date(2018, 4, 21, 14, 30, 0),
          },{
            id: 2,
            title: 'Deniz Akyurt ile randevum',
            start: new Date(2018, 4, 28, 14, 0, 0),
            end: new Date(2018, 4, 28, 14, 30, 0),
          },{
            id: 3,
            title: 'Deniz Akyurt ile randevum',
            start: new Date(2018, 5, 5, 14, 0, 0),
            end: new Date(2018, 5, 5, 14, 45, 0),
          }]}
          defaultView="week"
          steps={30}
          timeslots={1}
          selectable={true}
          views={['week']}
          min= {new Date(2018, 4, 1, 8, 0, 0)}
          max= {new Date(2018, 4, 1, 19, 0, 0)}
          messages={{
            next: "Sonraki Hafta",
            previous: "Önceki Hafta",
            today: "Bugün"
          }}
        />
      </div>
    );
  }
}

export default enhance(Agenda)