let ReactBootstrap = require('react-bootstrap')
import { CountrySelect } from '../common/selects'

function formattedDate (timestamp) {
    let d = new Date(timestamp * 1000)
    var dateString = `${d.toLocaleDateString().replace(/\/[^\/]+$/, '')  } - ${  d.toLocaleTimeString()}`;
    return dateString
}

function formattedLocation (data) {
    let loc
    loc = (data.city != '-' ? `${data.city  }, ` : '') +
        ((data.country == 'US' && data.state != '-') ? data.state : (['-', 'US'].indexOf(data.country) < 0) ? formattedCountry(data.country) : 'unknown')
    return loc
}

function formattedDuration (seconds) {
    if (!parseInt(seconds)) seconds = 0
    return new Date(null, null, null, null, null, seconds).toTimeString().match(/\d{1}:\d{2}:\d{2}/)[0]
}

function formattedCountry (code) {
    if (code === 'US') return code
    var countries = (new CountrySelect()).countries
    return countries[code]
}

class ProfileId extends React.Component {
    constructor (props) {
        super(props)
        this.state = { data: props.data }
    }

    componentWillReceiveProps (newProps) {
        this.setState({ data: newProps.data })
    }

    initPopover (data) {
        let Popover = ReactBootstrap.Popover
        return (

            <Popover id="popover-trigger-hover-focus" title={data.profile_id} style={{ maxWidth: `${70  }%` }}>
                {
                    ['counter_session', 'counter_view', 'timestamp', 'geo_city', 'geo_state', 'geo_country', 'clientIp', 'device_type', 'host', 'uri', 'referrer'].map((key, index) => {
                        switch (key) {
                            case 'timestamp':
                                return (<dl key={index} className="dl dl-horizontal"><dt>{key}</dt><dd>{formattedDate(data[key])}</dd></dl>)
                                break;
                            case 'geo_country':
                                return (<dl key={index} className="dl dl-horizontal"><dt>{key}</dt><dd>{formattedCountry(data[key])}</dd></dl>)
                                break;
                            default:
                                return (<dl key={index} className="dl dl-horizontal"><dt>{key}</dt><dd>{data[key]}</dd></dl>)
                                break;
                        }
                    }
                    )
                }
            </Popover>

        )
    }

    render () {
        let OverlayTrigger = ReactBootstrap.OverlayTrigger

        return (
            <OverlayTrigger trigger={['hover', 'click']} placement={this.props.position} overlay={this.initPopover(this.state.data)}>
                <span data-value={this.state.data.profile_id}><i className="fa fa-eye" onClick={() => this.props.jumpTab('profiles', { 'profile': this.state.data.profile_id })} /></span>
            </OverlayTrigger>
        )
    }
}

export default class ProfileListing extends React.Component {
    constructor (props) {
        super(props)
        this.refreshUpdate = this.refreshUpdate.bind(this)
        this.state = { profiles: props.profiles, sort: 'accessed', position: null, totals: {} }
    }
    componentDidMount () {
        this.props.refresh(this.props.group, this.refreshUpdate)
        this.setState({ position: ($(window).width() / 2 - $(this.refs.thel).offset().left) > 0 ? 'right' : 'left' })
    }
    componentWillUnmount () {
        if (this.refreshCounter)
            {clearTimeout(this.refreshCounter);}
    }
    componentWillReceiveProps (newProps) {
        let showProfiles = {}
        if (newProps.profiles && this.state.profiles && newProps.profiles.profiles && newProps.profiles.profiles[this.state.sort] && this.state.profiles.profiles /* && this.state.profiles.profiles.length */) {
            newProps.profiles.profiles[this.state.sort]
                .filter(p1 => !this.state.profiles.profiles[this.state.sort]
                    .some(p2 => p1.profile_id == p2.profile_id && p1.timestamp == p2.timestamp))
                .map(p => showProfiles[p.profile_id] = true)
            var profiles = JSON.parse(JSON.stringify(newProps.profiles))
            profiles.profiles[this.state.sort].map((p, i) => profiles.profiles[this.state.sort][i].show = (!!showProfiles[p.profile_id]))
        } else
            // sometimes we're merely switching to a different group
            {profiles = newProps.profiles;}
        let metrics = newProps.totalsMetrics ? newProps.totalsMetrics : this.state.metrics
        this.setState({ profiles, totals: metrics })
    }

