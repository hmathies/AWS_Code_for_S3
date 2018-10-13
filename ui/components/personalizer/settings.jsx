import React from 'react'
import ReactBootstrap from 'react-bootstrap'

class Site extends React.Component {
    state = {
        editing: (!!this.props.editing),
        newSite: this.props.newSite,
        index: this.props.index,
        site: this.props.site
    }
    componentWillReceiveProps (newProps) {
        if (!this.state.editing && (newProps.index != this.state.index || newProps.site != this.state.site)) {
            this.setState({ index: newProps.index, site: newProps.site })
        }
    }
    initValues () {
        this.setState({ site: this.props.site })
    }
    clickEdit () {
        this.setState({ editing: true })
    }
    changeSite (e) {
        this.setState({ site: e.target.value })
    }
    clickRemove () {
        this.props.removeSite(this.state.index)
    }
    clickCancel () {
        if (this.state.newSite) {
            this.clickRemove()
        } else {
            this.setState({ editing: false })
            this.initValues()
        }
    }
    clickSave () {
        this.setState({ editing: false })
        this.props.updateSites(this.state.index, this.state.site)
    }

    render () {
        return (!this.state.editing) ? (
            <tr><td>{this.state.site}</td><td><span className="fa fa-pencil" onClick={this.clickEdit.bind(this)}> </span> <span className="fa fa-remove" onClick={this.clickRemove.bind(this)}> </span></td></tr>
        ) : (
            <tr><td>
                <input type="text" value={this.state.site} onChange={this.changeSite.bind(this)} placeholder="hostname" style={{ width: `${50}%` }} />
            </td><td>
                <input type="button" value="Save" onClick={this.clickSave.bind(this)} />
                <input type="button" value="Cancel" onClick={this.clickCancel.bind(this)} />
            </td></tr>
        )
    }
}

class Location extends React.Component {
    constructor (props) {
        super(props)
        this.geocode = { url: 'https://maps.googleapis.com/maps/api/geocode/json', key: 'AIzaSyCfvoEtrIsxyjKkixrV8SoWgfad5FwXdt0' }
        this.state = { editing: (!!props.editing), newLocation: props.newLocation, index: props.index, location: props.location, address: '', name: '' }
    }
    componentDidMount () {
        this.initValues()
    }
    componentWillReceiveProps (newProps) {
        if (
            newProps.index !== this.state.index ||
            JSON.parse(JSON.stringify(newProps.location.coordinates)) !== JSON.parse(JSON.stringify(this.state.location))
        ) {
            this.setState({ index: newProps.index, location: newProps.location })
        }
    }

    initValues () {
        if (this.state.location.coordinates && this.state.location.coordinates.length === 2) {
            const data = { latlng: this.state.location.coordinates.join(), key: this.geocode.key }
            $.get(this.geocode.url, data, function (response) {
                // console.log({ location_response:response });
                // console.log({ status:response.status, address:response.results[0].formatted_address });
                if (response.status === 'OK') {
                    this.setState({ address: response.results[0].formatted_address })
                }
            }.bind(this))
        }
        this.setState({ name: this.state.location.name })
    }
    clickEdit () {
        this.setState({ editing: true })
    }
    clickRemove () {
        this.props.removeLocation(this.state.index)
    }
    changeAddress (e) {
        this.setState({ address: e.target.value })
    }
    changeName (e) {
        this.setState({ name: e.target.value })
    }
    clickCancel () {
        if (this.state.newLocation) { this.clickRemove()} else {
            this.setState({ editing: false })
            this.initValues()
        }
    }
    clickSave () {
        this.setState({ editing: false })
        if (this.state.address) {
            const data = { address: this.state.address, key: this.geocode.key }
            $.get(this.geocode.url, data, function (response) {
                // console.log({ location_response:response });
                if (response.status === 'OK') {
                    const { geometry } = response.results[0]
                    // console.log({ status:response.status, coordinates:[geometry.location.lat,geometry.location.lng] });
                    const { location } = this.state
                    location.coordinates = [geometry.location.lat, geometry.location.lng]
                    location.name = this.state.name
                    location.id = location.name.toLowerCase().replace(/[^a-z0-9_]+/g, '-')
                    // TO-DO: since we're changing location's id, we need to check groups with this id and adjust
                    this.setState({ location })
                    this.props.updateLocations(this.state.index, location)
                }
            }.bind(this))
        }
    }
    render () {
        return (!this.state.editing) ? (
            <tr><td>{this.state.location.name}</td><td>{this.state.address}<br />[{this.state.location.coordinates[0]}, {this.state.location.coordinates[1]}]</td><td><span className="fa fa-pencil" onClick={this.clickEdit.bind(this)}> </span> <span className="fa fa-remove" onClick={this.clickRemove.bind(this)}> </span></td></tr>
        ) : (
            <tr><td>
                <input type="text" value={this.state.name} onChange={this.changeName.bind(this)} placeholder="Name" style={{ width: `${100}%` }} />
            </td><td>
                <input type="text" value={this.state.address} onChange={this.changeAddress.bind(this)} placeholder="Address" style={{ width: `${100}%` }} />
            </td><td>
                <input type="button" value="Save" onClick={this.clickSave.bind(this)} />
                <input type="button" value="Cancel" onClick={this.clickCancel.bind(this)} />
            </td></tr>
        )
    }
}

