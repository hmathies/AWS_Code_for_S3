import React from 'react'
import DateControl from '../common/date_picker'
import ReactBootstrap from 'react-bootstrap'
const heightTrapSelector = '.right_col'
const heightTrapInterval = 1000

export class TopNav extends React.Component {
    constructor (props) {
        super(props)
        this.changeTab = tab => this.props.changeTab(tab)
        this.state = { showOrgSelect: false, org: props.account.org, profileDate: props.profileDate }
    }
    componentDidMount () {
        $.getScript('/react/components/personalizer/custom.js', () => UX_init())
    }

    componentWillReceiveProps (newProps) {
        if (newProps.profileDate !== this.state.profileDate) {
            this.setState({ profileDate: newProps.profileDate })
        }
    }

    onSelectToggle (toggle) {
        this.setState({ showOrgSelect: toggle })
        if (toggle) { $('select[name=orgSelect]').click() }
    }

    onChange (e) {
        const org = (this.props.account.orgs.filter(o => o.id === e.target.value))[0]
        this.setState({ org, showOrgSelect: false })
        this.props.setOrg(org)
    }

    onBlur () {
        this.setState({ showOrgSelect: false })
    }

    render () {
        const h3Style = {
            paddingTop: `${5  }px`,
            marginTop: `${10  }px`,
            marginLeft: `${60  }px`,
            display: 'inline-block'
        }
        const { FormControl } = ReactBootstrap
        return (
            <div className="top_nav">
                <div className="nav_menu">
                    <nav className="" role="navigation">
                        <div className="nav toggle pull-left" style={{ position: 'absolute' }}>
                            <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                        </div>
                        {(this.state.showOrgSelect)
                            ? (
                                <h3 className="organization" style={h3Style}>
                                    <select name="orgSelect" onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} defaultValue={this.state.org.id}>
                                        {
                                            this.props.account.orgs.map((org, index) => {
                                                return (<option key={index} value={org.id}>{org.name}</option>)
                                            })
                                        }
                                    </select>
                                </h3>
                            ) : (
                                <h3 className="organization" style={h3Style}>
                                    {this.state.org.name} <span className="glyphicon glyphicon-triangle-bottom" style={{ fontSize: `${20  }px` }} onClick={this.onSelectToggle.bind(this, true)}></span>
                                </h3>
                            )}
                        {
                            this.props.account.orgs.length ? this.props.account.orgs.map((k, index) => (
                                <FormControl componentClass="select" key={index} value={k} />
                            )) : null
                        }
                        <ul className="nav navbar-nav navbar-right pull-right">
                            <li className="">
                                <a href="#" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <img src={this.props.account.info.profileImg} alt={`${this.props.account.info.firstName  } ${  this.props.account.info.lastName}`} />{this.props.account.info.firstName} {this.props.account.info.lastName}
                                    <span className=" fa fa-angle-down"></span>
                                </a>
                                <ul className="dropdown-menu dropdown-usermenu pull-right">
                                    <li><a href="#" onClick={this.changeTab.bind(this, 'userProfile')}>User Settings</a></li>
                                    <li><a href="#">Help</a></li>
                                    <li><a href=""><i className="fa fa-sign-out pull-right"></i> Log Out</a></li>
                                </ul>
                            </li>

                        </ul>
                        <div className="col-xs-6 col-md-3 ool-lg-2 pull-right" style={{ marginTop: '15px' }}><DateControl profileDate={this.state.profileDate} setProfileDate={this.props.setProfileDate} /></div>
                    </nav>
                </div>
            </div>
        )
    };
}

export class LeftNav extends React.Component {
    constructor (props) {
        super(props)
        this.changeTab = tab => this.props.changeTab(tab)
        this.state = { height: null, plan: props.account.org.plan }
    }

    checkHeight () {
        const newHeight = $(heightTrapSelector).height() + 10 + 17 // 10 for right margin, 17 for scrollbar down button
        if ($('.left_col').height() !== newHeight) {
            this.setState({ height: newHeight })
        }
    }

