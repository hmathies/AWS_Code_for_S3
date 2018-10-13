import React from 'react'
import ProfileListing from './profile_listing'
// import DateControl from './date_picker.js'

export class DailyGraph extends React.Component {

    componentDidUpdate () {
        const gd = (year, month, day) => {
            return new Date(year, month - 1, day).getTime()
        }

        const d = (new Date())
        const date = parseInt(d[2]) * 1000 + parseInt(d[0]) * 100 + parseInt(d[1])
        if (!this.props.data) { return }
        let keys = Object.keys(this.props.data).filter(d => parseInt(d) > 20170101).sort()
        const data1 = []
        const data2 = []
        keys.slice(Math.max(keys.length - 30 + 1, 0)).map(k => {
            const y = parseInt(k.slice(0, 4))
            const m = parseInt(k.slice(4, 6))
            const d = parseInt(k.slice(6, 8))
            data1.push([gd(y, m, d), this.props.data[k].pageViews])
            data2.push([gd(y, m, d), this.props.data[k].uniqueVisitors])
        })
        $('#canvas_dahs').length && $.plot($('#canvas_dahs'), [
            data1, data2
        ], {
            series: {
                lines: {
                    show: false,
                    fill: true
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.4
                },
                points: {
                    radius: 0,
                    show: true
                },
                shadowSize: 2
            },
            grid: {
                verticalLines: true,
                hoverable: true,
                clickable: true,
                tickColor: '#d5d5d5',
                borderWidth: 1,
                color: '#fff'
            },
            colors: ['rgba(21, 118, 194, 0.38)', 'rgba(21, 118, 194, 0.38)'],
            xaxis: {
                tickColor: 'rgba(51, 51, 51, 0.06)',
                mode: 'time',
                tickSize: [1, 'day'],
                // tickLength: 10,
                axisLabel: 'Date',
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 10
            },
            yaxis: {
                ticks: 8,
                tickColor: 'rgba(51, 51, 51, 0.06)'
            },
            tooltip: false
        })
    }

    render () {
        return (
            <div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="dashboard_graph">

                        <div className="row x_title">
                            <div className="col-md-6">
                                <h3>Monthly Metrics <small>Unique Visitors and Page Views</small></h3>
                            </div>
                            <div className="col-md-6">
                                <div id="reportrange" className="pull-right" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc' }}>
                                    <i className="glyphicon glyphicon-square fa fa-square" style={{ color: 'rgba(21, 118, 194, 0.38)' }}></i> Page Views
                                </div>
                                <div id="reportrange" className="pull-right" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc' }}>
                                    <i className="glyphicon glyphicon-square fa fa-square" style={{ color: 'rgba(21, 118, 194, 0.76)' }}></i> Unique Visitors
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12">
                            <div id="placeholder33" style={{ height: '260px', display: 'none' }} className="demo-placeholder"></div>
                            <div style={{ width: '100%' }}>
                                <div id="canvas_dahs" className="demo-placeholder" style={{ width: '100%', height: '270px' }}>
                                    {(!this.props.data) ? 'Not enough data collected' : ''}
                                </div>
                            </div>
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </div>

            </div>
        )
    }
}

export default class Overview extends React.Component {
    constructor (props) {
        super(props)
        // since this is the opening tab, we may not yet have data on initial opening, though we'd get it if
        // switching into this tab.
        const bucketList = {}
        if (Object.keys(props.groups)) {
            Object.keys(props.groups).map(group => bucketList[group] = [])
        }
        if (props.profiles && props.profiles.groups && props.profiles.metrics) {
            this.state = { bucketList: props.profiles.groups, metrics: props.profiles.metrics, profileDate: props.profileDate }
        } else {
            this.state = { metrics: { visitors: 0, sessions: 0, views: 0, duration: 0, averageDuration: 0, matches: 0 }, bucketList, profileDate: props.profileDate }
        }
    }

    componentWillReceiveProps (newProps) {
        if (newProps.profiles && newProps.profiles.groups) {
            this.setState({ bucketList: newProps.profiles.groups })
        } else if (!Object.keys(this.state.bucketList).length) {
            const bucketList = {}
            Object.keys(newProps.groups).map(key => {
                bucketList[key] = []
            })
            this.setState({ bucketList })
        }
        if (newProps.profiles && newProps.profiles.metrics) {
            this.setState({ metrics: newProps.profiles.metrics })
        }
        /*
        if (newProps.profileDate != this.state.profileDate) {
          this.setState({ profileDate:newProps.profileDate });
        }
        */
    }

    componentDidMount () {
        // this.props.getProfiles(null, ((profiles) => { this.setState({ bucketList:profiles.groups }) }).bind(this) );
        // $.getScript('/react/js/Flot/jquery.flot.js');
        // $.getScript('/react/js/Flot/jquery.flot.time.js');
    }

    setStats () {
    }