export default class Settings extends React.Component {
    state = {
        settings: this.props.settings,
        newLocationData: null,
        newSiteData: null,
        editing: {},
        value: {}
    }

    componentWillReceiveProps (newProps) {
        if (newProps.settings !== this.state.settings) {
            this.setState({ settings: newProps.settings })
        }
    }

    updateSettings (key, value) {
        const { settings } = this.state
        settings[key] = value
        this.setState({ settings })
        this.props.updateData(settings)
    }

    updateSites (index, value) {
        const { sites } = this.state.settings
        sites[index] = value
        this.updateSettings('sites', sites)
        this.resetNewSite()
    }
    resetNewSite () {
        this.setState({ newSiteData: null })
    }

    addSite () {
        this.setState({ newSiteData: { site: '' } })
    }

    removeSite (index) {
        const { sites } = this.state.settings
        if (index < sites.length && sites[index]) {
            sites.splice(index, 1)
        }
        this.updateSettings('sites', sites)
        this.resetNewSite()
    }

    updateLocations (index, value) {
        const { locations } = this.state.settings
        locations[index] = value
        this.updateSettings('locations', locations)
        this.resetNewLocation()
    }
    resetNewLocation () {
        this.setState({ newLocationData: null })
    }

    addLocation () {
        this.setState({ newLocationData: { id: '-', name: '', coordinates: [] } })
    }

    clickEdit (type) {
        const { value } = this.state
        value[type] = this.state.settings[type]
        const { editing } = this.state
        editing[type] = true
        this.setState({ value, editing })
    }

    changeValue (type, e) {
        const { value } = this.state
        value[type] = e.target.value
        this.setState({ value })
    }

    clickCancel (type) {
        const { editing } = this.state
        editing[type] = false
        this.setState({ editing })
    }

    clickSave (type) {
        this.updateSettings(type, this.state.value[type])
        this.clickCancel(type)
    }

    removeLocation (index) {
        const { locations } = this.state.settings
        if (index < locations.length && locations[index]) {
            locations.splice(index, 1)
        }
        this.updateSettings('locations', locations)
        this.resetNewLocation()
    }