    componentDidUpdate () {
        let position = ($(window).width() / 2 - $(this.refs.thel).offset().left) > 0 ? 'right' : 'left'
        if (position != this.state.position) this.setState({ position })
    }

    refreshUpdate (profiles, totalsMetrics) {
        this.setState({ profiles, totals: totalsMetrics })
    }

    changeSort (e) {
        let sort = e.target.value
        this.setState({ sort })
    }

    metricPercent (val, total, compare) {
        let percent = (total && val ? (
            compare
                ? Math.abs(Math.round((total - val) / total * 100))
                : Math.abs(Math.round(val / total * 100))
        )
            : (compare ? 100 : 0)
        )
        var carat = (val - total) > 0
            ? (<i key="carat" className="fa fa-sort-asc green"></i>)
            : (<i key="carat" className="fa fa-sort-desc red"></i>)
        if (percent > 200)
            {percent = [carat, (<em key="value">{Math.floor(percent / 100) + 'x'}</em>)]}
        else if (val == total) {
            percent = (<span key="prep">same as</span>)
        } else if (val && percent == 100) {
            percent = (<span key="prep">roughly</span>)
        } else
            {percent = [compare ? carat : (<span key="blank"></span>), (<em key="value">{percent}%</em>), (<span key="prep"> of</span>)];}
        return percent
    }

