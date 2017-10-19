import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton'

class Header extends Component {
  handleViewingEmail(){
    const admin_email = localStorage.getItem('admin_email');
    if(admin_email){
      return admin_email
    }
  }
  renderLinks() {

    if (this.props.authenticated) {
      return (
        <div style={{float: "right"}}>
          <div>{this.props.authenticated && this.handleViewingEmail()}</div>
          <div style={{marginRight: "5px", display: "inline-block", float: "right"}}><Link to="/admin/signout"><RaisedButton primary={true} label="Sign out"/></Link></div>
        </div>
      );
    } else {
      return (
        <div>
          <div style={{marginRight: "5px", display: "inline-block", float: "right"}}><Link to="/admin/signup"><RaisedButton primary={true} label="Sign up"/></Link></div>
          <div style={{marginRight: "5px", display: "inline-block", float: "right"}}><Link to="/admin/signin"><RaisedButton primary={true} label="Sign in"/></Link></div>
        </div>
      )
    }
  }
  render() {
    return (
      <nav>
        <ul>
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
