import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import $ from 'jquery'
// import { FormControl } from 'react-bootstrap/lib'
// import DateControl from '../common/date_picker'

/*************************
** LeftNav **
*************************/
import Tab from './tab'
const heightTrapSelector = '.right_col'
const heightTrapInterval = 1000

/*************************
** TopNav **
*************************/
export class TopNav extends React.Component {
    static propTypes = {
        setOrg: PropTypes.func.isRequired,
        account: PropTypes.instanceOf(Object).isRequired
    }
    state = {
        showOrgSelect: false,
        org: ''
    }
    constructor (props) {
        super(props)
        this.state = { showOrgSelect: false, org: props.account.org }
    }
    componentDidMount () {
        // $.getScript('/react/components/importer/custom.js', () => UX_init())
        this.setState({ org: this.props.account.org })
    }

    onSelectToggle (toggle) {
        this.setState({ showOrgSelect: toggle })
    //        if (toggle) { $('select[name=orgSelect]').click() }
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
            paddingTop: '5px',
            marginTop: '10px',
            marginLeft: '60px',
            display: 'inline-block'
        }
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
                                            this.props.account.orgs.map(org => {
                                                return (<option key={org.id} value={org.id}>{org.name}</option>)
                                            })
                                        }
                                    </select>
                                </h3>
                            ) : (
                                <h3 className="organization" style={h3Style}>
                                    {this.state.org.name} <span className="glyphicon glyphicon-triangle-bottom" style={{ fontSize: '20px' }} onClick={this.onSelectToggle.bind(this, true)}></span>
                                </h3>
                            )}
                        <ul className="nav navbar-nav navbar-right pull-right">
                            <li className="">
                                <a href="#" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <img src={this.props.account.info.profileImg} alt={`${this.props.account.info.firstName} ${this.props.account.info.lastName}`} />{this.props.account.info.firstName} {this.props.account.info.lastName}
                                    <span className=" fa fa-angle-down"></span>
                                </a>
                                <ul className="dropdown-menu dropdown-usermenu pull-right">
                                    <li><a href="user-settings">User Settings</a></li>
                                    <li><a href="help">Help</a></li>
                                    <li><a href="/"><i className="fa fa-sign-out pull-right"></i> Log Out</a></li>
                                </ul>
                            </li>

                        </ul>
                        <div className="col-xs-6 col-md-3 ool-lg-2 pull-right" style={{ marginTop: '15px' }}>
                            {/* ProfileDate Location */}
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export class LeftNav extends React.Component {
    static propTypes = {
        changeTab: PropTypes.func.isRequired,
        nav: PropTypes.string.isRequired,
        account: PropTypes.instanceOf(Object).isRequired
    }
    constructor (props) {
        super(props)
        this.changeTab = tab => this.props.changeTab(tab)
        this.state = {
            height: null,
            plan: props.account.org.plan
        }
    }

    checkHeight () {
        const newHeight = $(heightTrapSelector).height() + 10 + 17 // 10 for right margin, 17 for scrollbar down button
        if ($('.left_col').height() !== newHeight) {
            this.setState({ height: newHeight })
        }
    }

    componentWillReceiveProps (newProps) {
        if (newProps.account && newProps.account.org && newProps.account.org !== this.props.account.org) {
            this.setState({ plan: this.props.account.org.plan })
        }
    }

    componentDidMount () {
        this.checkHeight()
        this.docHeightTrap = setInterval(this.checkHeight.bind(this), heightTrapInterval)
    }

    render () {
        const tabNames = [
            { name: 'Overview', faIconName: 'bar-chart-o' },
            { name: 'Data', faIconName: 'database' },
            { name: 'Settings', faIconName: 'cog' }
        ]

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
                                <Route>
                                    {context => {
                                        const path = context.location.pathname
                                        return tabNames.map(tab => {
                                            const { name, faIconName } = tab
                                            return (
                                                <Tab
                                                    key={name}
                                                    tabName={name}
                                                    faIconName={faIconName}
                                                    active={path.toLowerCase().indexOf(name.toLowerCase()) >= 0}
                                                />
                                            )
                                        })
                                    }}
                                </Route>
                            </ul> { /* .nav.side-menu */}
                        </div> { /* .menu_section.active */}
                    </div> { /* #sidebar-menu */}
                </div> { /* .left_col */}
            </div> // col-md-3

        )
    }
}
