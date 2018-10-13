import React from 'react'
import ReactDOM from 'react-dom'
import { LeftNav, TopNav } from './components/personalizer/nav'
import MainContent from './components/personalizer/main_content'
import Account from './components/common/account'
import $ from 'jquery'
// import s from './components/personalizer/custom.css'
import CONFIG from 'config'

class MainApp extends React.Component {
    constructor () {
        super()
        this.system = {
            url: CONFIG.API_URL
        }
        this.changeTab = this.changeTab.bind(this)
        this.jumpAttributes = {}
        // this.state = { nav:'overview', settings:{}, account:{plan:'lite'} };
        this.state = { nav: 'overview', settings: {}, account: null }
    }
    changeTab (tab) {
        this.setState({ nav: tab })
    }

    setSettings (settings) {
        this.setState({ settings })
    }
    setAccount (account) {
        account.org = account.orgs[0]
        this.setState({ account })
    }
    setOrg (org) {
        const { account } = this.state
        account.org = org
        this.setState({ account }, this.mainContent.getData())
    }
    sendProfileDate (profileDate) {
        // send downstream for data updates to the control
        this.setState({ profileDate })
    }
    setProfileDate (profileDate) {
        // send downstream for data updates to the control
        this.setState({ profileDate })
    }

    jumpTab (tab, attributes) {
        this.jumpAttributes = {}
        Object.keys(attributes).map(function (key) {
            this.jumpAttributes[key] = attributes[key]
        }, this)
        this.setState({ nav: tab })
        $(`#sidebar-menu .nav-${tab} > a`).click()
    }

    render () {
        const attributes = this.jumpAttributes
        this.jumpAttributes = {}
        if (this.state.account) {
            return (
                <div className="Container">
                    <LeftNav changeTab={this.changeTab} nav={this.state.nav} account={this.state.account} settings={this.state.settings} />
                    <div className="Dashboard">
                        <TopNav changeTab={this.changeTab} setOrg={this.setOrg.bind(this)} profileDate={this.state.profileDate} setProfileDate={this.setProfileDate.bind(this)} settings={this.state.settings} account={this.state.account} />
                        <MainContent ref={ref => { this.mainContent = ref }} system={this.system} nav={this.state.nav} account={this.state.account} sendProfileDate={this.sendProfileDate.bind(this)} setSettings={this.setSettings.bind(this)} {...attributes} jumpTab={this.jumpTab.bind(this)} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="Container" style={{ width: '100%', height: '100%', position: 'absolute', background: 'url(https://influentmetrics.com/assets/img/backgrounds/backgroundLogo.png) rgb(154, 1, 1)' }}>
                    <Account system={this.system} setAccount={this.setAccount.bind(this)} />
                </div>
            )
        }
    }
}

ReactDOM.render(
    <MainApp />,
    document.getElementById('content')
)
