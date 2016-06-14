import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import s from './UserPassword.css';

class UserPassword extends React.Component{
  render(){
    return (
      <div>
        <h2 className="categoryHeader">Change Password</h2>
        <Paper zDepth={2} className="category">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <ListItem className="item center-text" disabled={true}>
                Change password
              </ListItem>
              <RaisedButton label="change" secondary={true} className={s.pwdButton} />
              <Subheader className="subheader center-text">If you remember your old one</Subheader>
            </div>

            <div className="col-xs-12 col-md-6">
              <ListItem className="item center-text" disabled={true}>
                Reset password
              </ListItem>
              <RaisedButton label="reset" secondary={true} className={s.pwdButton} />
              <Subheader className="subheader center-text">We will send you a new one to your email</Subheader>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(s)(UserPassword);