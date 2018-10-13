import React from 'react'
// import Loading from 'react-loader-advanced'
import PropTypes from 'prop-types'
import { Consumer } from '../common/login'
import Route from 'react-router-dom/Route'
import $ from 'jquery'

export default class PageContent extends React.PureComponent {
    static propTypes = {
        path: PropTypes.string
    }

    state = {
        isLoading: true
    }

    componentDidUpdate (prevProps) {
        if (prevProps.org !== this.props.org) this.getData()
    }

    getData () {
        $.get(this.props.system.url, { a: 'getConfig', o: this.state.account.org.id }, function (data) {
            console.log({ 'getData': data })
            const config = data.data
            this.setState({ groups: config.groups, actions: config.actions, settings: config.settings, metrics: config.metrics })
            this.props.setSettings(config.settings)
        }.bind(this), 'json')
    }

    componentDidMount () {
        if (this.state.isLoading) this.setState({ isLoading: false })
    }

    render () {
        const defaultColumnStyle = { minHeight: 1647 }
        // const spinner = (<h1 style={{ color: 'white' }}><span className="glyphicon glyphicon-refresh glyphicon-spin"></span> Loading...</h1>)
        const Component = this.props.component

        return (
            <Consumer>
                {({ isAuthenticated, account }) => (
                    <Route render={ props => <Component {...props} account={account} isAuthenticated={isAuthenticated} defaultColumnStyle={defaultColumnStyle} {...this.props} /> } />
                )}
            </Consumer>
        )
    }
}
