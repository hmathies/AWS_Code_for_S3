/*  GROUPS  */
import React from 'react'
import ReactBootstrap from 'react-bootstrap'

import ProfileListing from './profile_listing'
import CriteriaItem from './criteria'

export default class Groups extends React.Component {
    constructor (props) {
        super(props)
        this.changeGroup = this.changeGroup.bind(this)
        this.newCriterion = this.newCriterion.bind(this)
        this.resetNewCriterion = this.resetNewCriterion.bind(this)
        this.deleteGroup = this.deleteGroup.bind(this)
        this.updateGroup = this.updateGroup.bind(this)
        this.grammar = [
            { id: 'country', access: { premium: true, lite: true }, params: [{ name: 'Country', preposition: 'of' }], descriptor: ['current-session', 'previous-session', 'any-session'], type: 'country' },
            { id: 'zip', access: { premium: true, lite: true }, params: [{ name: 'Zip code', preposition: 'of' }], descriptor: ['current-session', 'previous-session', 'any-session'], type: 'zip' },
            { id: 'state', access: { premium: true, lite: true }, params: [{ name: 'State', preposition: 'of' }], descriptor: ['current-session', 'previous-session', 'any-session'], type: 'state' },
            { id: 'city-state', access: { premium: true, lite: true }, params: [{ name: 'City/State', preposition: 'of' }], descriptor: ['current-session', 'previous-session', 'any-session'], type: 'city-state' },
            { id: 'clientIp', access: { premium: true, lite: true }, params: [{ name: 'IP Address', preposition: 'of' }], descriptor: [ 'current-session', 'previous-session' ], type: 'string' },
            { id: 'distance', access: { premium: true, lite: true }, params: [{ name: 'Distance', preposition: 'from' }, { name: 'location', preposition: 'to viewing location during', entry: 'location' }], descriptor: ['current-session', 'previous-session', 'first-session'], type: 'distance' },
            { id: 'separator' },
            { id: 'viewed-uri', access: { premium: true, lite: true }, params: [{ name: 'Viewed page location', preposition: 'of' }], descriptor: [ 'current-page', 'previous-page' ], type: 'string' },
            { id: 'viewed-page-hostname', access: { premium: true, lite: true }, params: [{ name: 'Viewed page hostname', preposition: 'of' }], descriptor: [ 'current-page', 'previous-page' ], type: 'string' },
            { id: 'referring-page-url', access: { premium: true, lite: true }, params: [{ name: 'Referring page URL', preposition: 'of' }], descriptor: [ 'current-page', 'previous-page' ], type: 'string' },
            { id: 'query', access: { premium: true, lite: true }, params: [{ name: 'Query string', preposition: 'of' }], descriptor: [ 'current-page', 'previous-page' ], type: 'string' },
            { id: 'separator' },
            { id: 'sessions-count', access: { premium: true, lite: true }, params: [{ name: 'Sessions count', preposition: false }], descriptor: false, type: 'number' },
            { id: 'page-view-count', access: { premium: true, lite: true }, params: [{ name: 'Page view count', preposition: 'for' }], descriptor: ['current-session', 'previous-session', 'first-session'], type: 'number' },
            { id: 'elapsed-time', access: { premium: true, lite: false }, params: [{ name: 'Elapsed time', preposition: 'since' }], descriptor: ['previous-session', 'first-session'], type: 'duration' },
            { id: 'duration', access: { premium: true, lite: true }, params: [{ name: 'Duration', preposition: 'of' }], descriptor: ['current-session', 'previous-session', 'first-session'], type: 'duration' },
            { id: 'separator' },
            { id: 'device-type', access: { premium: true, lite: true }, params: [{ name: 'Device type', preposition: 'of' }], descriptor: [ 'current-session', 'previous-session', 'any-session' ], type: 'device-types' },
            { id: 'device-os', access: { premium: true, lite: false }, params: [{ name: 'Device OS', preposition: 'of' }], descriptor: [ 'current-session', 'previous-session', 'any-session' ], type: 'string' },
            { id: 'device-browser', access: { premium: true, lite: false }, params: [{ name: 'Device browser', preposition: 'of' }], descriptor: [ 'current-session', 'previous-session', 'any-session' ], type: 'string' },
            { id: 'device-version', access: { premium: true, lite: false }, params: [{ name: 'Device version', preposition: 'of' }], descriptor: [ 'current-session', 'previous-session', 'any-session' ], type: 'string' },
            { id: 'device-platform', access: { premium: true, lite: false }, params: [{ name: 'Device platform', preposition: 'of' }], descriptor: [ 'current-session', 'previous-session', 'any-session' ], type: 'string' },
            { id: 'separator' },
            { id: 'impressions', access: { premium: true, lite: true }, params: [{ name: 'Impression count', preposition: 'of' }, { name: 'action', preposition: '' }], descriptor: false, type: 'number' },
            { id: 'profile-attribute', access: { premium: true, lite: true }, params: [{ name: 'Profile attribute', preposition: 'of' }, { name: 'field', preposition: '', entry: 'string' }], descriptor: false, type: 'any' }
        ]
        this.state = { groups: props.groups, group: (props.group ? props.group : Object.keys(props.groups)[0]), profiles: {}, showDeleteDialog: false, newCriterion: null }
    }

