import React from 'react'
import ReactBootstrap from 'react-bootstrap'
import ContentEditor from '../common/content_editor'
import CriteriaItem from './criteria'

class WhereBlock extends React.Component {
    constructor (props) {
        super(props)

        this.where_grammar = [
            { id: 'viewed-uri', access: { premium: true, lite: true }, params: [{ name: 'Viewed URI', preposition: 'of' }], descriptor: ['current-page', 'previous-page'], type: 'string' },
            { id: 'viewed-page-hostname', access: { premium: true, lite: true }, params: [{ name: 'Viewed page hostname', preposition: 'of' }], descriptor: ['current-page', 'previous-page'], type: 'string' },
            { id: 'referring-page-url', access: { premium: true, lite: true }, params: [{ name: 'Referring page URL', preposition: 'of' }], descriptor: ['current-page', 'previous-page'], type: 'string' },
            { id: 'entry-page-uri', access: { premium: true, lite: true }, params: [{ name: 'Entry page URI', preposition: 'of' }], descriptor: ['current-session', 'previous-session', 'first-session', 'any-session'], type: 'string' },
            { id: 'entry-page-hostname', access: { premium: true, lite: true }, params: [{ name: 'Entry page hostname', preposition: 'of' }], descriptor: ['current-session', 'previous-session', 'first-session', 'any-session'], type: 'string' },
            { id: 'entry-referring-page-url', access: { premium: true, lite: true }, params: [{ name: 'Entry referring page URL', preposition: 'of' }], descriptor: ['current-session', 'previous-session', 'first-session', 'any-session'], type: 'string' },
            { id: 'exit-page-uri', access: { premium: true, lite: true }, params: [{ name: 'Exit page URI', preposition: 'of' }], descriptor: ['previous-session', 'first-session', 'any-session'], type: 'string' }
        ]
        this.state = { isEditing: false, where: props.step.where ? props.step.where : [], newWhereCriterion: null }
    }


    componentWillReceiveProps (newProps) {
        const state = {}
        if (!this.state.isEditing && newProps.step) {
            this.setState({ where: newProps.step.where ? newProps.step.where : [] })
        }
    }

    newWhereCriterion () {
        let newCriterion = { editing: true, active: false, string: 'New Where Criterion', params: ['viewed-uri', 'current-page', 'is', ''] }
        this.setState({ newWhereCriterion: newCriterion })
    }

    resetNewWhereCriterion () {
        this.setState({ newWhereCriterion: null })
    }

    updateWhere (criterion) {
        let index = this.props.index
        var step = this.props.step
        step.where = criterion.where
        this.setState({ where: step.where, newWhereCriterion: null })
        this.props.updateWhere(step)
    }

    render () {
        let FormGroup = ReactBootstrap.FormGroup
        var Table = ReactBootstrap.Table
        var OverlayTrigger = ReactBootstrap.OverlayTrigger
        var Tooltip = ReactBootstrap.Tooltip
        var Button = ReactBootstrap.Button

        var newWhereCriterionControl = (this.state.newWhereCriterion ? (
            <CriteriaItem key="newWhereCriterion" newCriterion={true} index={this.state.where.length} grammar={this.where_grammar}
                list="where" item={this.props.step} where={this.state.newWhereCriterion}
                account={this.props.account} functions={{ resetNewCriterion: this.resetNewWhereCriterion.bind(this), updateItem: this.updateWhere.bind(this) }} />
        ) : null)

        return (
            <div className="well">
                <Table>
                    <thead>
                        <tr>
                            <th colSpan={3} style={{ verticalAlign: 'middle' }}>
                                <div className="col-xs-11"><h3>Where</h3></div>
                                <FormGroup controlId="formControlsSelect" className="col-xs-1">
                                    <Button style={{ marginBottom: '0px' }} onClick={this.newWhereCriterion.bind(this)}><span className="glyphicon glyphicon-plus"></span></Button>
                                </FormGroup>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (!this.state.where.length) ? (<tr><td colSpan={3}><em>Run this step on all page references</em></td></tr>)
                                // this.state.actions so it updates on newStep
                                : this.state.where.map(function (where, index) {
                                    return (
                                        <CriteriaItem key={index} index={index} grammar={this.where_grammar} items={this.props.actions} item={this.props.action}
                                            list="where" item={this.props.step} where={where}
                                            account={this.props.account} functions={{ resetNewCriterion: this.resetNewWhereCriterion.bind(this), updateItem: this.updateWhere.bind(this) }} />
                                    )
                                }, this)
                        }
                        {newWhereCriterionControl}
                    </tbody>
                </Table>
            </div>
        )
    }
}

