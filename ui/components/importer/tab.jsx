import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class Tab extends React.Component {
    static propTypes = {
        tabName: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        faIconName: PropTypes.string.isRequired
    }
    render () {
        return (
            <li className={`nav-overview ${this.props.active ? 'active' : null}`}>
                <Link to={this.props.tabName.toLowerCase()}><i className={`fa fa-${this.props.faIconName}`}></i> {this.props.tabName}</Link>
            </li>
        )
    }
}
