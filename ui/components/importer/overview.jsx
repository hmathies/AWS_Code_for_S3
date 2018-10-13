import React from 'react'
import PropTypes from 'prop-types'

export default class Overview extends React.Component {
    static propTypes = {
        defaultColumnStyle: PropTypes.instanceOf(Object)
    }
    render () {
        return (
            <div className="right_col" role="main" style={ this.props.defaultColumnStyle }>
                <div className="clear">
                    <h1>Overview</h1>

                    <div>

                        <div>
                            <p>Number of Users</p>
                            <p>3</p>
                        </div>
                        <div>
                            <p>Total Contacts</p>
                            <p>3928</p>
                        </div>
                        <div>
                            <p>Total Messages</p>
                            <p>11709</p>
                        </div>
                        <div>
                            <p>Total Alerts</p>
                            <p>15</p>
                        </div>

                        <div>
                            <h2>Account Activity</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Time</td>
                                        <td>Type</td>
                                        <td>User</td>
                                        <td># Contacts</td>
                                        <td># Threads</td>
                                        <td># Messages</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>6/24, 8:00am</td>
                                        <td>Import</td>
                                        <td>Brandon Benefield</td>
                                        <td>5</td>
                                        <td>10</td>
                                        <td>143</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h2>User</h2>

                            <table>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Email Address</td>
                                        <td>Total Imports</td>
                                        <td>Last Import</td>
                                        <td>Total Messages</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tim Simms</td>
                                        <td>tim.simms@networkmgmt.com</td>
                                        <td>12</td>
                                        <td>06/24/18</td>
                                        <td>11457</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h2>Alerts</h2>

                            <table>
                                <thead>
                                    <tr>
                                        <td>Contact</td>
                                        <td>Email Address</td>
                                        <td>Message</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Dave Simms</td>
                                        <td>dave.simms@networkmgmt.com</td>
                                        <td>Contact not found in CRM</td>
                                        <td>+ x</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