class WhenBlock extends React.Component {
    constructor (props) {
        super(props)
        this.parameters = null

        this.when_grammar = [
            { id: 'hour-of-day', access: { premium: true, lite: true }, params: [{ name: 'Hour of day', preposition: 'of' }], descriptor: ['current-page', 'previous-page', 'current-session-start', 'previous-session-start', 'previous-session-end', 'first-session-start', 'first-session-end'], type: 'hour' },
            { id: 'time-of-day', access: { premium: true, lite: true }, params: [{ name: 'Time of day', preposition: 'of' }], descriptor: ['current-page', 'previous-page', 'current-session-start', 'previous-session-start', 'previous-session-end', 'first-session-start', 'first-session-end'], type: 'time' },
            { id: 'day-of-week', access: { premium: true, lite: true }, params: [{ name: 'Day of week', preposition: 'of' }], descriptor: ['current-page', 'previous-page', 'current-session-start', 'previous-session-start', 'previous-session-end', 'first-session-start', 'first-session-end'], type: 'day' },
            { id: 'date-of-month', access: { premium: true, lite: true }, params: [{ name: 'Date of month', preposition: 'of' }], descriptor: ['current-page', 'previous-page', 'current-session-start', 'previous-session-start', 'previous-session-end', 'first-session-start', 'first-session-end'], type: 'number' },
            { id: 'date', access: { premium: true, lite: true }, params: [{ name: 'Date', preposition: 'of' }], descriptor: ['current-page', 'previous-page', 'current-session-start', 'previous-session-start', 'previous-session-end', 'first-session-start', 'first-session-end'], type: 'date' }
        ]
        this.state = { isEditing: false, when: props.step.when ? props.step.when : [], newWhenCriterion: null }
    }

    componentDidMount () {
    }
    componentWillReceiveProps (newProps) {
        let state = {}
        if (!this.state.isEditing && newProps.step) {
            this.setState({ when: newProps.step.when ? newProps.step.when : [] })
        }
    }

    newWhenCriterion () {
        let newCriterion = { editing: true, active: false, string: 'New When Criterion', params: ['hour-of-day', 'current-page', 'is', ''] }
        this.setState({ newWhenCriterion: newCriterion })
    }

    resetNewWhenCriterion () {
        this.setState({ newWhenCriterion: null })
    }

    updateWhen (criterion) {
        let index = this.props.index
        var step = this.props.step
        step.when = criterion.when
        this.setState({ when: step.when, newWhenCriterion: null })
        this.props.updateWhen(step)
    }

    render () {
        let FormGroup = ReactBootstrap.FormGroup
        var Table = ReactBootstrap.Table
        var OverlayTrigger = ReactBootstrap.OverlayTrigger
        var Tooltip = ReactBootstrap.Tooltip
        var Button = ReactBootstrap.Button

        var newWhenCriterionControl = (this.state.newWhenCriterion ? (
            <CriteriaItem key="newWhenCriterion" newCriterion={true} index={this.state.when.length} grammar={this.when_grammar}
                list="when" item={this.props.step} when={this.state.newWhenCriterion}
                account={this.props.account} functions={{ resetNewCriterion: this.resetNewWhenCriterion.bind(this), updateItem: this.updateWhen.bind(this) }} />
        ) : null)

        return (
            <div className="well">
                <Table>
                    <thead>
                        <tr>
                            <th colSpan={3} style={{ verticalAlign: 'middle' }}>
                                <div className="col-xs-11"><h3>When</h3></div>
                                <FormGroup controlId="formControlsSelect" className="col-xs-1">
                                    <Button style={{ marginBottom: '0px' }} onClick={this.newWhenCriterion.bind(this)}><span className="glyphicon glyphicon-plus"></span></Button>
                                </FormGroup>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (!this.state.when.length) ? (<tr><td colSpan={3}><em>Run this step at all times</em></td></tr>)
                                // this.state.actions so it updates on newStep
                                : this.state.when.map(function (when, index) {
                                    return (
                                        <CriteriaItem key={index} index={index} grammar={this.when_grammar} items={this.props.actions} item={this.props.action}
                                            list="when" item={this.props.step} when={when}
                                            account={this.props.account} functions={{ resetNewCriterion: this.resetNewWhenCriterion.bind(this), updateItem: this.updateWhen.bind(this) }} />
                                    )
                                }, this)
                        }
                        {newWhenCriterionControl}
                    </tbody>
                </Table>
            </div>
        )
    }
}

