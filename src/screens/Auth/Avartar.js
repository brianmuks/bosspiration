const React = require('react');
const {Component} = require('react');
const {
  View,
  Text,
  Platform,
  TouchableHighlight,
  Alert,
} = require('react-native');
import Meteor, {withTracker} from 'react-native-meteor';
import {COLLECTIONS, APP_PRIMARY_COLOR_WITH_OPACITY} from '../../constants';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  List,
  ListItem,
  Right,
  Icon,
  Row,
} from 'native-base';
import {
  EDIT_PROFILE_FIELDS,
  VIEW_PROFILE_FIELDS,
  LOGGOUT_BTN_ID,
} from '../Home/constants';
import {logout} from './Methods';
const {Navigation} = require('react-native-navigation');

export default class Avartar extends Component {
  constructor(props) {
    super();
    this.state = {
      isEdit: false,
      screen: props.screen,
      user: {emails: []},
    };
    this.navigationEventListener = null;
  }

  componentDidMount() {
    this.setUser();

    // this.navigationEventListener = Navigation.events().bindComponent(this);
    // Navigation.events().bindComponent(this);

    console.log(this.props, 'props');
  }

  navigationButtonPressed({buttonId}) {
    switch (buttonId) {
      case LOGGOUT_BTN_ID:
        this.actionTrigger({action: 'logout'});
        break;

      default:
        break;
    }
  }

  componentWillReceiveProps() {
    console.warn('new props');
    this.setUser();
  }

  setUser() {
    if (!Meteor.userId()) {
      return;
    }
    const {profile, emails} = Meteor.user();
    const user = {...profile, emails};
    this.setState({user});
  }

  componentWillMount() {}

  getValue({user, field}) {
    if (field.name === 'dob' && user[field.name]) {
      return new Date(user[field.name]).toLocaleDateString();
    } else {
      return user[field.name];
    }
  }

  _logout() {
    logout()
      .then()
      .catch();
  }

  actionTrigger({action}) {
    const actions = {
      logout: {
        action: () => this._logout(),
        label: 'Are you sure you want to logout?',
      },
    };

    Alert.alert('Confirm Action', actions[action].label, [
      {
        text: 'Yes',
        onPress: actions[action].action,
      },
      {
        text: ' No',
        onPress: () => {},
      },
      {
        text: 'Cancel',
        onPress: () => {},
      },
    ]);
  }

  renderProfile({user}) {
    return VIEW_PROFILE_FIELDS.map((field, index) => (
      <ListItem avatar key={index}>
        <Body>
          <Text style={{fontWeight: '100', color: 'rgba(0,0,0,0.85)'}}>
            {field.label}
          </Text>
          <Text note>{this.getValue({user, field})}</Text>
        </Body>
        <Right>
          <Text note></Text>
        </Right>
      </ListItem>
    ));
  }

  editProfile() {
    this.setState({isEdit: true});
  }

  onDoneEditing() {
    this.setState({isEdit: false});
    this.setUser();
  }

  render() {
    const {isEdit} = this.state;
    const userId = Meteor.userId();
    const profilePicUrl =
      'https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/v2.6.1/screenshots/ios/card-image.png';

    const {user} = this.state;

    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail
              source={
                (user.profilePicUrl && {uri: profilePicUrl}) ||
                require('../../images/profile.png')
              }
            />
            <Row>
              <Text>{`Hi, ${user.fname}  `}</Text>
              <Text>{user.lname}</Text>
            </Row>
          </Left>
          {/* <Right>
            <Text
              onPress={() => {
                this.editProfile();
              }}
              note>
              {`Edit  `}
              <Icon
                ios="ios-create"
                android="md-create"
                style={{
                  fontSize: 20,
                  color: APP_PRIMARY_COLOR_WITH_OPACITY,
                }}
              />
            </Text>
          </Right> */}
        </CardItem>
      </Card>
    );
  }
}