    render () {
        let Panel = ReactBootstrap.Panel
        var Table = ReactBootstrap.Table
        var Button = ReactBootstrap.Button
        var sProfiles = this.state.profiles && this.state.profiles.profiles ? this.state.profiles : { profiles: {}, metrics: {} }
        var profiles = sProfiles.profiles[this.state.sort] ? sProfiles.profiles[this.state.sort] : []
        var metrics = sProfiles.metrics

        return (
            <div>
                <div className="tabbable tabs-below">

                    <div className={'panel ' + this.props.group} style={{ margin: 0 }}>
                        <div className="panel-heading">
                            <h3 className="">{this.props.title ? (<span onClick={() => this.props.jumpTab('groups', { 'group': this.props.group })} style={{ cursor: 'pointer' }}>{this.props.title}</span>) : 'Profiles'}</h3>
                        </div>

                        <div className="tab-content" style={{ position: 'relative' }}>
                            <div className="tab-pane active" id={`profile-pane-${  this.props.group}`}>

                                <Table responsive striped style={{ minHeight: `${269  }px` }}>
                                    <thead>
                                        <tr>
                                            <th colSpan={5}>
                                                <span className="sort-by">Sort by: </span>
                                                <select onChange={this.changeSort.bind(this)} value={this.state.sort}>
                                                    <option value="accessed">last access time</option>
                                                    <option value="duration">total visit duration</option>
                                                    <option value="visits">total visits</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th ref="thel" className="col-sm-1">View</th>
                                            <th className="col-sm-5">Last Access</th>
                                            <th className="col-sm-3">Location</th>
                                            <th className="col-sm-2">Duration</th>
                                            <th className="col-sm-1">Visits</th>
                                        </tr>
                                    </thead>
                                    {
                                        profiles.length ? (
                                            <tbody style={{ height: `${200  }px`, overflowY: 'auto', width: `${100  }%`, position: 'absolute' }}>
                                                {
                                                    profiles.map(function (key, index) {
                                                        if (!this.props.maxRows || index < this.props.maxRows) {
                                                            let ref = `${this.props.group  }-${  index}`;
                                                            if (key.show) {
                                                                // $(this.refs[ref]).css('background','ilinear-gradient(#a01446, #740000), #ff9947');
                                                                setTimeout(function () { $(this.refs[ref]).css('background', '').css('color', '') }.bind(this), 500)
                                                            }
                                                            return (
                                                                <tr key={index} ref={ref} style={{ width: `${100  }%`, display: 'inline-table', tableLayout: 'fixed', WebkitTransition: 'background 200ms, color 200ms', MozTransition: 'background 200ms, color 200ms', transition: 'background 200ms, color 200ms', background: (key.show) ? 'linear-gradient(#a01446, #740000), #ff9947' : '', color: (key.show) ? 'white' : '' }}>
                                                                    <td className="col-xs-1"><ProfileId data={key} jumpTab={this.props.jumpTab} position={this.state.position} /></td>
                                                                    <td className="col-xs-5" data-value={key.timestamp}>{formattedDate(key.timestamp)}</td>
                                                                    <td className="col-xs-3" data-value={`${key.geo_city  }, ${  key.geo_state  }, ${  key.geo_country}`}>{formattedLocation({ city: key.geo_city, state: key.geo_state, country: key.geo_country })}</td>
                                                                    <td className="col-xs-2" data-value={key.visitDuration}>{formattedDuration(key.visitDuration)}</td>
                                                                    <td className="col-xs-1" data-value={key.counter_session} style={{ textAlign: 'right' }}>{key.counter_session}</td>
                                                                </tr>
                                                            )

                                                        }
                                                    }, this)
                                                }
                                            </tbody>
                                        ) : (<tbody><tr><td className="col-xs-12" colSpan={5}>No profiles for this group</td></tr></tbody>)
                                    }
                                </Table>
                                <div className="clearfix"></div>
                                <br />

                            </div>{ /* /profile pane */}

                            <div className="tab-pane" id={`metrics-pane-${  this.props.group}`}>

                                <div className="tile_count" style={{ height: `${269  }px` }}>

                                    <div className="col-sm-4 tile_stats_count">
                                        <span className="count_top">
                                            <i className="fa fa-users"></i> Unique Visitors
                                        </span>
                                        <div className="count">{metrics.visitors || 0}</div>
                                        {this.metricPercent(metrics.visitors, this.state.totals.visitors, false)} total
                                    </div>

                                    <div className="col-sm-4 tile_stats_count">
                                        <span className="count_top">
                                            <i className="fa fa-user"></i> Total Sessions
                                        </span>
                                        <div className="count">{metrics.sessions || 0}</div>
                                        {this.metricPercent(metrics.sessions, this.state.totals.sessions, false)} total
                                    </div>

                                    <div className="col-sm-4 tile_stats_count">
                                        <span className="count_top">
                                            <i className="fa fa-clock-o"></i> Average Duration
                                        </span>
                                        <div className="count">{formattedDuration(metrics.duration)}</div>
                                        {(this.metricPercent(metrics.duration, this.state.totals.duration, true))} average
                                    </div>

                                    <div className="col-sm-4 tile_stats_count">
                                        <span className="count_top">
                                            <i className="fa fa-database"></i> Member Matches
                                        </span>
                                        <div className="count">{metrics.matches || 0}</div>
                                        {this.metricPercent(metrics.matches, this.state.totals.matches, false)} total
                                    </div>

                                    <div className="col-sm-4 tile_stats_count">
                                        <span className="count_top">
                                            <i className="fa fa-file-code-o"></i> Page Views
                                        </span>
                                        <div className="count">{metrics.views || 0}</div>
                                        {this.metricPercent(metrics.views, this.state.totals.views, false)} total
                                    </div>

                                    <div className="clearfix"></div>
                                    <br />

                                </div>
                            </div>

                        </div>{ /* /tab content */}

                    </div>{ /* /panel */}

                    <ul className="nav nav-tabs">
                        <li className="active"><a href={`#profile-pane-${  this.props.group}`} data-toggle="tab">profiles</a></li>
                        <li><a href={`#metrics-pane-${  this.props.group}`} data-toggle="tab">metrics</a></li>
                    </ul>
                </div>

                <br />

            </div>
        )
    }
}