class StepsItem extends React.Component {
    constructor (props) {
        super(props)
        this.parameters = null

        this.what_grammar = [
            { id: 'page-redirect', name: 'Redirect', options: ['url'], move: 'redirect' },
            { id: 'redirect', name: 'Redirect', options: ['url'] },
            { id: 'widget', name: 'Widget', options: ['selector', 'transitionType', 'content'] },
            { id: 'notice', name: 'Notice', options: ['selector', 'transitionType', 'content'] },
            { id: 'content-replace', name: 'Widget', options: ['selector', 'content'], move: 'widget' },
            { id: 'popup', name: 'Popup', options: ['content'] },
            { id: 'form', name: 'Form', options: ['content'] },
            { id: 'capture', name: 'Data Capture', options: ['id', 'fields'] },
            { id: 'javascript', name: 'Javascript', options: ['jscode'] },
            { id: 'content-token', name: 'Token (server)', options: ['id', 'content'] },
            { id: 'function', name: 'Function (server)', options: ['id', 'parameter'] }
        ]

        this.rulePick_grammar = [
            { id: 'first', name: 'First match' },
            { id: 'random', name: 'Random match select' },
            { id: 'sequence', name: 'Looping sequence' },
            { id: 'all', name: 'All matches' }
        ]

        this.transitionTypes_grammar = [
            { id: 'none', name: 'No animation' },
            { id: 'fade', name: 'Fade out/in' },
            { id: 'crossfade', name: 'Crossfade' }
        ]

        this.state = this.initStep(props)
    }

    componentDidMount () {
        if (this.props.step.editing)
            {this.changeEditing(true);}
        if (this.props.newStep) {
            this.saveStep(true)
        }
    }
    componentWillReceiveProps (newProps) {
        let state = {}

        // change step state info on action change
        if (newProps.actionId != this.state.actionId) {
            this.setState(this.initStep(newProps))
            console.log({ changedActionId: newProps })
        }
    }

    initStep (p) {
        let rulePick = p.step.rulePick || this.rulePick_grammar[0].id
        var move = ($.grep(this.what_grammar, (i) => (i.id === p.step.type && i.move)))[0]
        var object = { type: move ? move.id : p.step.type, value_id: p.step.id, value_description: p.step.description, isEditing: false, actionId: p.actionId, step: p.step, rules: p.step.rules, rulePick }
        return object
    }

    changeActive () {
        let index = this.props.index
        var action = this.props.action
        action.steps[index].active = !action.steps[index].active
        this.props.functions.updateAction(action)
    }

    doEditStep (state) {
        let index = this.props.index
        var action = this.props.action
        //    action.steps[index].isEditing = state;
        //    this.props.functions.updateAction(action);
        this.setState({ isEditing: state })
    }

    changeEditing (state) {
        this.setState({ isEditing: state })
    }

    removeStep () {
        const { index, action } = this.props
        action.steps.splice(index, 1)
        this.props.functions.updateAction(action)
    }

    updateBlock (step) {
        const { index, action } = this.props
        action.steps[index] = step
        this.props.functions.updateAction(action)
        this.setState({ step })
        console.log({ updateBlock: action })
    }

    changeType (e) {
        const id = e.target.value
        this.setState({ type: id, value_url: [], value_id: [], value_selector: [], value_content: [], value_transitionType: [] })
    }

    changeValue (e) {
        const type = e.target.attributes.getNamedItem('type').value
        const state = {}
        state[`value_${type}`] = e.target.value
        this.setState(state)
    }

    changeRulePick (e) {
        const id = e.target.value
        this.setState({ rulePick: id })
    }

    changeRuleValue (index, e) {
        const type = e.target.attributes.getNamedItem('type').value
        const { rules } = this.state
        rules[index][type] = e.target.value
        this.setState({ rules })
    }

    contentEditorValue (index, value) {
        const { rules } = this.state
        rules[index].content = value
        this.setState({ rules })
        this.saveRules()
    }

    saveStep (isEditing) {
        const { index, action } = this.props
        this.changeEditing(isEditing)
        if (this.props.newStep) {
            action.steps.push({ active: false })
        }
        delete action.steps[index].isEditing
        action.steps[index].id = this.state.value_id
        action.steps[index].type = this.state.type
        action.steps[index].description = this.state.value_description
        action.steps[index].where = this.state.step.where
        action.steps[index].when = this.state.step.when
        action.steps[index].rulePick = this.state.rulePick
        const rules = []
        this.state.rules.map((r, i) => {
            rules[i] = { id: r.id, selector: r.selector, transitionType: r.transitionType, url: r.url, content: r.content, groups: r.groups }
        })
        action.steps[index].rules = rules
        action.steps[index].isEditing = isEditing
        this.props.functions.updateAction(action)
    }

    saveRules () {
        const { index, action } = this.props
        const rules = this.state.rules.map(r => (
            { id: r.id, selector: r.selector, url: r.url, content: r.content, groups: r.groups }
        ))
        action.steps[index].rules = rules
        this.props.functions.updateAction(action)
    }