    componentWillReceiveProps (newProps) {
        let { group } = this.state
        if (!newProps.groups[group]) { group = Object.keys(newProps.groups)[0]}
        this.setState({ group, groups: newProps.groups, profiles: newProps.profiles, bucket: this.getProfiles(newProps.profiles, group) })
    }

    componentWillMount () {
        this.refreshProfiles()
    }

    getProfiles (profiles, group) {
        const bucket = (profiles && profiles.groups && profiles.groups[group]) ? profiles.groups[group]
            : { profiles: [], metrics: [] }
        return bucket
    }

    componentWillUnmount () {
        this.props.setPersist({group: this.state.group})
    }

    changeGroup (e) {
        this.setState({ group: e.target.value, bucket: this.getProfiles(this.state.profiles, e.target.value) })
    }

    newCriterion () {
        /*
    var groups = {};
    $.extend(groups, this.state.groups);
    groups[this.state.group].criteria.push({ editing:true, new:true, active:false, string:'New Criterion', params:['viewed-uri','current-page','is', ''] });
    this.setState({ groups: groups });
*/
        const newCriterion = { editing: true, active: false, string: 'New Criterion', params: ['country', 'current-session', 'is', ''] }
        this.setState({ newCriterion })
    }

    resetNewCriterion () {
        this.setState({ newCriterion: null })
    }

    deleteCriterion (item) {
    }

    updateGroup (group) {
        const groups = {}
        $.extend(groups, this.state.groups)
        groups[this.state.group] = group
        this.setState({ groups, newCriterion: null })
        this.props.updateData(groups, this.refreshProfiles.bind(this))
    }

    refreshProfiles () {
        this.props.getProfiles(this.state.group)
    }

    deleteGroup () {
        this.setState({ showDeleteDialog: true })
    }

    deleteGroup_close (response) {
        if (response) {
            const groups = {}
            $.extend(groups, this.state.groups)
            delete groups[this.state.group]
            // this.setState({ groups:groups, group:groups[Object.keys(groups)[0]], showDeleteDialog:false });
            this.setState({ showDeleteDialog: false })
            this.props.updateData(groups)
        } else { this.setState({ showDeleteDialog: false })}
    }

    changeGroupValue (e) {
        const value = e.target.value
        this.groupValue = value
    }

    renameGroup () {
        this.groupValue = ''
        this.setState({ showRenameDialog: true })
    }

    renameGroup_close (response) {
        if (response) {
            const groups = {}
            $.extend(groups, this.state.groups)
            groups[this.state.group].name = this.groupValue
            this.setState({ showRenameDialog: false })
            this.props.updateData(groups)
        } else { this.setState({ showRenameDialog: false })}
    }

    newGroup () {
        this.groupValue = ''
        this.setState({ showNewDialog: true })
    }

    newGroup_close (response) {
        if (response) {
            const groups = {}
            $.extend(groups, this.state.groups)
            let group = this.groupValue
            let gid = group.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            groups[gid] = { name: group, criteria: [] }
            this.setState({ showNewDialog: false, group: gid, groups }, function () {
                this.props.updateData(groups)
            })
        } else { this.setState({ showNewDialog: false })}
    }

