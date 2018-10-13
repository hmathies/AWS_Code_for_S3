import React from 'react'
import Overview from './overview'
import Groups from './groups'
import Actions from './actions'
import Profiles from './profiles'
import Settings from './settings'
import UserProfile from '../common/user_profile'
import Loading from 'react-loader-advanced'

export default class MainContent extends React.Component {
    constructor (props) {
        super(props)
        this.updateOverview = this.updateOverview.bind(this)
        this.updateGroups = this.updateGroups.bind(this)
        this.updateProfiles = this.updateProfiles.bind(this)
        this.updateActions = this.updateActions.bind(this)
        this.updateSettings = this.updateSettings.bind(this)
        this.updateUserProfile = this.updateUserProfile.bind(this)
        this.getData = this.getData.bind(this)
        this.putData = this.putData.bind(this)
        this.persist = {}
        this.profiles = { groups: {}, metrics: {} }
        const profileDate = this.initProfileDate()
        props.sendProfileDate(profileDate)
        this.state = { overview: [], groups: [], profiles: [], actions: [], settings: { organization: '' }, metrics: {}, userProfile: [], group: props.group, account: props.account, profileDate, isLoading: true }
        this.getData()
        setInterval(this.getData, 10000)
    }

    componentWillReceiveProps (newProps) {
        const state = {}
        if (this.state.nav !== newProps.nav) { state.nav = newProps.nav }
        if (JSON.parse(JSON.stringify(this.state.account.org)) !== JSON.parse(JSON.stringify(newProps.account.org))) { state.account = newProps.account}
        this.setState(state)
    }

    updateOverview () {
        const newProps = {}
        $.extend(newProps, this.state.overview)
        this.setState({ overview: newProps })
        this.putData({ overview: newProps })
    }

    updateGroups (groups, callback) {
        // var newProps = {};
        // $.extend(newProps, this.state.groups);
        console.log({ Groups_updateGroups: groups })
        this.setState({ groups })
        this.putData({ groups }, callback)
    }

    updateProfiles () {
        const newProps = {}
        $.extend(newProps, this.state.profiles)
        this.setState({ profiles: newProps })
        this.putData({ profiles: newProps })
    }

    updateActions (actions) {
        // var newProps = {};
        // $.extend(newProps, this.state.actions);
        console.log({ Actions_updateActions: actions })
        this.setState({ actions })
        this.putData({ actions })
    }

    updateSettings (settings) {
        //    var newProps = {};
        //    $.extend(newProps, this.state.settings);
        console.log({ Settings_updateSettings: settings })
        this.setState({ settings })
        this.putData({ settings })
    }

    updateUserProfile () {
        const newProps = {}
        $.extend(newProps, this.state.userProfile)
        this.setState({ userProfile: newProps })
        // this.putData({profile:newProps});
    }

    getData () {
        $.get(this.props.system.url, { a: 'getConfig', o: this.state.account.org.id }, function (data) {
            console.log({ 'getData': data })
            const config = data.data
            this.setState({ groups: config.groups, actions: config.actions, settings: config.settings, metrics: config.metrics }, this.getBuckets())
            // when on overview page, adjust date when we go past midnight
            if (this.props.nav === 'overview') { this.updateProfileDate()}
            this.props.setSettings(config.settings)
            // this.getBuckets();
        }.bind(this), 'json')
    }

    setPersist (tab, data) {
        this.persist[tab] = data
    }
    initProfileDate () {
        const d = (new Date())
        const today = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + (d.getDate())
        this.profileDate = ''
        return today
    }
    setProfileDate (date) {
        const newDate = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + (date.getDate())
        const d = (new Date())
        const today = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + (d.getDate())
        this.profileDate = (newDate == today) ? '' : newDate
        // rerun buckets
        this.override = true
        this.getBuckets(true)
        this.props.sendProfileDate((this.profileDate === '') ? today : newDate)
        this.setState({ isLoading: true, profileDate: (this.profileDate == '') ? today : newDate })
    }
    updateProfileDate () {
        if (this.profileDate === '') {
            const d = (new Date())
            const today = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + (d.getDate())
            if (this.state.profileDate !== today) {
                this.props.sendProfileDate(today)
                this.setState({ profileDate: today })
            }
        }
    }

    getProfile (pid) {
        $.get(this.props.system.url, { a: 'getProfile', o: this.state.account.org.id, p: pid }, function (data) {
            console.log({ 'getProfileData ': pid })
            const profileDetail = data.data.profile.Items
            this.setState({ profileDetail })
        }.bind(this), 'json')
    }

    getBuckets (override) {
        if (!override && (this.isFetchingBuckets || !this.hasBuckets)) { return}
        this.isFetchingBuckets = true

        $(document).ajaxError(function () { setTimeout(function () { this.isFetchingBuckets = false }.bind(this), 30000) }.bind(this))
        $.get(this.props.system.url, { a: 'getProfiles', o: this.state.account.org.id, d: this.profileDate }, function (data) {
            if (override || !this.override) {
            // execute if we have come in from override request, or if no override request exists
                this.override = false
                this.profiles = JSON.parse(JSON.stringify(data.data.profiles))
                this.isFetchingBuckets = false
                if (JSON.stringify(this.profiles) !== JSON.stringify(this.state.profiles)) { this.setState({ profiles: this.profiles, isLoading: false })}
            }
        }.bind(this), 'json')
    }

