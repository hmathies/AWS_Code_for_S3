/*  GROUPS  */
import React from 'react'
import PropTypes from 'prop-types'
import { HourSelect, DaySelect, DeviceTypeSelect, StateSelect, DurationInput, TimeInput, NumberInput } from '../common/selects'

const ReactBootstrap = require('react-bootstrap')

class ValueSet extends React.Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        children: PropTypes.func.isRequired
    }
    state = {
        count: this.props.count
    }

    static getDerivedStateFromProps = (props, state) => {
        if (props.count !== state.count) return { count: props.count }
    }

    render () {
        const { ListGroup } = ReactBootstrap
        const { ListGroupItem } = ReactBootstrap
        let output = ''

        const items = []
        for (let i = 0; i < this.props.count - 1; i++) {
            items.push(<ListGroupItem key={i}>{this.props.children(i, this.props.onChange)}</ListGroupItem>)
        }
        output = (
            <span>{this.props.children(this.state.count - 1, this.props.onChange)} <i onClick={this.props.onPlus} className="glyphicon glyphicon-plus-sign" /> {this.state.count > 1 ? <i onClick={this.props.onMinus} className="glyphicon glyphicon-minus-sign" /> : <i />}</span>
        )
        if (this.state.count > 1) {
            output = (
                <ListGroup style={{ display: 'table-cell' }}>
                    {items}
                    <ListGroupItem key={this.state.count - 1}>{output}</ListGroupItem>
                </ListGroup>
            )
        }
        return <span>{output}</span>
    }
}