    refreshProfiles (group) {
        const callback = this.refs[group] ? this.refs[group].refreshUpdate : null
        if (group) {
            this.props.getProfiles(group, callback)
        } else {
            this.props.getProfiles(null, profiles => { this.setState({ bucketList: profiles.groups }) })
        }
    }

    render () {
        const { metrics } = this.state
        metrics.views = metrics.views || 0
        metrics.visitors = metrics.visitors || 0
        const bucketOrder =
            (this.state.bucketList)
                ? Object.keys(this.state.bucketList).sort((a, b) => {
                    const A = this.state.bucketList[a].metrics
                    const B = this.state.bucketList[b].metrics
                    return (A && B ? B.visitors - A.visitors : -1)
                })
                : this.state.bucketList
        let pageViewsSub = (<div></div>)
        let uniqueVisitorsSub = (<div></div>)
        if (this.props.monthlyMetrics) {
            const metricsKeys = Object.keys(this.props.monthlyMetrics)
            const list = metricsKeys.filter(d => d > 20170101).sort()
            let prior = list.indexOf(this.props.profileDate)
            prior = prior < 0 ? list.length - 1 : prior - 1
            if (prior && list[prior] && this.props.monthlyMetrics[list[prior]]) {
                const yesterday = this.props.monthlyMetrics[list[prior]]
                const pageViewsCompare = yesterday.pageViews ? Math.round(((metrics.views - yesterday.pageViews) / yesterday.pageViews) * 100) : ''
                const uniqueVisitorsCompare = yesterday.uniqueVisitors ? Math.round(((metrics.visitors - yesterday.uniqueVisitors) / yesterday.uniqueVisitors) * 100) : ''
                pageViewsSub = (pageViewsCompare >= 0)
                    ? (<div><i className="fa fa-sort-asc green"></i> <span className="green">{pageViewsCompare}%</span> <span>from prior day</span></div>)
                    : (<div><i className="fa fa-sort-desc red"></i> <span className="red">{Math.abs(pageViewsCompare)}%</span> <span>from prior day</span></div>)
                uniqueVisitorsSub = (uniqueVisitorsCompare >= 0)
                    ? (<div><i className="fa fa-sort-asc green"></i> <span className="green">{uniqueVisitorsCompare}%</span> <span>from prior day</span></div>)
                    : (<div><i className="fa fa-sort-desc red"></i> <span className="red">{Math.abs(uniqueVisitorsCompare)}%</span> <span>from prior day</span></div>)
            }
        }

        return (
            <div className="overview-pane rows">
                <h1>Overview</h1>
                <div className="row tile_count overview-dailies">
                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                        <span className="count_top"><i className="fa fa-users"></i> Total Unique Visitors</span>
                        <div className="count">{metrics.visitors}</div>
                        {uniqueVisitorsSub}
                    </div>

                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                        <span className="count_top"><i className="fa fa-user"></i> Total Sessions</span>
                        <div className="count">{metrics.sessions ? metrics.sessions : 0}</div>
                        {/* <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>3% </i> From last week</span> */}
                    </div>

                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                        <span className="count_top"><i className="fa fa-file-code-o"></i> Total Page Views</span>
                        <div className="count">{metrics.views}</div>
                        {pageViewsSub}
                        {/* <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>34% </i> From last week</span> */}
                    </div>

                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                        <span className="count_top"><i className="fa fa-clock-o"></i> Average Time Per Session</span>
                        {/* <div className="count">{ metrics.averageDuration ? new Date(null, null, null, null, null, metrics.averageDuration).toTimeString().match(/\d{1}:\d{2}:\d{2}/)[0] : 0 }</div> */}
                        <div className="count">{metrics.duration ? new Date(null, null, null, null, null, metrics.duration).toTimeString().match(/\d{1}:\d{2}:\d{2}/)[0] : 0}</div>
                        {/* <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>3% </i> From last week</span> */}
                    </div>

                    <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                        <span className="count_top"><i className="fa fa-user"></i> Member Matches</span>
                        <div className="count">0</div>
                        {/* <span className="count_bottom">0% of total profiles</span> */}
                    </div>
                </div>

                <DailyGraph data={this.props.monthlyMetrics} />
                <div className="clearfix">&nbsp;</div>

                <div className="buckets">
                    {
                        bucketOrder.map((key, index) => {
                            return (this.props.groups[key]) ? (
                                <div key={index} className="col-xs-12 col-md-4" style={{ minWidth: `${470  }px`, height: `${442  }px` }}>
                                    <ProfileListing ref={key} maxRows={50} title={this.props.groups[key].name} group={key} profiles={this.state.bucketList[key]} refresh={this.props.getProfiles} jumpTab={this.props.jumpTab} totalsMetrics={this.state.metrics} />
                                </div>
                            ) : ''
                        })
                    }
                </div>
                <div className="clearfix">&nbsp;</div>
            </div>
        )
    }
}
