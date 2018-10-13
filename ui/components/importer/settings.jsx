import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default class Settings extends React.PureComponent {
  static propTypes = {
    defaultColumnStyle: PropTypes.instanceOf(Object).isRequired
  };
  state = {
    authWithGoogle: false,
    authWithHubSpot: false,
    connections: {},
    messages: {},
    connectionsWithEmails: [],
    connectionsWithEmailsHash: {},
    messageDataToSend: [],
    hubspotSecretKey: ""
  };

  /**
   * Sets input values
   * @param {event} e
   * @returns {void}
   */
  setInputVal(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  // createFolder
  createFolder(e) {
    e.preventDefault();

    const body = { folderName: this.state.folderName };

    axios
      .post("http://localhost:5000/auth/create", body)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // componentDidMount

  // render
  render() {
    return (
      <div
        className="right_col"
        role="main"
        style={this.props.defaultColumnStyle}
      >
        <div className="clear">
          <h1>Settings</h1>
        </div>
        <section name="Data Sources">
          <h2>Data Sources</h2>
          <div className="container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <td />
                <td />
                <td />
                <td />
              </tbody>
            </table>
          </div>
        </section>
        <section name="Relationship Management Integration">
          <h2>Relationship Management Integration</h2>
          <div className="container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <td />
                <td />
              </tbody>
            </table>
          </div>
          Hubspot
          <input
            type="text"
            name="hubspotSecretKey"
            placeHolder="HubSpot Secret Key"
            value={this.state.hubspotSecretKey}
            onChange={this.setInputVal.bind(this)}
          />
        </section>
        <section name="Users">
          <h2>Users</h2>
          <div className="container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Password</th>
                  <th>Imports</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
}