    render () {
        const { Panel, Well, FormControl } = ReactBootstrap
        const newSite = this.state.newSiteData
            ? (<Site editing={true} newSite={true} index={this.state.settings.sites.length} site="" updateSites={this.updateSites.bind(this)} removeSite={this.removeSite.bind(this)} />)
            : (<tr></tr>)
        const newLocation = this.state.newLocationData
            ? (<Location editing={true} newLocation={true} index={this.state.settings.locations.length} location={this.state.newLocationData} updateLocations={this.updateLocations.bind(this)} removeLocation={this.removeLocation.bind(this)} />)
            : (<tr></tr>)
        let { sites } = this.state.settings
        sites = (this.props.account.org.plan !== 'lite') ? sites : sites.slice(0, 1)
        let { locations } = this.state.settings
        locations = (this.props.account.org.plan !== 'lite') ? locations : locations.slice(0, 1)
        return (
            <div className="settings-pane rows">

                <h1>Organization Settings</h1>

                <Well>

                    <Panel>
                        <h2>Configuration Settings</h2>

                        <dl className="dl-horizontal">
                            <dt>Organization</dt>
                            <dd>
                                {(this.state.editing.organization)
                                    ? (<span><input type="text" className="col-xs-10 col-md-6" value={this.state.value.organization} onChange={this.changeValue.bind(this, 'organization')} /> <input type="button" value="Save" onClick={this.clickSave.bind(this, 'organization')} /><input type="button" value="Cancel" onClick={this.clickCancel.bind(this, 'organization')} /></span>)
                                    : (<span>{this.state.settings.organization} <span className="fa fa-pencil" onClick={this.clickEdit.bind(this, 'organization')}> </span></span>)
                                }
                            </dd>

                            <dt>Timezone</dt>
                            <dd>
                                {(this.state.editing.timezone)
                                    ? (<span><input type="text" className="col-xs-10 col-md-6" value={this.state.value.timezone} onChange={this.changeValue.bind(this, 'timezone')} /> <input type="button" value="Save" onClick={this.clickSave.bind(this, 'timezone')} /><input type="button" value="Cancel" onClick={this.clickCancel.bind(this, 'timezone')} /></span>)
                                    : (<span>{this.state.settings.timezone} <span className="fa fa-pencil" onClick={this.clickEdit.bind(this, 'timezone')}> </span></span>)
                                }
                            </dd>

                            <dt>Sites</dt>
                            <dd>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr><th>Hostname</th>
                                            {
                                                (this.props.account.org.plan !== 'lite' || !sites.length)
                                                    ? (<th><input type="button" value="+" onClick={this.addSite.bind(this)} /></th>) : (<th></th>)
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sites.map(function (key, index) {
                                                return (<Site key={index} index={index} site={key} updateSites={this.updateSites.bind(this)} removeSite={this.removeSite.bind(this)} />)
                                            }.bind(this))
                                        }
                                        {newSite}
                                    </tbody>
                                </table>
                            </dd>

                            <dt>Locations</dt>
                            <dd>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr><th>Name</th><th>Address</th>
                                            {
                                                (this.props.account.org.plan !== 'lite' || !locations.length)
                                                    ? (<th><input type="button" value="+" onClick={this.addLocation.bind(this)} /></th>) : (<th></th>)
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            locations.map(function (key, index) {
                                                return (<Location key={index} index={index} location={key} updateLocations={this.updateLocations.bind(this)} removeLocation={this.removeLocation.bind(this)} />)
                                            }.bind(this))
                                        }
                                        {newLocation}
                                    </tbody>
                                </table>
                            </dd>

                            <dt>Data Sources</dt>
                            <dd>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th><th>Column Key</th><th>Profile Attribute</th>
                                            <th>Service</th>
                                            <th>Last Sync</th>
                                            <th><input type="button" value="+" /></th>
                                        </tr>
                                    </thead>
                                </table>
                            </dd>

                            <dt>HEAD HTML<br />(for preview only)</dt>
                            <dd>
                                {(this.state.editing.headHtml)
                                    ? (<span><span className="col-xs-10 col-md-6"><FormControl componentClass="textarea" placeholder="enter HTML HEAD code" value={this.state.value.headHtml} onChange={this.changeValue.bind(this, 'headHtml')} style={{ fontFamily: 'monospace', width: `${100}%` }} /></span><input type="button" value="Save" onClick={this.clickSave.bind(this, 'headHtml')} /><input type="button" value="Cancel" onClick={this.clickCancel.bind(this, 'headHtml')} /></span>)
                                    : (<span><span className="col-xs-10 col-md-6"><FormControl componentClass="textarea" value={this.state.settings.headHtml} disabled /></span> <span className="fa fa-pencil" onClick={this.clickEdit.bind(this, 'headHtml')}> </span></span>)
                                }
                            </dd>

                        </dl>

                    </Panel>

                    <Panel>
                        <h2>Account Settings</h2>
                        <dl className="dl-horizontal">
                            <dt>Plan Type</dt>
                            <dd>{this.props.account.org.plan.charAt(0).toUpperCase() + this.props.account.org.plan.slice(1)}</dd>
                            <dt>Users</dt>
                            <dd>
                                <ul>{this.props.account.org.users.map(function (key, index) {
                                    return (<li key={index}>{key}</li>)
                                })}</ul>
                            </dd>
                        </dl>
                    </Panel>
                </Well>
            </div>
        )
    }
}