    componentWillReceiveProps (newProps) {
        if (newProps.account && newProps.account.org && newProps.account.org != this.props.account.org) {
            this.setState({ plan: this.props.account.org.plan })
        }
    }

    componentDidMount () {
        this.checkHeight()
        this.docHeightTrap = setInterval(this.checkHeight.bind(this), heightTrapInterval)
    }

    render () {
        return (
            <div className="col-md-3 left_col" style={{ height: this.state.height ? `${this.state.height}px` : 'inherit' }}>
                <div className="left_col scroll-view">
                    <div className="navbar nav_title">
                        <a href="/" className="site_title"><span><img src="/logo.png" style={{ maxWidth: 200 }} alt="Influent Metrics" /></span></a>
                    </div>

                    <div className="clearfix"></div>

                    <div className="profile">
                        <div className="org_pic">
                        </div>
                    </div>

                    <div className="clearfix"></div>

                    <br />

                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                        <div className="menu_section active">
                            <h3>&nbsp;</h3>
                            <ul className="nav side-menu">
                                <li className="active nav-overview" onClick={this.changeTab.bind(this, 'overview')}><a><i className="fa fa-bar-chart-o"></i> Overview</a>
                                    <ul className="nav child_menu hidden">
                                        <li className="current-page"><a href="/">Dashboard1</a></li>
                                        <li><a href="/dashboard/2">Dashboard2</a></li>
                                        <li><a href="/dashboard/3">Dashboard3</a></li>
                                        <li><a href="/dashboard/add"><strong>Add Dashboard <span className="fa fa-plus"></span></strong></a></li>
                                    </ul>
                                </li>

                                <li className="nav-groups" onClick={this.changeTab.bind(this, 'groups')}><a><i className="fa fa-users"></i> Groups</a>
                                    <ul className="nav child_menu hidden">
                                        <li><a href="form_advanced.html">On Site Now</a></li>
                                        <li><a href="form_advanced.html">Local Monthly</a></li>
                                        <li><a href="form_validation.html">First Timers</a></li>
                                        <li><a href="form_wizards.html">Active in Library</a></li>
                                        <li><a href="index.html"><strong>Add Group <span className="fa fa-plus"></span></strong></a></li>
                                    </ul>
                                </li>

                                <li className="nav-profiles" onClick={this.changeTab.bind(this, 'profiles')}><a><i className="fa fa-database"></i> Profiles</a>
                                    <ul className="nav child_menu hidden">
                                        <li><a href="form_advanced.html">Profile Search</a></li>
                                        <li><a href="form_validation.html">Upload User Data</a></li>
                                    </ul>
                                </li>

                                {
                                    (['standard', 'premium'].indexOf(this.state.plan) >= 0) ? (
                                        <li className="nav-actions" onClick={this.changeTab.bind(this, 'actions')}><a><i className="fa fa-check-circle"></i> Actions</a>
                                            <ul className="nav child_menu hidden">
                                                <li><a href="form_advanced.html">Web Personalization</a></li>
                                                <li><a href="form_validation.html">Email List</a></li>
                                                <li><a href="index.html"><strong>Add Action <span className="fa fa-plus"></span></strong></a></li>
                                            </ul>
                                        </li>
                                    ) : ''
                                }
                                {
                                    (['standard', 'premium'].indexOf(this.state.plan) >= 0) ? (

                                        <li><a className="disabled"><i className="fa fa-heart-o"></i> Insights <span className="label label-success pull-right">Coming Soon</span></a>
                                        </li>
                                    ) : ''
                                }

                                <li className="nav-settings" onClick={this.changeTab.bind(this, 'settings')}><a><i className="fa fa-cog"></i> Settings</a>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className="sidebar-footer hidden-small" style={{ display: 'none' }}>
                        <a data-toggle="tooltip" data-placement="top" title="" data-original-title="FullScreen">
                            <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Lock">
                            <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Logout">
                            <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
                        </a>
                    </div>

                </div>
            </div>
        )
    }
};