    render () {
        const FormGroup = ReactBootstrap.FormGroup
        let FormControl = ReactBootstrap.FormControl
        let Button = ReactBootstrap.Button
        let Table = ReactBootstrap.Table
        let ListGroup = ReactBootstrap.ListGroup
        let ListGroupItem = ReactBootstrap.ListGroupItem
        let Modal = ReactBootstrap.Modal
        let newCriterionControl = (this.state.newCriterion ? (
            <CriteriaItem newCriterion={true } key="newCriterion"
                list="criteria" criteria={this.state.newCriterion}
                index={this.state.groups[this.state.group].criteria.length}
                account={this.props.account}
                settings={this.props.settings}
                grammar={this.grammar}
                functions={{deleteCriterion: this.deleteCriterion, resetNewCriterion: this.resetNewCriterion, updateItem: this.updateGroup}}
                item={this.state.groups[this.state.group]} />
        ) : null)
        return (
            <div className="groups-pane">
                <h1>Groups</h1>
                <form className="form-inline">
                    <ListGroup style={{marginBottom: '0px'}}>
                        <ListGroupItem className="row">
                            { (!Object.keys(this.state.groups).length) ? 'You have no groups defined yet'
                                : (
                                    <FormGroup controlId="formControlsSelect" className="">
                                        <FormControl componentClass="select" placeholder="groups" value={this.state.group} onChange={this.changeGroup}>
                                            {
                                                Object.keys(this.state.groups).map(function (key, index) {
                                                    return <option key={index} value={key}>{this.state.groups[key].name}</option>
                                                }, this)
                                            }
                                        </FormControl>
                                        <Button style={{marginBottom: '0px'}} onClick={this.renameGroup.bind(this)} className="btn-primary"><span className="glyphicon glyphicon-retweet"></span> Rename</Button>
                                        <Button style={{marginBottom: '0px'}} onClick={this.deleteGroup} className="btn-primary"><span className="glyphicon glyphicon-remove"></span> Delete</Button>
                                    </FormGroup>
                                )
                            }
                            <Button style={{marginBottom: '0px'}} onClick={this.newGroup.bind(this)} className="btn-primary pull-right"><span className="glyphicon glyphicon-plus"></span> New</Button>
                        </ListGroupItem>
                    </ListGroup>
                    <div className="rows">
                        <div className="col-lg-7 col-xs-12">

                            {
                                (!(this.state.groups && this.state.group && this.state.groups[this.state.group])) ? (<Table></Table>)
                                    : (
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th colSpan={3} style={{verticalAlign: 'middle'}}>
                                                        <div className="col-xs-11"><h2>Criteria</h2></div>
                                                        <FormGroup controlId="formControlsSelect" className="col-xs-1">
                                                            <Button style={{marginBottom: '0px'}} onClick={this.newCriterion}><span className="glyphicon glyphicon-plus"></span></Button>
                                                        </FormGroup>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (!(this.state.groups && this.state.group && this.state.groups[this.state.group].criteria))
                                                        ? (<tr><td>No criteria definitions set</td></tr>)
                                                        : (
                                                    // this.state.groups so it updates on newCriterion
                                                            this.state.groups[this.state.group].criteria.map(function (criteria, index) {
                                                                return (
                                                                    <CriteriaItem key={index} index={index}
                                                                        list="criteria" criteria={criteria}
                                                                        account={this.props.account}
                                                                        settings={this.props.settings}
                                                                        grammar={this.grammar}
                                                                        functions={{deleteCriterion: this.deleteCriterion, updateItem: this.updateGroup}} item={this.state.groups[this.state.group]} />
                                                                )
                                                            }, this)
                                                        )
                                                }
                                                { newCriterionControl }
                                            </tbody>
                                        </Table>
                                    )
                            }

                        </div>
                        <div className="col-lg-5 col-xs-12">
                            <ProfileListing group={this.state.group} totalsMetrics={this.state.profiles.metrics} profiles={this.state.bucket} refresh={this.props.getProfiles} jumpTab={this.props.jumpTab} />
                        </div>
                    </div>
                </form>
                <div className="clear"></div>

                <Modal show={this.state.showDeleteDialog} onHide={this.deleteGroup_close.bind(this, false)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Are you sure you want to delete <em>{(this.state.groups && this.state.group && this.state.groups[this.state.group]) ? this.state.groups[this.state.group].name : 'undefined'}</em>?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.deleteGroup_close.bind(this, true)}>Yes</Button> <Button onClick={this.deleteGroup_close.bind(this, false)} className="pull-right">No</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showRenameDialog} onHide={this.renameGroup_close.bind(this, false)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Rename group <em>{(this.state.groups && this.state.group && this.state.groups[this.state.group]) ? this.state.groups[this.state.group].name : 'undefined'}</em> to:</h4>
                        <FormControl type="text" defaultValue={this.state.groups && this.state.group && this.state.groups[this.state.group] ? this.state.groups[this.state.group].name : 'undefined'} onChange={this.changeGroupValue.bind(this)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.renameGroup_close.bind(this, true)}>OK</Button> <Button onClick={this.renameGroup_close.bind(this, false)} className="pull-right">Cancel</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showNewDialog} onHide={this.newGroup_close.bind(this, false)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>New group name: </h4>
                        <FormControl type="text" onChange={this.changeGroupValue.bind(this)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.newGroup_close.bind(this, true)}>OK</Button> <Button onClick={this.newGroup_close.bind(this, false)} className="pull-right">Cancel</Button>
                    </Modal.Footer>
                </Modal>

            </div>

        )
    }
}