    cancelStep () {
        this.changeEditing(false)
        if (this.props.newStep) {
            this.props.functions.resetNewStep()
        }
        const { index, action } = this.props
        if (action.steps[index].isEditing) {
            delete action.steps[index].isEditing
            this.props.functions.updateAction(action)
        }
    }

    addRule () {
        const { rules } = this.state
        rules.push({ content: '', id: '', selector: '', url: '', groups: [] })
        this.setState({ rules })
        this.saveRules()
    }

    setValues () {
        let value_id = []
        var value_selector = []
        var value_url = []
        var value_content = []
        this.state.rules.map((r, i) => {
            value_id[i] = r.id
            value_selector[i] = r.selector
            value_url[i] = r.id
            value_content[i] = r.content
        })
        this.setState({ value_id, value_selector, value_url, value_conent: value_content })
    }

    upRule (key) {
        let rules = this.state.rules
        if (key != 0) {
            let ruleA = rules[key - 1]
            var ruleB = rules[key]
            rules.splice(key - 1, 2, ruleB, ruleA)
        }
        this.setState({ rules })
        this.saveRules()
        //this.setValues();
    }

    copyRule (key) {
        let rules = this.state.rules
        var rule = JSON.parse(JSON.stringify(rules[key]))	// unbind the object references
        rules.push(rule)
        /*
            var value_id = this.state.value_id;
            var value_selector = this.state.value_selector;
            var value_url = this.state.value_url;
            var value_content = this.state.value_content;
            value_id.push(rule.id);
            value_selector.push(rule.selector);
            value_url.push(rule.url);
            value_content.push(rule.content);
            this.setState({ rules:rules, value_id:value_id, value_selector:value_selector, value_url:value_url, value_content:value_content });
        */
        this.setState({ rules })
        this.saveRules()
        //this.setValues();
    }

    deleteRule (key) {
        let rules = this.state.rules
        rules.splice(key, 1)
        this.setState({ rules })
        this.saveRules()
    }

    downRule (key) {
        let rules = this.state.rules
        if (key != rules.length - 1) {
            let ruleA = rules[key]
            var ruleB = rules[key + 1]
            rules.splice(key, 2, ruleB, ruleA)
        }
        this.setState({ rules })
        this.saveRules()
        //this.setValues();
    }

    changeAddGroupValue (e) {
        let value = e.target.value
        this.addGroupValue = value
    }

    addGroup (index) {
        this.addGroupValue = Object.keys(this.props.groups)[0]
        this.setState({ addGroup_ruleIndex: index, showAddGroup: true })
    }

    addGroup_close (ruleIndex, response) {
        if (response) {
            let rules = this.state.rules
            if (!rules[ruleIndex] || !rules[ruleIndex].groups)
                {rules[ruleIndex].groups = [];}
            let group = this.addGroupValue
            rules[ruleIndex].groups.push(group)
            this.setState({ rules, showAddGroup: false })
            this.saveRules()
            // above code does not save group entry
            /*
                  var index = this.props.index;
                  var action = {};
                  $.extend(action, this.props.action);
                  var group = this.addGroupValue;
                  var ref = action.steps[index].rules[ruleIndex];
                  if (! ref.groups)
                    ref.groups = [];
                  ref.groups.push(group);
                  this.setState({ showAddGroup:false, action:action }, function() {
                    this.props.functions.updateAction(action);
                  });
            */
        } else
            {this.setState({ showAddGroup: false });}
    }

    removeGroup (ruleIndex, gid) {
        /*
            var action = {};
            $.extend(action, this.props.action);
            var index = this.props.index;
            var ref = action.steps[index].rules[ruleIndex];
            var i = ref.groups.indexOf(gid);
            ref.groups.splice(i,1);
            this.setState({ action:action });
            this.props.functions.updateAction(action);
        */
        let rules = this.state.rules
        var i = rules[ruleIndex].groups.indexOf(gid)
        rules[ruleIndex].groups.splice(i, 1)
        this.setState({ rules })
        this.saveRules()
    }