    getProfiles (group, callback) {
        if (callback) { callback(group ? this.profiles.groups[group] : [], this.profiles.metrics) }
        this.setState({ profiles: this.profiles, bucket: group })
        // send all bucket profiles to groups, so they can select and get immediate listing
    }

    uploadFile (data) {
        // fd: formdata to be sent
        data.action = 'upload'
        data.org = this.state.account.org.id
        console.log({ data })

        $.ajax({
            // Your server script to process the upload
            url: this.props.system.url,
            type: 'PUT',

            // Form data
            data,

            // Tell jQuery not to process data or worry about content-type
            // You *must* include these options!
            cache: false,
            contentType: false,
            processData: false,

            // Custom XMLHttpRequest
            xhr () {
                let myXhr = $.ajaxSettings.xhr()
                if (myXhr.upload) {
                    // For handling the progress of the upload
                    myXhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            $('progress').attr({
                                value: e.loaded,
                                max: e.total
                            })
                        }
                    }, false)
                }
                return myXhr
            },
            success (data) {
                console.log({ post_upload_success: data })
            }
        })
    }

    putData (data, callback) {
        data.org = this.state.account.org.id
        console.log({ 'putData': { raw: data, json: JSON.stringify(data) } })
        $.post(this.props.system.url, /* JSON.stringify */(data), function (response) {
            if (callback) {
                callback()
            }
            this.getData()
        }.bind(this), 'json')
    }

    render () {
        const defaultColumnStyle = { minHeight: 1647 }
        let content = ''
        switch (this.props.nav) {
            case 'overview':
                this.hasBuckets = true
                content = (
                    <div className="right_col" role="main" style={defaultColumnStyle}>
                        <div className="clear"></div>
                        <Overview overview={this.state.overview} updateData={this.updateOverview} groups={this.state.groups} group={this.state.bucket} monthlyMetrics={this.state.metrics} profileDate={this.state.profileDate} setProfileDate={this.setProfileDate.bind(this)} getProfiles={this.getProfiles.bind(this)} profiles={this.state.profiles} jumpTab={this.props.jumpTab} />
                    </div>
                )
                break

            case 'groups':
                this.hasBuckets = true
                // group can be set if linking from a profile_listing, or by clicking groups tab
                // if it's a subsequent group view, persistent group should only be sent in the latter case
                const group = this.props.group ? this.props.group : (this.persist.groups && this.persist.groups.group ? this.persist.groups.group : '')
                content = (
                    <div className="right_col" role="main">
                        <div className="clear"></div>
                        <Groups groups={this.state.groups} updateData={this.updateGroups} account={this.state.account} settings={this.state.settings} jumpTab={this.props.jumpTab} getProfiles={this.getProfiles.bind(this)} profiles={this.state.profiles} setPersist={this.setPersist.bind(this, 'groups')} {...this.persist.groups} group={group} />
                    </div>
                )
                break

            case 'profiles':
                this.hasBuckets = false
                content = (
                    <div className="right_col" role="main" style={defaultColumnStyle}>
                        <div className="clear"></div>
                        <Profiles profileDetail={this.state.profileDetail} profile={this.props.profile} getProfile={this.getProfile.bind(this)} updateData={this.updateProfiles.bind(this)} getProfiles={this.getProfiles.bind(this)} uploadFile={this.uploadFile.bind(this)} setPersist={this.setPersist.bind(this, 'profiles')} {...this.persist.profiles} />
                    </div>
                )
                break

            case 'actions':
                this.hasBuckets = false
                content = (
                    <div className="right_col" role="main" style={defaultColumnStyle}>
                        <div className="clear"></div>
                        { /* must supply list of groups to apply to action's audience */}
                        <Actions actions={this.state.actions} updateData={this.updateActions} groups={this.state.groups} settings={this.state.settings} account={this.state.account} jumpTab={this.props.jumpTab} setPersist={this.setPersist.bind(this, 'actions')} {...this.persist.actions} />
                    </div>
                )
                break

            case 'settings':
                this.hasBuckets = false
                content = (
                    <div className="right_col" role="main" style={defaultColumnStyle}>
                        <div className="clear"></div>
                        <Settings settings={this.state.settings} updateData={this.updateSettings} account={this.state.account} />
                    </div>
                )
                break

            case 'userProfile':
                this.hasBuckets = false
                content = (
                    <div className="right_col" role="main" style={defaultColumnStyle}>
                        <div className="clear"></div>
                        <UserProfile userProfile={this.state.userProfile} updateData={this.updateUserProfile} account={this.state.account} />
                    </div>
                )
                break
        }
        // return content == '' ? (<div></div>) : ([<Loadable active={this.state.isLoading} spinner text="Loading...">, content, </Loadable>]) ;
        const spinner = (<h1 style={{ color: 'white' }}><span className="glyphicon glyphicon-refresh glyphicon-spin"></span> Loading...</h1>)
        return (content === '') ? (<div></div>) : (<Loading show={this.state.isLoading} message={spinner} contentBlur={3} style={{ position: 'static', zIndex: -1 }} foregroundStyle={{ color: 'rgba(01, 68, 144, 0.88)' }}>{content}</Loading>)
    }
}
