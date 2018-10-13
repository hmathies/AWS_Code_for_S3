
import React from 'react'
import PropTypes from 'prop-types'
import s from './login.css'
import $ from 'jquery'

const { Provider, Consumer } = React.createContext()

class Login extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        system: PropTypes.instanceOf(Object).isRequired
    }
    state = {
        username_value: this.getUsername(),
        password_value: '',
        errorMessage: '',
        isAuthenticated: false
    }

    componentDidMount () {
        this.foundUsername = false
        if (this.state.username_value === '') { this.userInput.focus() } else { this.passInput.focus() }
        this.initForm()
    }

    changeUsername (e) {
        const { value } = e.target
        this.setState({ username_value: value })
    }

    changePassword (e) {
        const { value } = e.target
        this.setState({ password_value: value })
    }

    resetPassword () {
        this.setState({ password_value: '' })
    }

    submitClicked () {
        this.setState({ errorMessage: '' })
        const password = this.state.password_value
        console.log('clicked', this.props.system)
        $.get(this.props.system.url, { a: 'login', username: this.state.username_value.toLowerCase(), password }, function (data) {
            console.log('got back')
            console.log({ data })
            const account = (data.data ? data.data.account : null)
            if (account && account.token) {
                this.setState({ password_value: '' })
                if ($('input#remember-me').prop('checked')) {
                    this.setCookie('username', this.state.username_value.toLowerCase(), 30)
                } else if (this.foundUsername) {
                    this.setCookie('username', '')
                }
                account.org = account.orgs[0]
                this.setState({ account, isAuthenticated: true })
            } else {
                this.setState({ errorMessage: 'Invalid username/password' })
                this.passInput.blur()
                if (this.foundUsername) { this.setCookie('username', '') }
            }
        }.bind(this), 'json')
        return false
    }

    initForm () {
        if (this.postRender) { return }
        $('form input').keypress(function (e) {
            if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
                $('button[type=button]').click()
                return false
            }
        })
        this.postRender = true
    }

    getCookie (cName) {
        let cValue = document.cookie
        let cStart = cValue.indexOf(` ${cName}=`)
        if (cStart === -1) cStart = cValue.indexOf(`${cName}=`)
        if (cStart === -1) cValue = null
        else {
            cStart = cValue.indexOf('=', cStart) + 1
            let cEnd = cValue.indexOf(';', cStart)
            if (cEnd === -1) { cEnd = cValue.length }
            cValue = unescape(cValue.substring(cStart, cEnd))
        }
        return cValue
    }

    setCookie (cName, value, exdays) {
        const exdate = new Date()
        exdate.setDate(exdate.getDate() + exdays)
        const cValue = escape(value) + ((exdays == null) ? '' : `; expires=${exdate.toUTCString()}`)
        document.cookie = `${cName}=${cValue}`
    }

    getUsername () {
        const username = this.getCookie('username')
        if (username != null && username !== '') {
            this.foundUsername = true
            return username
        }
        return ''
    }

    render () {
        const LoginComponent = (
            <div className="Container" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                background: 'url(https://influentmetrics.com/assets/img/backgrounds/backgroundLogo.png) rgb(154, 1, 1)'
            }}>
                <div className="" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img className="img-circle-2" id="img_logo" src="/logo.png" />
                            </div>
                            <div id="div-forms">
                                <form id="login-form">
                                    <div className="modal-body">
                                        <div id="div-login-msg">
                                            <div id="icon-login-msg" className="glyphicon glyphicon-chevron-right"></div>
                                            <span id="text-login-msg">Type your username and password.</span>
                                        </div>
                                        {this.state.errorMessage
                                            ? <div id="div-error-msg" className="alert alert-danger" role="alert">
                                                <div id="icon-error-msg" className="glyphicon glyphicon-exclamation-sign"></div>&nbsp;
                                                <span id="text-error-msg">{this.state.errorMessage}</span>
                                            </div>
                                            : ''
                                        }
                                        <input id="login_username" className="form-control" type="text" placeholder="Username" value={this.state.username_value} onChange={this.changeUsername.bind(this)} required ref={i => { this.userInput = i }} />
                                        <input id="login_password" className="form-control" type="password" placeholder="Password" value={this.state.password_value} onChange={this.changePassword.bind(this)} onFocus={this.resetPassword.bind(this)} required ref={i => { this.passInput = i }} />
                                        <div className="checkbox">
                                            <label>
                                                <input id="remember-me" type="checkbox" defaultChecked={this.foundUsername} /> Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <div>
                                            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.submitClicked.bind(this)}>Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )

        return (

            <Provider value={{ isAuthenticated: this.state.isAuthenticated, account: this.state.account }}>
                { this.state.isAuthenticated ? this.props.children : LoginComponent }
            </Provider>

        )
    }
}

export { Login, Consumer }