    render () {
        let FormGroup = ReactBootstrap.FormGroup
        var FormControl = ReactBootstrap.FormControl
        var Table = ReactBootstrap.Table
        var ListGroup = ReactBootstrap.ListGroup
        var ListGroupItem = ReactBootstrap.ListGroupItem
        var OverlayTrigger = ReactBootstrap.OverlayTrigger
        var Tooltip = ReactBootstrap.Tooltip
        var Button = ReactBootstrap.Button
        var Modal = ReactBootstrap.Modal

        var grammar = ($.grep(this.what_grammar, function (i) { return i.id === this.state.type }.bind(this)))[0]


        if (!this.state.isEditing) {
            /*
                  var descriptionLine = [(<strong key={0}>{grammar.name}</strong>),
                    (this.state.value_id ? ' [' + this.state.value_id + '] ' : ' '),
                    (<em key={2}>{this.state.value_description}</em>),
                    ((this.state.rules && this.state.rules.length > 0) ? " (" + this.state.rules.length + " rules)" : "")
                  ];
            */
            let descriptionLine = [(<strong key={0}>{grammar.name}</strong>),
                (this.props.step.id ? ` [${  this.props.step.id  }] ` : ' '),
                (<em key={2}>{this.props.step.description}</em>),
                ((this.props.step.rules && this.props.step.rules.length > 0) ? ' (' + this.props.step.rules.length + ' rules)' : '')
            ]
            return (
                <tr>
                    <td><span role="button" className={this.props.step.active ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'} aria-hidden="true" onClick={this.changeActive.bind(this)}></span></td>
                    <td onClick={this.doEditStep.bind(this, true)}>{descriptionLine}</td>
                    <td style={{ textAlign: 'right' }}>
                        <span role="button" onClick={this.doEditStep.bind(this, true)} className="glyphicon glyphicon-pencil" aria-hidden="true"></span> &nbsp;
                        <span role="button" onClick={this.removeStep.bind(this)} className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr><td colSpan={3}>
                    <ListGroup style={{ marginBottom: '0px' }}>
                        <ListGroupItem className="row">
                            <div className="col-xs-12">
                                <FormGroup bsSize="small" controlId="formControlsSelect" className="col-md-6 col-xs-12">

                                    <OverlayTrigger placement="bottom" overlay={(<Tooltip id="tooltip">What type of action step is this?</Tooltip>)} >
                                        <FormControl componentClass="select" placeholder="select" value={this.state.type} onChange={this.changeType.bind(this)}>
                                            {
                                                this.what_grammar.map(function (key, index) {
                                                    if (key.move) return
                                                    return (<option key={index} value={key.id}>{key.name}</option>)
                                                }, this)
                                            }
                                        </FormControl>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={(<Tooltip id="tooltip">Enter an ID for this step, used to track impressions (no spaces or symbols)</Tooltip>)} >
                                        <FormControl type="id" placeholder="ID" value={this.state.value_id} onChange={this.changeValue.bind(this)} />
                                    </OverlayTrigger>
                                    <br />

                                    <OverlayTrigger placement="top" overlay={(<Tooltip id="tooltip">Enter a short description so you know the purpose of this step</Tooltip>)} >
                                        <FormControl type="description" placeholder="Description" value={this.state.value_description} onChange={this.changeValue.bind(this)} style={{ width: 'inherit' }} />
                                    </OverlayTrigger>

                                    <hr />

                                    <WhereBlock updateWhere={this.updateBlock.bind(this)} {...this.props} />
                                    <hr />
                                    <WhenBlock updateWhen={this.updateBlock.bind(this)} {...this.props} />

                                </FormGroup>
                                <FormGroup bsSize="small" controlId="formControlsSelect" className="col-md-6 col-xs-12">
                                    <div className="row">
                                        <div className="col-xs-11">
                                            <h2>Rules</h2>
                                            <FormControl componentClass="select" placeholder="select" value={this.state.rulePick} onChange={this.changeRulePick.bind(this)}>
                                                {
                                                    this.rulePick_grammar.map((key, index) => (<option key={index} value={key.id}>{key.name}</option>))
                                                }
                                            </FormControl>
                                        </div>
                                        <FormGroup controlId="formControlsSelect" className="col-xs-1">
                                            <Button style={{ marginBottom: '0px' }} onClick={this.addRule.bind(this)}><span className="glyphicon glyphicon-plus"></span></Button>
                                        </FormGroup>
                                    </div>
                                    <div className="row">
                                        {
                                            this.state.rules.map((rule, ruleIndex) => {
                                                return (
                                                    <div key={ruleIndex} className="col-xs-12">
                                                        <div className="well col-xs-11">
                                                            <div className="step-audience">
                                                                <Table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th colSpan={3} style={{ verticalAlign: 'middle' }}>
                                                                                <div className="col-xs-11"><h3>Who</h3></div>
                                                                                <FormGroup controlId="formControlsSelect" className="col-xs-1">
                                                                                    <Button style={{ marginBottom: '0px' }} onClick={this.addGroup.bind(this, ruleIndex)}><span className="glyphicon glyphicon-plus"></span></Button>
                                                                                </FormGroup>
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            (!(rule.groups && rule.groups.length)) ? (<tr><td colSpan={3}><em>Run this rule against all audiences</em></td></tr>)
                                                                                : rule.groups.map(function (group, index) {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td colSpan={2}>{this.props.groups[group] ? this.props.groups[group].name : 'undefined'}</td>
                                                                                            <td style={{ textAlign: 'right' }}>
                                                                                                <span role="button" onClick={() => this.props.functions.jumpTab('groups', { group })} className="fa fa-eye" aria-hidden="true"></span> &nbsp;
                                                                                                <span role="button" onClick={this.removeGroup.bind(this, ruleIndex, group)} className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )
                                                                                }, this)
                                                                        }
                                                                    </tbody>
                                                                </Table>
                                                                <hr />
                                                            </div>
                                                            {
                                                                grammar.options.map(function (value, index) {
                                                                    switch (value) {
                                                                        case 'url':
                                                                            return (<span style={{ width: `${100  }%` }}>Redirect to: <FormControl type="url" key={index} placeholder="URL" value={rule.url} style={{ width: `${100  }%` }} onChange={this.changeRuleValue.bind(this, ruleIndex)} /></span>)
                                                                            break;
                                                                        case 'selector':
                                                                            return (
                                                                                <OverlayTrigger placement="bottom" key={index} overlay={(<Tooltip id="tooltip">CSS selector goes here.</Tooltip>)} >
                                                                                    <FormControl type="selector" key={index} placeholder=".class or #id selector" value={rule.selector} onChange={this.changeRuleValue.bind(this, ruleIndex)} />
                                                                                </OverlayTrigger>
                                                                            )
                                                                            break;
                                                                        case 'id':
                                                                            return (<FormControl type="id" key={index} placeholder="id" value={rule.id} onChange={this.changeRuleValue.bind(this, ruleIndex)} />)
                                                                            break;
                                                                        case 'transitionType':
                                                                            return (
                                                                                <OverlayTrigger placement="bottom" key={index} overlay={(<Tooltip id="tooltip">Animation to use for replacing Widget content</Tooltip>)} >
                                                                                    <FormControl componentClass="select" type="transitionType" key={index} placeholder="transition type" value={rule.transitionType} onChange={this.changeRuleValue.bind(this, ruleIndex)}>
                                                                                        {
                                                                                            this.transitionTypes_grammar.map((key, index) => (<option key={index} value={key.id}>{key.name}</option>))
                                                                                        }
                                                                                    </FormControl>
                                                                                </OverlayTrigger>
                                                                            )
                                                                            break;
                                                                        case 'content':
                                                                            return (<ContentEditor type="content" key={index} content={rule.content} headHtml={this.props.settings.headHtml} contentEditorValue={this.contentEditorValue.bind(this, ruleIndex)} />)
                                                                            break;
                                                                        case 'jscode':
                                                                            return (<FormControl type="content" componentClass="textarea" key={index} placeholder="enter JS code" value={rule.content} onChange={this.changeRuleValue.bind(this, ruleIndex)} style={{ fontFamily: 'monospace', width: `${100  }%` }} />)
                                                                            break;
                                                                        case 'fields':
                                                                            return (<FormControl type="content" componentClass="textarea" key={index} placeholder="enter comma-delimited fields to capture" value={rule.content} onChange={this.changeRuleValue.bind(this, ruleIndex)} style={{ fontFamily: 'monospace', width: `${100  }%` }} />)
                                                                            break;
                                                                        case 'parameter':
                                                                            return (<FormControl type="content" componentClass="textarea" key={index} placeholder="enter comma-delimited option(s) to feed to the PHP function" value={rule.content} onChange={this.changeRuleValue.bind(this, ruleIndex)} style={{ fontFamily: 'monospace', width: `${100  }%` }} />)
                                                                            break;
                                                                    }
                                                                }, this)
                                                            }
                                                        </div>
                                                        <FormGroup controlId="formControlsSelect" className="col-xs-1">
                                                            <Button style={{ marginBottom: '0px' }} onClick={this.upRule.bind(this, ruleIndex)} disabled={ruleIndex <= 0}><span className="glyphicon glyphicon-chevron-up"></span></Button><br />
                                                            <Button style={{ marginBottom: '0px' }} onClick={this.copyRule.bind(this, ruleIndex)}><span className="glyphicon glyphicon-copy"></span></Button><br />
                                                            <Button style={{ marginBottom: '0px' }} onClick={this.deleteRule.bind(this, ruleIndex)}><span className="glyphicon glyphicon-remove"></span></Button><br />
                                                            <Button style={{ marginBottom: '0px' }} onClick={this.downRule.bind(this, ruleIndex)} disabled={ruleIndex >= this.state.rules.length - 1}><span className="glyphicon glyphicon-chevron-down"></span></Button><br />
                                                        </FormGroup>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </FormGroup>
                                <div><hr /></div>
                                <span className="pull-right">
                                    <Button onClick={this.saveStep.bind(this, false)}><span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Save</Button>
                                    <Button onClick={this.cancelStep.bind(this)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Close</Button>
                                </span>
                            </div>
                        </ListGroupItem>
                    </ListGroup>

                    <Modal show={this.state.showAddGroup} onHide={this.addGroup_close.bind(this, this.state.addGroup_ruleIndex, false)}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Apply group to audience: </h4>
                            <FormControl componentClass="select" onChange={this.changeAddGroupValue.bind(this)}>
                                {
                                    Object.keys(this.props.groups).map(function (group, index) {
                                        return <option key={index} value={group}>{this.props.groups[group].name}</option>
                                    }, this)
                                }
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.addGroup_close.bind(this, this.state.addGroup_ruleIndex, true)}>OK</Button> <Button onClick={this.addGroup_close.bind(this, this.state.addGroup_ruleIndex, false)} className="pull-right">Cancel</Button>
                        </Modal.Footer>
                    </Modal>

                </td></tr>
            )
        }
    }
}

export default class Actions extends React.Component {
    constructor (props) {
        super(props)
        this.onChange = editorState => this.setState({ editorState })
        this.deleteAction = this.deleteAction.bind(this)
        this.updateAction = this.updateAction.bind(this)
        this.resetNewStep = this.resetNewStep.bind(this)
        this.state = { actions: props.actions, action: this.props.action ? this.props.action : Object.keys(props.actions)[0], newStep: null, showNewDialog: false }
    }

    componentWillReceiveProps (newProps) {
        let action = this.state.action
        if (!newProps.actions[action])
            {action = Object.keys(newProps.actions)[0];}
        this.setState({ action, actions: newProps.actions })
    }

    componentWillUnmount () {
        this.props.setPersist({ action: this.state.action })
    }

    changeAction (e) {
        this.setState({ action: e.target.value, actions: this.closeSteps(e.target.value) })
    }

    deleteAction () {
        this.setState({ showDeleteDialog: true })
    }

    deleteAction_close (response) {
        if (response) {
            let actions = {}
            $.extend(actions, this.state.actions)
            delete actions[this.state.action]
            var action = (Object.keys(actions).length ? Object.keys(actions)[0] : null)
            this.setState({ showDeleteDialog: false, actions, action })
            this.props.updateData(actions)
        } else
            {this.setState({ showDeleteDialog: false });}
    }

    closeSteps (actionId) {
        let actions = {}
        $.extend(actions, this.state.actions)
        actions[actionId].steps.map((step, index) => {
            actions[actionId].steps[index].isEditing = false
        })
        return actions
    }

    changeActionValue (e) {
        let value = e.target.value
        this.actionValue = value
    }

    renameAction () {
        this.actionValue = '';
        this.setState({ showRenameDialog: true })
    }

    renameAction_close (response) {
        if (response) {
            let actions = {}
            $.extend(actions, this.state.actions)
            actions[this.state.action].name = this.actionValue
            this.setState({ showRenameDialog: false })
            this.props.updateData(actions)
        } else
            {this.setState({ showRenameDialog: false });}
    }

    newAction () {
        this.actionValue = '';
        this.setState({ showNewDialog: true })
    }

    newAction_close (response) {
        if (response) {
            let actions = {}
            $.extend(actions, this.state.actions)
            var action = this.actionValue
            var aid = action.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            actions[aid] = { name: action, steps: [] }
            this.setState({ showNewDialog: false, action: aid, actions }, function () {
                this.props.updateData(actions)
            })
        } else
            {this.setState({ showNewDialog: false });}
    }

    updateAction (action) {
        let actions = {}
        $.extend(actions, this.state.actions)
        actions[this.state.action] = action
        this.setState({ actions, newStep: null })
        this.props.updateData(actions)
    }

    newStep () {
        let newStep = { editing: true, active: false, id: '', description: 'New Step', type: 'widget', rules: [], where: [], when: [] }
        this.setState({ newStep })
    }

    resetNewStep () {
        this.setState({ newStep: null })
    }

    deleteStep (item) {
    }

    render () {
        const styles = { editor: { border: '1px solid #ccc', cursor: 'text', minHeight: 80, padding: 10 } }
        var Table = ReactBootstrap.Table
        var FormGroup = ReactBootstrap.FormGroup
        var FormControl = ReactBootstrap.FormControl
        var Modal = ReactBootstrap.Modal
        var ListGroup = ReactBootstrap.ListGroup
        var ListGroupItem = ReactBootstrap.ListGroupItem
        var Button = ReactBootstrap.Button

        var newStepControl = (this.state.newStep ? (
            <StepsItem newStep={true} key="newStep"
                index={this.state.actions[this.state.action].steps.length}
                isEditing={true}
                account={this.props.account}
                step={this.state.newStep}
                groups={this.props.groups} /* used to get group names */
                settings={this.props.settings} /* used to get headHtml data to content editor */
                functions={{ deleteStep: this.deleteStep, resetNewStep: this.resetNewStep, updateAction: this.updateAction }}
                action={this.state.actions[this.state.action]}
                actionId={this.state.action} />
        ) : null)


        return (
            <div className="actions-pane">
                <h1>Actions</h1>
                <form className="form-inline">

                    <ListGroup style={{ marginBottom: '0px' }}>
                        <ListGroupItem className="row">
                            {(this.state.actions && Object.keys(this.state.actions).length)
                                ? (
                                    <FormGroup controlId="formControlsSelect" className="">
                                        <FormControl componentClass="select" placeholder="actions" value={this.state.action} onChange={this.changeAction.bind(this)}>
                                            {
                                                Object.keys(this.state.actions).map(function (key, index) {
                                                    return <option key={index} value={key}>{this.state.actions[key].name}</option>
                                                }, this)
                                            }
                                        </FormControl>
                                        <Button className="btn-primary" style={{ marginBottom: '0px' }} onClick={this.deleteAction.bind(this)}><span className="glyphicon glyphicon-remove"></span> Delete</Button>
                                        <Button className="btn-primary" style={{ marginBottom: '0px' }} onClick={this.renameAction.bind(this)}><span className="glyphicon glyphicon-retweet"></span> Rename</Button>
                                    </FormGroup>
                                ) : "You don't have any actions defined"
                            }
                            <Button style={{ marginBottom: '0px' }} className="btn-primary pull-right" onClick={this.newAction.bind(this)}><span className="glyphicon glyphicon-plus"></span> New</Button>
                        </ListGroupItem>
                    </ListGroup>

                    <div className="rows">
                        <div className="col-xs-12">

                            {(!(this.state.actions && this.state.action && this.state.actions[this.state.action])) ? (<Table></Table>)
                                : (
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th colSpan={3} style={{ verticalAlign: 'middle' }}>
                                                    <div className="col-xs-11"><h2>Steps</h2></div>
                                                    <FormGroup controlId="formControlsSelect" className="col-xs-1">
                                                        <Button style={{ marginBottom: '0px' }} onClick={this.newStep.bind(this)}><span className="glyphicon glyphicon-plus"></span></Button>
                                                    </FormGroup>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                (!(this.state.actions[this.state.action].steps.length || newStepControl)) ? (<tr><td>No steps currently defined</td></tr>)
                                                    // this.state.actions so it updates on newStep
                                                    : this.state.actions[this.state.action].steps.map(function (step, index) {
                                                        return (
                                                            <StepsItem key={index} index={index} step={step} account={this.props.account}
                                                                isEditing={'isEditing' in step ? step.isEditing : null}
                                                                groups={this.props.groups} /* used to get group names */
                                                                settings={this.props.settings} /* used to get headHtml data to html editor */
                                                                functions={{ deleteStep: this.deleteStep, updateAction: this.updateAction, jumpTab: this.props.jumpTab }} action={this.state.actions[this.state.action]} actionId={this.state.action} />
                                                        )
                                                    }, this)
                                            }
                                            {newStepControl}
                                        </tbody>
                                    </Table>
                                )}

                        </div>
                    </div>
                </form>
                <div className="clear"></div>

                <Modal show={this.state.showDeleteDialog} onHide={this.deleteAction_close.bind(this, false)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Are you sure you want to delete <em>{(this.state.actions && this.state.actions[this.state.action]) ? this.state.actions[this.state.action].name : 'undefined'}</em>?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.deleteAction_close.bind(this, true)}>Yes</Button> <Button onClick={this.deleteAction_close.bind(this, false)} className="pull-right">No</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showRenameDialog} onHide={this.renameAction_close.bind(this, false)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Rename action <em>{(this.state.actions && this.state.actions[this.state.action]) ? this.state.actions[this.state.action].name : 'undefined'}</em> to:</h4>
                        <FormControl type="text" defaultValue={(this.state.actions && this.state.actions[this.state.action]) ? this.state.actions[this.state.action].name : 'undefined'} onChange={this.changeActionValue.bind(this)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.renameAction_close.bind(this, true)}>OK</Button> <Button onClick={this.renameAction_close.bind(this, false)} className="pull-right">Cancel</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showNewDialog} onHide={this.newAction_close.bind(this, false)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>New action name: </h4>
                        <FormControl type="text" onChange={this.changeActionValue.bind(this)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.newAction_close.bind(this, true)}>OK</Button> <Button onClick={this.newAction_close.bind(this, false)} className="pull-right">Cancel</Button>
                    </Modal.Footer>
                </Modal>

            </div>

        )
    }
}