class CriteriaValue extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        predicate: PropTypes.string.isRequired,
        locations: PropTypes.instanceOf(Array).isRequired
    }
    constructor (props) {
        super(props)
        let valList = props.value
        let values = typeof valList === 'string' ? valList.split('|') : ['']
        let state = { set: values.length, values }
        $.extend(state, props)
        this.state = state
    }
    componentWillReceiveProps (newProps) {
        const state = {}
        $.extend(state, newProps)
        this.setState(state)
    }
    transform (type, direction, value) {
        if (typeof value === 'string') {
            const vals = value.split('..')
            if (vals.length > 1) { return [this.transform(type, direction, vals[0]), this.transform(type, direction, vals[1])].join('..')}
        }
        switch (type) {
            case 'duration':
                if (direction === 'in') {
                    if (value && typeof value === 'string') { value = +value}
                    if (value && typeof value === 'number') {
                        const h = Math.floor(value / 3600)
                        const m = Math.floor(value % 3600 / 60)
                        const s = Math.floor(value % 3600 % 60)
                        return (`${(h < 10 ? '0' : '') + h }:${m < 10 ? '0' : ''}${m }:${s < 10 ? '0' : '' }${s}`)
                    } else { return '' }
                } else {
                    if (value && typeof value === 'string') {
                        value = value.replace(/_/g, '0')
                        const hms = value.split(':')
                        const s = (+hms[0]) * 60 * 60 + (+hms[1]) * 60 + (+hms[2])
                        return s
                    } else { return 0 }
                }
            case 'time':
                if (direction === 'in') {
                    if (value && typeof value === 'string') { value = +value}
                    if (value && typeof value === 'number') {
                        const h = Math.floor(value / 3600)
                        const m = Math.floor(value % 3600 / 60)
                        return (`${(h < 10 ? '0' : '') + h}:${m < 10 ? '0' : '' }${m}`)
                    } else { return '' }
                } else {
                    if (value && typeof value === 'string') {
                        value = value.replace(/_/g, '0')
                        const hm = value.split(':')
                        const s = (+hm[0]) * 60 * 60 + (+hm[1]) * 60
                        return s
                    } else { return 0 }
                }
            case 'hour':
                const { hours } = (new HourSelect())
                if (direction === 'in') {
                    return hours[value]
                } else {
                }
                break
            case 'day':
                const { days } = (new DaySelect())
                if (direction === 'in') {
                    return days[value]
                } else {
                }
                break
            case 'location':
                const { locations } = this.props
                if (direction === 'in') {
                    return locations.filter(l => l.id === value)[0].name
                } else {
                }
                break
            case 'country':
                if (direction === 'in') {
                    if (value === '') {
                        return 'US'
                    }
                }
                break
        }
        return value
    }
    width (type, input) {
        switch (type) {
            case 'zip': return '80px'
            case 'country': return '80px'
        }
        switch (input) {
            case 'number': return '80px'
            case 'text': return '150px'
        }
    }
    onChange (e) {
        const val = this.transform(this.state.type, 'out', e.target.value)
        this.props.onChange(val)
    }
    onChangeList (e) {
        let val, index
        if (Array.isArray(e)) {
            // when in 'betweens', array is sent with: value, name attribute
            val = e[0]
            index = e[1]
        } else {
            val = e.target.value
            index = e.target.attributes.getNamedItem('name').value
        }
        this.setValList(val, index)
    }
    setValList (val, index) {
        const { values } = this.state
        index = Number(index)
        if (typeof index === 'number' && values[index] !== null) {
            values[index] = this.transform(this.state.type, 'out', val)
        }
        const valList = values.join('|')
        this.setState({ values })
        this.props.onChange(valList)
    }

    onPlus () {
        const { values } = this.state
        let last = this.state.set - 1
        values[this.state.set] = values[last]
        last++
        this.setState({ set: this.state.set + 1, values }, () => this.setValList(values[last], last))
    }

    onMinus () {
        const { values } = this.state
        if (this.state.set > 1) {
            if (values.length >= this.state.set) {
                values.splice(this.state.set - 1)
            }
            this.setState({ set: this.state.set - 1, values })
            this.setValList(values[this.state.set])
        }
    }

    selectInit (val) {
        const { values } = this.state
        values[0] = val
        this.setState({ values })
        this.setValList(val)
    }

    /* {(index, onChange) => <FormControl name={index} type="text" style={{width:this.width(this.state.type,this.state.input)}} placeholder={this.state.value} value={this.parse(this.state.type,this.state.values[index])} predicate={this.props.predicate} onChange={onChange} /> } */

    render () {
        const { FormControl } = ReactBootstrap
        // var MaskedInput = require('react-maskedinput');
        let ValueControl = ''
        switch (this.state.type) {
            case 'string':
            case 'any':
            case 'country':
                ValueControl = (
                    <ValueSet count={this.state.set} onPlus={this.onPlus.bind(this)} onMinus={this.onMinus.bind(this)} onChange={this.onChangeList.bind(this)}>
                        {(index, onChange) => <FormControl name={index} type="text" style={{ width: this.width(this.state.type, this.state.input) }} placeholder={this.state.type} value={this.state.values[index]} onChange={onChange} />}
                    </ValueSet>
                ); break
            case 'number': ValueControl = (
                <ValueSet count={this.state.set} onPlus={this.onPlus.bind(this)} onMinus={this.onMinus.bind(this)} onChange={this.onChangeList.bind(this)}>
                    {(index, onChange) => <NumberInput name={index} style={{ width: this.width(this.state.type, this.state.input) }} transform={this.transform.bind(this, 'number')} placeholder={this.state.type} val={this.state.values[index]} predicate={this.props.predicate} onChange={onChange} />}
                </ValueSet>
            ); break
            case 'zip': ValueControl = (
                <ValueSet count={this.state.set} onPlus={this.onPlus.bind(this)} onMinus={this.onMinus.bind(this)} onChange={this.onChangeList.bind(this)}>
                    {(index, onChange) => <FormControl name={index} type="text" style={{ width: this.width(this.state.type, this.state.input) }} placeholder={this.state.type} value={this.state.values[index]} maxLength={5} onChange={onChange} />}
                </ValueSet>
            ); break
            case 'state': ValueControl = (
                <ValueSet count={this.state.set} onPlus={this.onPlus.bind(this)} onMinus={this.onMinus.bind(this)} onChange={this.onChangeList.bind(this)}>
                    {(index, onChange) => <StateSelect name={index} option={index} val={this.state.values[index]} predicate={this.props.predicate} onChange={onChange} selectInit={this.selectInit.bind(this)} />}
                </ValueSet>
            ); break
            case 'hour': ValueControl = (
                <ValueSet count={this.state.set} onPlus={this.onPlus.bind(this)} onMinus={this.onMinus.bind(this)} onChange={this.onChangeList.bind(this)}>
                    {(index, onChange) => <HourSelect name={index} type="text" transform={this.transform.bind(this, 'hour')} val={this.state.values[index]} predicate={this.props.predicate} onChange={onChange} selectInit={this.selectInit.bind(this)} />}
                </ValueSet>
            ); break
            case 'day': ValueControl = (
                <ValueSet count={this.state.set} onPlus={this.onPlus.bind(this)} onMinus={this.onMinus.bind(this)} onChange={this.onChangeList.bind(this)}>
                    {(index, onChange) => <DaySelect name={index} type="text" transform={this.transform.bind(this, 'day')} val={this.state.values[index]} predicate={this.props.predicate} onChange={onChange} selectInit={this.selectInit.bind(this)} />}
                </ValueSet>
            ); break
            case 'distance':
                ValueControl = (
                    <ValueSet count={this.state.set} onPlus={this.onPlus.bind(this)} onMinus={this.onMinus.bind(this)} onChange={this.onChangeList.bind(this)}>
                        {(index, onChange) => <NumberInput name={index} style={{ width: this.width(this.state.type, this.state.input) }} transform={this.transform.bind(this, 'number')} placeholder="in miles" val={this.state.values[index]} predicate={this.props.predicate} onChange={onChange} />}
                    </ValueSet>
                ); break
            case 'duration':
                ValueControl = (
                    <ValueSet count={this.state.set} onPlus={this.onPlus.bind(this)} onMinus={this.onMinus.bind(this)} onChange={this.onChangeList.bind(this)}>
                        {(index, onChange) => <DurationInput name={index} type="text" transform={this.transform.bind(this, 'duration')} val={this.state.values[index]} predicate={this.props.predicate} onChange={onChange} />}
                    </ValueSet>
                ); break
            case 'time':
                ValueControl = (
                    <ValueSet count={this.state.set} onPlus={this.onPlus.bind(this)} onMinus={this.onMinus.bind(this)} onChange={this.onChangeList.bind(this)}>
                        {(index, onChange) => <TimeInput name={index} type="text" transform={this.transform.bind(this, 'time')} val={this.state.values[index]} predicate={this.props.predicate} onChange={onChange} />}
                    </ValueSet>
                ); break
            case 'date': ValueControl = (
                <FormControl type="text" state={this.state.value} data-mask="99/99/9999" placeholder="Date" onChange={this.props.onChange} />
            ); break
            case 'device-types': ValueControl = (
                <ValueSet count={this.state.set} onPlus={this.onPlus.bind(this)} onMinus={this.onMinus.bind(this)} onChange={this.onChangeList.bind(this)}>
                    {(index, onChange) => <DeviceTypeSelect name={index} option={index} val={this.state.values[index]} predicate={this.props.predicate} onChange={onChange} selectInit={this.selectInit.bind(this)} />}
                </ValueSet>
            ); break
            case 'location': ValueControl = (
                <FormControl componentClass="select" placeholder="locations" value={this.props.value} onChange={this.props.onChange}>
                    {
                        this.props.locations.map(function (key, index) {
                            return <option key={index} value={key.id}>{key.name}</option>
                        }, this)
                    }
                </FormControl>
            ); break
            case 'field': ValueControl = (
                <ValueSet count={this.state.set} onPlus={this.onPlus.bind(this)} onMinus={this.onMinus.bind(this)} onChange={this.onChangeList.bind(this)}>
                    {(index, onChange) => <FormControl name={index} type="text" style={{ width: this.width(this.state.type, this.state.input) }} placeholder={this.state.type} value={this.state.values[index]} onChange={onChange} />}
                </ValueSet>
            ); break
        }
        return (
            <span>{ValueControl}</span>
        )
    }
}

