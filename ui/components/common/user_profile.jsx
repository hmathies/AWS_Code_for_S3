import React from 'react'
import ReactBootstrap from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class UserProfile extends React.Component {
    static propTypes = {
        account: PropTypes.string.isRequired
    }
    state = {
        account: this.props.account,
        editing: {
            firstName: false,
            lastName: false,
            password: false,
            profileImg: false
        },
        values: {}
    }

    clickEdit = type => {
        const editing = { firstName: false, lastName: false, password: false, profileImg: false }
        const { values } = this.state
        editing[type] = true
        switch (type) {
            case 'firstName': case 'lastName': case 'profileImg':
                values[type] = this.state.account.info[type]
                break
            case 'password':
                values.password1 = ''
                values.password2 = ''
                break
        }
        this.setState({ feedback: '', editing, values })
    }
    changeValue = (type, e) => {
        const { values } = this.state
        values[type] = e.target.value
        this.setState({ values, feedback: '' })
    }
    resetValue = type => {
        const { values } = this.state.values
        values[type] = ''
        this.setState({ values, feedback: '' })
    }
    clickCancel = type => {
        const { editing } = this.state
        editing[type] = false
        this.setState({ editing })
    }
    clickSave = type => {
        let errorFlag = false
        if (type === 'password') {
            if (this.state.values.password1 !== this.state.values.password2) {
                errorFlag = true
                this.setState({ feedback: "passwords don't match" })
            }
        }
        if (!errorFlag) {
            this.clickCancel(type)
        }
    }
    render = () => {
        const { Panel, Well } = ReactBootstrap
        // const { plan } = this.props.account.org
        const passwordMask = '**********' // this.state.account.password.replace(/./,'*');
        return (
            <div className="settings-pane rows">

                <h1>User Settings</h1>

                <Well>

                    <Panel className="col-sm-12 col-md-6">
                        <h2>User Profile</h2>

                        <dl className="dl-horizontal">
                            <dt>First Name</dt>
                            <dd>
                                {this.state.editing.firstName
                                    ? (
                                        <div><input type="text" value={this.state.values.firstName} onChange={this.changeValue.bind(this, 'firstName')} style={{ width: `${100}%` }} /> <input type="button" value="Save" onClick={this.clickSave.bind(this, 'firstName')} /><input type="button" value="Cancel" onClick={this.clickCancel.bind(this, 'firstName')} /></div>
                                    )
                                    : (
                                        <div>{this.state.account.info.firstName} <span className="fa fa-pencil" onClick={this.clickEdit.bind(this, 'firstName')}> </span></div>
                                    )
                                }
                            </dd>

                            <dt>Last Name</dt>
                            <dd>

                                {this.state.editing.lastName
                                    ? (
                                        <div><input type="text" value={this.state.values.lastName} onChange={this.changeValue.bind(this, 'lastName')} style={{ width: `${100}%` }} /> <input type="button" value="Save" onClick={this.clickSave.bind(this, 'lastName')} /><input type="button" value="Cancel" onClick={this.clickCancel.bind(this, 'lastName')} /></div>
                                    ) : (
                                        <div>{this.state.account.info.lastName} <span className="fa fa-pencil" onClick={this.clickEdit.bind(this, 'lastName')}> </span></div>
                                    )
                                }
                            </dd>

                            <dt>Password</dt>
                            <dd>

                                {this.state.editing.password
                                    ? (
                                        <div>
                                            <span>
                                                <input type="password" value={this.state.values.password1} onChange={this.changeValue.bind(this, 'password1')} onFocus={this.resetValue.bind(this, 'password1')} style={{ width: `${100}%` }} /><br />
                                                <input type="password" value={this.state.values.password2} onChange={this.changeValue.bind(this, 'password2')} onFocus={this.resetValue.bind(this, 'password2')} style={{ width: `${100}%` }} />
                                            </span><br />
                                            <span>{this.state.feedback}</span><br />
                                            <span>
                                                <input type="button" value="Save" onClick={this.clickSave.bind(this, 'password')} /><input type="button" value="Cancel" onClick={this.clickCancel.bind(this, 'password')} />
                                            </span>
                                        </div>
                                    )
                                    : (
                                        <div>{passwordMask} <span className="fa fa-pencil" onClick={this.clickEdit.bind(this, 'password')}> </span></div>
                                    )
                                }
                            </dd>

                            <dt>Profile Avatar</dt>
                            <dd>

                                {this.state.editing.profileImg
                                    ? (
                                        <div><input type="text" value={this.state.values.profileImg} onChange={this.changeValue.bind(this, 'profileImg')} style={{ width: `${100}%` }} placeholder="profile image URL" /> <input type="button" value="Save" onClick={this.clickSave.bind(this, 'profileImg')} /><input type="button" value="Cancel" onClick={this.clickCancel.bind(this, 'profileImg')} /></div>
                                    )
                                    : (
                                        <div>{this.state.account.info.profileImg} <span className="fa fa-pencil" onClick={this.clickEdit.bind(this, 'profileImg')}> </span></div>
                                    )
                                }

                            </dd>

                        </dl>

                    </Panel>
                    <div className="clearfix"></div>

                </Well>
            </div>
        )
    }
}
