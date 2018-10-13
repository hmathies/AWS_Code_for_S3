import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
export default class OauthSuccess extends React.Component {
    static propTypes = {
        location: PropTypes.instanceOf(Object).isRequired
    }
    componentDidMount () {
        this._sendSuccess(this.props.location.search)
    }

    _sendSuccess (code) {
        axios(`http://localhost:5000/importer/hubspot/oauth/success${code}`)
            .then(({ data }) => {
                window.opener._callback(data)
                setTimeout(window.close, 3000)
            })
            .catch(err => {
                console.log('===== ERROR =====\n', err)
            })
    }

    render () {
        return (
            <div className="Container">
                <h2>Authentication Success!</h2>
                <p>You will now be redirected back to your previous page.</p>
            </div>
        )
    }
}
