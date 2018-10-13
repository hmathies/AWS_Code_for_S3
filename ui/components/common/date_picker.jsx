import React from 'react'
import PropTypes from 'prop-types'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export default class DateControl extends React.Component {
    static propTypes = {
        profileDate: PropTypes.string.isRequired,
        setProfileDate: PropTypes.func.isRequired
    }
    state = {
        show: 'hidden'
    }
    static getDateState = date => {
        date = `${date}`
        const d = { y: parseInt(date.substring(0, 4)), m: parseInt(date.substring(4, 6) - 1), d: parseInt(date.substring(6, 8)) }
        return (new Date(d.y, d.m, d.d))
    }
    static getDerivedStateFromProps = (props, state) => {
        const date = (new Date(state.date))
        const datestamp = (date.getFullYear() * 10000) + (date.getMonth() + 1) * 100 + date.getDate()
        if ((props.profileDate) !== (`${datestamp}`)) {
            return { date: DateControl.getDateState(props.profileDate) }
        }
    }
    getDateString (date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${months[date.getMonth()]}\u00a0${date.getDate()},\u00a0${date.getFullYear()}`
    }
    toggle () {
        this.setState({ show: (this.state.show === 'hidden' ? 'show' : 'hidden') })
    }
    set (day) {
        if (this.state.date !== day) {
            this.props.setProfileDate(day)
        }
        this.setState({ show: 'hidden', date: day })
    }
    render () {
        const dateString = this.getDateString(this.state.date)
        return (
            <div>
                <div style={{ border: '1px solid rgb(204, 204, 204)', padding: '4px 10px', cursor: 'pointer' }} onClick={this.toggle.bind(this)}>
                    <i className="fa fa-calendar"></i> <span>{dateString} <i className="fa fa-sort-desc pull-right"></i></span>
                </div>
                <div className={this.state.show} style={{ position: 'absolute', zIndex: 100, background: 'rgba(255,255,255,0.9)', border: '1px solid rgb(204,204,204)', right: '10px' }}>
                    <DayPicker selectedDays={this.state.date} onDayClick={this.set.bind(this)} />
                </div>
            </div>
        )
    }
}