export default class CriteriaItem extends React.Component {
    constructor (props) {
        super(props)
        this.state = this.initParams(this.initState(props), props)
        this.criterion = null
        this.changedValue = null
        this.changedDetail = null
        this.changeActive = this.changeActive.bind(this)
        this.changeCriterion = this.changeCriterion.bind(this)
        this.changeDescriptor = this.changeDescriptor.bind(this)
        this.changeOperator = this.changeOperator.bind(this)
        this.changeValue = this.changeValue.bind(this)
        this.grammar_operators = {
            'is': { name: 'is', entry: ['text'] },
            'is-not': { name: 'is not', entry: ['text'] },
            'match': { name: 'matches', entry: ['text'] },
            'does-not-match': { name: 'does not match', entry: ['text'] },
            'contains': { name: 'contains', entry: ['text'] },
            'does-not-contain': { name: 'does not contain', entry: ['text'] },
            'eq': { name: '=', entry: ['number'] },
            'neq': { name: 'is not', entry: ['number'] },
            'gt': { name: '>', entry: ['number'] },
            'gte': { name: '>=', entry: ['number'] },
            'lt': { name: '<', entry: ['number'] },
            'lte': { name: '<=', entry: ['number'] },
            'between': { name: 'between', entry: ['number', 'number'] },
            'is-not-between': { name: 'is not between', entry: ['number', 'number'] },
            'is-city-state': { name: 'is', entry: ['string', 'string'] },
            'is-not-city-state': { name: 'is not', entry: ['string', 'string'] }
        }
        this.grammar_types = {
            'string': { operators: ['is', 'is-not', 'match', 'does-not-match', 'contains', 'does-not-contain'], format: '"%s"' },
            'number': { operators: ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'between', 'is-not-between'], format: '%s' },
            'any': { operators: ['is', 'is-not', 'match', 'does-not-match', 'contains', 'does-not-contain', 'eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'between', 'is-not-between'], format: '"%s"' },
            'country': { operators: ['is', 'is-not'], format: '%s' },
            'zip': { operators: ['is', 'is-not'], format: '%s' },
            'state': { operators: ['is', 'is-not'], format: '%s' },
            'city-state': { operators: ['is-city-state', 'is-not-city-state'], format: '%s' },
            'duration': { operators: ['gt', 'gte', 'lt', 'lte', 'between', 'is-not-between'], format: '%s' },
            'time': { operators: ['gt', 'gte', 'lt', 'lte', 'between', 'is-not-between'], format: '%s' },
            'distance': { operators: ['gt', 'lt', 'between', 'is-not-between'], format: '%s' },
            'hour': { operators: ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'between', 'is-not-between'], format: '%s' },
            'day': { operators: ['is', 'is-not', 'between', 'is-not-between'], format: '%s' },
            'date': { operators: ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'between', 'is-not-between'], format: '%s' },
            'device-types': { operators: ['is', 'is-not'], format: '%s' }
        }
        this.grammar_descriptors = {
            'current-page': { title: 'current page', access: { premium: true, lite: true } },
            'previous-page': { title: 'previous page', access: { premium: true, lite: true } },
            'current-session': { title: 'current session', access: { premium: true, lite: true } },
            'current-session-start': { title: 'current session start', access: { premium: true, lite: true } },
            'previous-session': { title: 'previous session', access: { premium: true, lite: false } },
            'previous-session-start': { title: 'previous session start', access: { premium: true, lite: true } },
            'previous-session-end': { title: 'previous session end', access: { premium: true, lite: true } },
            'first-session': { title: 'first session', access: { premium: true, lite: false } },
            'first-session-start': { title: 'first session start', access: { premium: true, lite: false } },
            'first-session-end': { title: 'first session send', access: { premium: true, lite: false } },
            'any-session': { title: 'any session', access: { premium: true, lite: false } }
        }
        this.grammar = props.grammar
    };

    componentDidMount () {
        if (this.props[this.props.list].editing) { this.changeEditing(true)}
    }
    componentWillReceiveProps (newProps) {
        const state = {}
        if (!this.state.isEditing) {
            this.setState(this.initParams(state, newProps))
        }
    }

    changeActive () {
        const index = this.props.index
        let item = this.props.item
        item[this.props.list][index].active = !item[this.props.list][index].active
        this.props.functions.updateItem(item)
    }
    changeEditing (state) {
        if (state) {
            const criterion = this.props[this.props.list].params[0]
            this.thisGrammar = ($.grep(this.grammar, function (i) { return i.id === criterion }))[0]
            this.changedValue = this.props[this.props.list].params[this.props[this.props.list].params.length - 1]
            this.changedDetail = this.initDetail(true)
            this.setState({
                isEditing: state,
                criterion,
                preposition: this.thisGrammar.params[0].preposition,
                descriptor: this.props[this.props.list].params[this.props[this.props.list].params.length - 3],
                operator: this.props[this.props.list].params[this.props[this.props.list].params.length - 2]
            })
        } else {
            this.setState({
                isEditing: state
            })
        }
    }
    removeCriterion () {
        const { index, item } = this.props
        item[this.props.list].splice(index, 1)
        this.props.functions.updateItem(item)
    }
    cancelCriterion () {
        this.changeEditing(false)
        if (this.props.newCriterion) {
            this.props.functions.resetNewCriterion()
        }
    }
    saveCriterion () {
        const { index, item } = this.props
        if (this.props.newCriterion) {
            item[this.props.list].push({ active: false })
        }

        let displayString = ''
        const params = []
        params.push(this.state.criterion)
        let detailString
        this.thisGrammar.params.map(function (key, index) {
            if (index > 0) {
                detailString = this.refs.criteriaDetail.transform(this.thisGrammar.params[index].name, 'in', this.changedDetail)
                displayString += ` '${detailString}'`
                params.push(this.changedDetail)
            } else { displayString += key.name }
            if (key.preposition) displayString += ` ${key.preposition}`
        }.bind(this))
        if (this.thisGrammar.descriptor) {
            displayString += ` ${this.grammar_descriptors[this.state.descriptor].title}`
            params.push(this.state.descriptor)
        }
        if (this.state.operator) {
            displayString += ` ${this.grammar_operators[this.state.operator].name}`
            params.push(this.state.operator)
        }

        let valString
        if (typeof this.changedValue === 'string' && this.changedValue.indexOf('|') >= 0) {
            const vals = []
            const valList = this.changedValue.split(/\|/)
            valList.map(val => vals.push(this.refs.criteriaValue.transform(this.thisGrammar.type, 'in', val)))
            if (vals.length > 1) {
                vals[vals.length - 1] = `or ${vals[vals.length - 1]}`
            }
            valString = vals.join(vals.length > 2 ? ', ' : ' ')
        } else {
            valString = this.refs.criteriaValue.transform(this.thisGrammar.type, 'in', this.changedValue)
        }
        displayString += ` ${this.grammar_types[this.thisGrammar.type].format.replace(/%s/, valString)}`
        params.push(this.changedValue)

        this.changeEditing(false)
        item[this.props.list][index].string = displayString
        item[this.props.list][index].params = params
        this.props.functions.updateItem(item)
    }

    initDetail (isExisting) {
        if (this.thisGrammar.params.length > 1) {
            if (this.thisGrammar.params[1].name === 'location') {
                if (isExisting) {
                    return this.props[this.props.list].params[1] ? this.props[this.props.list].params[1] : this.props.settings.locations[0].id
                } else {
                    return this.props.settings.locations[0].id
                }
            } else if (this.thisGrammar.params[1].name === 'field') {
                if (isExisting) {
                    return this.props[this.props.list].params[1] ? this.props[this.props.list].params[1] : ''
                } else {
                    return ''
                }
            }
        }
        return ''
    }

    changeCriterion (e) {
        const id = e.target.value
        this.thisGrammar = ($.grep(this.grammar, function (i) { return i.id === id }))[0]
        this.changedDetail = this.initDetail(false)
        this.setState({
            criterion: id,
            preposition: this.thisGrammar.params[0].preposition,
            descriptor: (Array.isArray(this.thisGrammar.descriptor) ? (this.state.descriptor && this.thisGrammar.descriptor.indexOf(this.state.descriptor) >= 0 ? this.state.descriptor : this.thisGrammar.descriptor[0]) : null),
            // descriptor:(Array.isArray(this.state.descriptor) ?  (this.state.descriptor && this.thisGrammar.descriptor.indexOf(this.state.descriptor)>=0 ? this.state.descriptor : this.thisGrammar.descriptor[0]) : null),
            operator: (this.state.operator && this.grammar_types[this.thisGrammar.type].operators.indexOf(this.state.operator) >= 0) ? this.state.operator : this.grammar_types[this.thisGrammar.type].operators[0],
            changedDetail: '',
            changedValue: this.changedValue ? this.changedValue : ''
        })
    }
    changeDetailField (e) {
        const value = e
        this.changedDetail = value
    }
    changeDetailLocation (e) {
        const { value } = e.target
        this.changedDetail = value
    }
    changeOperator (e) {
        const operator = e.target.value
        this.setState({ operator })
    }
    changeDescriptor (e) {
        const descriptor = e.target.value
        this.setState({ descriptor })
    }
    changeValue (value) {
        this.changedValue = value
    }

    initParams (state, props) {
        if (!state) { return null }
        state.criterion = props[props.list].params[0]
        state.descriptor = props[props.list].params[props[props.list].params.length - 3]
        state.operator = props[props.list].params[props[props.list].params.length - 2]
        return state
    }
    initState (props) {
        if (!props[props.list].params) {
            this.removeCriterion()
            return null
        }
        const state = {
            isEditing: false,
            params: props[props.list].params ? props[props.list].params.slice(1) : [],
            changedCriterion: null,
            controls: { selects: ['', '', ''] },
            value: { type: '', input: 'string', value: props[props.list].params[props[props.list].params.length - 1] }
        }
        return state
    }

    render () {
        const {
            FormGroup, FormControl,
            ListGroup, ListGroupItem,
            Button
        } = ReactBootstrap

        const controls = []
        let descriptorControl = ''
        if (this.state.isEditing) {
            // const { criterion } = this.state
            if (this.thisGrammar.params.length > 1) {
                const op = { name: 'is', entry: ['string'] }
                this.thisGrammar.params.slice(1).map((value, index) => {
                    switch (value.entry) {
                        case 'string':
                            controls.push(
                                <span key={index}>
                                    <CriteriaValue ref="criteriaDetail" type="field" input={op.entry[0]} placeholder={value.name} value={this.changedDetail} onChange={this.changeDetailField.bind(this)} />
                                    <span> {value.preposition} </span>
                                </span>
                            )
                            break
                        case 'location':
                            controls.push(
                                <span key={index}>
                                    <CriteriaValue ref="criteriaDetail" type="location" input={op.entry[0]} value={this.changedDetail} locations={this.props.settings.locations} onChange={this.changeDetailLocation.bind(this)} />
                                    <span> {value.preposition} </span>
                                </span>
                            )
                            break
                    }
                })
            }
            if (this.thisGrammar.descriptor) {
                descriptorControl = (
                    <FormControl componentClass="select" placeholder="select" value={this.state.descriptor} onChange={this.changeDescriptor}>
                        {
                            this.thisGrammar.descriptor.map(function (key, index) {
                                const descriptor = this.grammar_descriptors[key]
                                if (descriptor.access[this.props.account.org.plan]) { return <option key={index} value={key}>{descriptor.title}</option> }
                            }, this)
                        }
                    </FormControl>
                )
            }
        }
        if (!this.state.isEditing) {
            return (
                <tr>
                    <td><span className={this.props[this.props.list].active ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'} aria-hidden="true" onClick={this.changeActive.bind(this)}></span></td>
                    <td onClick={this.changeEditing.bind(this, true)}>{this.props[this.props.list].string}</td>
                    <td style={{ textAlign: 'right' }}><span onClick={this.changeEditing.bind(this, true)} className="glyphicon glyphicon-pencil" aria-hidden="true"></span> &nbsp; <span onClick={this.removeCriterion.bind(this)} className="glyphicon glyphicon-remove" aria-hidden="true"></span></td>
                </tr>
            )
        } else {
            this.lastid = null
            return (
                <tr><td colSpan={3}>
                    <ListGroup style={{ marginBottom: '0px' }}>
                        <ListGroupItem className="row">
                            <FormGroup bsSize="small" controlId="formControlsSelect" className="col-md-12">
                                <FormControl componentClass="select" placeholder="select" value={this.state.criterion} onChange={this.changeCriterion}>
                                    {
                                        this.grammar.map(function (key, index) {
                                            let option = null
                                            if (key.id === 'separator') {
                                                if (this.lastid !== 'separator') { option = (<option key={index} disabled>──────────────</option>) }
                                            } else {
                                                if (key['access'][this.props.account.org.plan]) { option = (<option key={index} value={key.id}>{key.params[0].name}</option>) }
                                            }
                                            if (option) {
                                                this.lastid = key.id
                                                return option
                                            }
                                        }, this)
                                    }
                                </FormControl>
                                <span className=""> {this.state.preposition} </span>
                                {controls}
                                {descriptorControl}

                                <FormControl componentClass="select" placeholder="select" value={this.state.operator} onChange={this.changeOperator}>
                                    {
                                        this.grammar_types[this.thisGrammar.type].operators.map(function (key, index) {
                                            return <option key={index} value={key}>{this.grammar_operators[key].name}</option>
                                        }, this)
                                    }
                                </FormControl>

                                <CriteriaValue key="CriteriaValue"
                                    ref="criteriaValue"
                                    type={this.thisGrammar.type}
                                    input={this.grammar_operators[this.state.operator].entry[0]}
                                    predicate={this.state.operator}
                                    value={this.changedValue}
                                    onChange={this.changeValue.bind(this)}
                                />
                                <span className="pull-right">
                                    <Button onClick={this.saveCriterion.bind(this)}><span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Save</Button>
                                    <Button onClick={this.cancelCriterion.bind(this)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Cancel</Button>
                                </span>
                            </FormGroup>
                        </ListGroupItem>
                    </ListGroup>
                </td></tr>
            )
        }
    }
}
