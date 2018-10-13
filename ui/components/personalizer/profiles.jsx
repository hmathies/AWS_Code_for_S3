import React from 'react'

export default class Profiles extends React.Component {
    state = {
        profile: this.props.profile,
        profileDetail: this.props.profileDetail,
        treeDisplay: null,
        searchProfileId: '',
        profileList: this.props.profileList ? this.props.profileList : {}
    }

    componentDidMount () {
        if (this.props.profile) {
            this.props.getProfile(this.props.profile)
        }
    }

    componentWillUnmount () {
        this.props.setPersist({ profileList: this.state.profileList })
    }

    componentWillReceiveProps (newProps) {
        // if (newProps.profile && this.state.profile != newProps.profile)
        // this.props.getProfile(newProps.profile);
        const { profileList } = this.state
        if (newProps.profileDetail && newProps.profileDetail.length) {
            profileList[newProps.profileDetail[0].profile_id] = newProps.profileDetail
            // this.setState(newProps);
            this.setState({ profileList })
        }
    }

    renderNode (node) {
        return (
            <span>{node.module}</span>
        )
    }

    uploadFile (e) {
        const fd = new FormData()
        fd.append('file', this.refs.file.files[0])
        fd.file = this.refs.file.files[0]
        console.log(fd)
        this.props.uploadFile(fd)
        if (e) { e.preventDefault() }
    }

    removeProfileView (profileId) {
        const { profileList } = this.state
        delete profileList[profileId]
        this.setState({ profileList })
    }

    render () {
        let profileData, profiles
        const profileListView = []
        Object.keys(this.state.profileList).map(profileId => {
            const profileDetail = this.state.profileList[profileId]
            profileData = {}
            if (profileDetail && profileDetail.length) {
                profiles = profileDetail
                profiles.sort((a, b) => a.timestamp - b.timestamp)
                profileData = { sessions: [] }
                profiles.map(key => {
                    const counterSession = +key.counterSession
                    const counterView = +key.counterView
                    if (counterSession && counterView) {
                        profileData.timestamp = key.timestamp
                        if (!profileData.sessions[counterSession]) {
                            profileData.sessions[counterSession] = { views: [] }
                        }
                        if (!profileData.sessions[counterSession].views[counterView]) {
                            profileData.sessions[counterSession].views[counterView] = {}
                        }
                        Object.keys(key).map(field => {
                            if (['timestamp', 'uri', 'referrer', 'host', 'counterView'].indexOf(field) >= 0) {
                                profileData.sessions[counterSession].views[counterView][field] = key[field]
                            } else if (field.match(/^custom_/) || field === 'profile_id') {
                                profileData[field] = key[field]
                                profileData.sessions[counterSession][field] = key[field]
                            } else { profileData.sessions[counterSession][field] = key[field] }
                        })
                    }
                })

                profileListView.push(profileData)
            }
        })

        //    console.log({profileListView:profileListView});

        return (
            <div className="profiles-pane rows">
                <h1>Profiles</h1>

                <div className="row">

                    <div className="panel panel-body col-xs-12 col-md-4">
                        <h3>Search</h3>
                        <input type="text" className="col-xs-8" name="search_profile_id" placeholder="profile_id to search" value={this.state.searchProfileId} onChange={(e => { this.setState({ searchProfileId: e.target.value }) })} />
                        <input type="button" value="Search" onClick={(pid => { this.props.getProfile(pid) }).bind(this, this.state.searchProfileId)} />
                    </div>

                    <div className="panel panel-body col-xs-12 col-md-4">
                        <h3>Upload Membership Data</h3>
                        <form ref="uploadForm" className="uploader well col-xs-12" encType="multipart/form-data" >
                            <input ref="file" type="file" name="file" className="upload-file pull-left" />
                            <input type="button" ref="button" value="Upload" onClick={this.uploadFile.bind(this)} className="pull-left" />
                            <div className="clearfix"></div>
                        </form>
                    </div>

                </div>

                <p className="clearfix">&nbsp;</p>

                {
                    profileListView.map((profileView, index) => {
                        return (
                            <div className="panel col-xs-12 col-md-4" key={index}>
                                <div className="panel-head">
                                    <div className="pull-left">{profileView.profile_id}</div>
                                    <div className="pull-right"><span className="fa fa-remove" onClick={this.removeProfileView.bind(this, profileView.profile_id)}></span></div>
                                </div>
                                <div className="panel-body" style={{ minHeight: '120px' }}>
                                    <div className="row">
                                        <div className="pull-left" style={{ position: 'absolute', margin: '10px' }} >
                                            {profileView.custom_thumb ? (<img src={profileView.custom_thumb} style={{ minWidth: '80px' }} />) : ''}
                                        </div>
                                        <div style={{ marginLeft: profileView.custom_thumb ? '120px' : 0 }}>
                                            {
                                                (profileView.profile_id) ? (
                                                    <div className="row">
                                                        <TreeNode name={`Profile Data (${profileView.profile_id})`} value={profileView} expanded={true} style={{ maxHeight: '400px' }} />
                                                    </div>
                                                ) : (<div></div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <p className="clearfix">&nbsp;</p>

            </div>

        )
    }
}

class TreeNode extends React.Component {
    constructor (props) {
        super(props)
        this.state = { expanded: (true && props.expanded) }
    }

    toggle () { this.setState({ expanded: !this.state.expanded }) };

    transform (key, value) {
        switch (key) {
            case 'timestamp': case 'sessionStartTime': case 'geo_ttl':
                return (new Date(value * 1000)).toString().split(/ /, 5).join(' '); break
            case 'sinceLastVisit': case 'view_duration':
                const d = s => { 
                    const f = Math.floor
                    const g = n => (`00${n}`).slice(-2)
                    return `${f(s / 3600)}:${g(f(s / 60) % 60)}:${g(s % 60)}`
                }
                return d(value)
        }
        return value
    }

    render () {
        const key = this.props.name
        const { value } = this.props

        return (
            <div className="clear" style={{ overflow: 'auto' }}>
                <div>
                    {(value instanceof Object || value instanceof Array) ? (<span className={this.state.expanded ? 'fa fa-caret-down' : 'fa fa-caret-right'} onClick={this.toggle.bind(this)}>&nbsp;</span>) : ''}
                    <span className="key"><strong>{key}</strong></span>
                    {(typeof value === 'string')
                        ? (<span>: <span className="value">&quot;{this.transform(key, value)}&quot;</span></span>)
                        : (typeof value === 'number') ? (<span>: <span className="value">{this.transform(key, value)}</span></span>) : ''}
                </div>
                {
                    (value instanceof Object) ? (
                        <ul className={!this.state.expanded ? 'hidden' : ''} style={this.props.style}>
                            {
                                Object.keys(value).sort((a, b) => (
                                    ['sessions', 'views'].indexOf(a) >= 0 ? 1
                                        : (!(isNaN(+a) || isNaN(+b))) ? parseInt(a) - parseInt(b)
                                            : a.localeCompare(b)
                                )).map((k, i) => {
                                    return (<TreeNode key={i} name={k} value={value[k]} expanded={['sessions', 'views'].indexOf(k) >= 0} />)
                                })
                            }
                        </ul>
                    ) : (value instanceof Array) ? (
                        <ul className={!this.state.expanded ? 'hidden' : ''}>
                            {
                                value.map((k, i) => {
                                    return (<div key={i}><TreeNode name={i} value={k} /></div>)
                                })
                            }
                        </ul>
                    ) : ''
                }
            </div>
        )
    }
}
