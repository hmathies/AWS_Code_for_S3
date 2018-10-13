import React from 'react'
import PropTypes from 'prop-types'
const ReactBootstrap = require('react-bootstrap')

class Functions {
    initBetween (that, val, isTransformable) {
        // isTransformable = does the value stored need to be converted to be set in the control?
        const betweens = []
        val.split('..').map(v => { isTransformable ? betweens.push(that.props.transform('in', +v)) : betweens.push(+v) })
        let vals = {}
        if (betweens.length > 1) vals = { a: betweens[0], b: betweens[1] }
        else { vals = { a: betweens[0], b: betweens[0] } }
        return vals
    }
    betweenOnChange (that, e) {
        const val = e.target.value
        const index = e.target.attributes.getNamedItem('name').value
        if (index === '0') that.val.a = val
        else that.val.b = val
        // this.props.onChange([valStr,index]);
    }
    sendIt (that) {
        if (!that.val.a) that.val.a = ''
        if (!that.val.b) that.val.b = ''
        const valStr = `${that.val.a}..${that.val.b}`
        that.props.onChange([valStr, that.props.name])
        that.setState({ val: { a: that.val.a, b: that.val.b } })
    }
}

export class HourSelect extends React.Component {
    static propTypes = {
        predicate: PropTypes.string.isRequired,
        val: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        selectInit: PropTypes.func.isRequired
    }
    constructor (props) {
        super(props)
        this.hours =
            {
                '0': '12 midnight',
                '1': '1 am',
                '2': '2 am',
                '3': '3 am',
                '4': '4 am',
                '5': '5 am',
                '6': '6 am',
                '7': '7 am',
                '8': '8 am',
                '9': '9 am',
                '10': '10 am',
                '11': '11 am',
                '12': '12 noon',
                '13': '1 pm',
                '14': '2 pm',
                '15': '3 pm',
                '16': '4 pm',
                '17': '5 pm',
                '18': '6 pm',
                '19': '7 pm',
                '20': '8 pm',
                '21': '9 pm',
                '22': '10 pm',
                '23': '11 pm'
            }
        if (!props) return
        this.functions = new Functions()
        this.state = { predicate: props.predicate }
        this.state.val = (props.predicate.indexOf('between') >= 0) ? this.functions.initBetween(this, props.val, false) : {}
        this.val = { a: this.state.val.a, b: this.state.val.b }
    }

    componentWillReceiveProps (newProps) {
        if (newProps.predicate !== this.state.predicate) { this.setState({ predicate: newProps.predicate }) }
        const vals = newProps.predicate === 'between' ? this.functions.initBetween(this, newProps.val, false) : {}
        this.setState(vals)
    }
    componentWillMount () {
        if (!this.props.val) this.props.selectInit(Object.keys(this.hours)[0])
    }

    render () {
        const { FormControl } = ReactBootstrap
        if (this.props.predicate === 'between') {
            return (
                <span>
                    <FormControl componentClass="select" value={this.state.val.a} name={'0'} onChange={function (t, f, e) { f.betweenOnChange(t, e); f.sendIt(t) }.bind(this, this, this.functions)} placeholder="hours">
                        {
                            Object.keys(this.hours).map(function (key) {
                                return <option key={key} value={key}>{this.hours[key]}</option>
                            }, this)
                        }
                    </FormControl><span>&nbsp;and&nbsp;</span>
                    <FormControl componentClass="select" value={this.state.val.b} name={'1'} onChange={function (t, f, e) { f.betweenOnChange(t, e); f.sendIt(t) }.bind(this, this, this.functions)} placeholder="hours">
                        {
                            Object.keys(this.hours).map(function (key) {
                                return <option key={key} value={key}>{this.hours[key]}</option>
                            }, this)
                        }
                    </FormControl>
                </span>
            )
        } else {
            return (
                <FormControl componentClass="select" placeholder="hours" name={this.props.name} value={this.props.val} onChange={this.props.onChange} >
                    {
                        Object.keys(this.hours).map(function (key) {
                            return <option key={key} value={key}>{this.hours[key]}</option>
                        }, this)
                    }
                </FormControl>
            )
        }
    }
}

export class DaySelect extends React.Component {
    static propTypes = {
        predicate: PropTypes.string.isRequired,
        val: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        selectInit: PropTypes.func.isRequired
    }
    constructor (props) {
        super(props)
        this.days =
            {
                '0': 'Sunday',
                '1': 'Monday',
                '2': 'Tuesday',
                '3': 'Wednesday',
                '4': 'Thursday',
                '5': 'Friday',
                '6': 'Saturday'
            }
        if (!props) return
        this.functions = new Functions()
        this.state = { predicate: props.predicate }
        this.state.val = (props.predicate.indexOf('between') >= 0) ? this.functions.initBetween(this, props.val, false) : {}
        this.val = { a: this.state.val.a, b: this.state.val.b }
    }
    componentWillReceiveProps (newProps) {
        if (newProps.predicate !== this.state.predicate) { this.setState({ predicate: newProps.predicate }) }
        const vals = newProps.predicate === 'between' ? this.functions.initBetween(this, newProps.val, false) : {}
        this.setState(vals)
    }
    componentWillMount () {
        if (!this.props.val) this.props.selectInit(Object.keys(this.days)[0])
    }
    render () {
        const { FormControl } = ReactBootstrap
        if (this.props.predicate === 'between') {
            return (
                <span>
                    <FormControl componentClass="select" value={this.state.val.a} name={'0'} onChange={function (t, f, e) { f.betweenOnChange(t, e); f.sendIt(t) }.bind(this, this, this.functions)} placeholder="days">
                        {
                            Object.keys(this.days).map(function (key) {
                                return <option key={key} value={key}>{this.days[key]}</option>
                            }, this)
                        }
                    </FormControl><span>&nbsp;and&nbsp;</span>
                    <FormControl componentClass="select" value={this.state.val.b} name={'1'} onChange={function (t, f, e) { f.betweenOnChange(t, e); f.sendIt(t) }.bind(this, this, this.functions)} placeholder="days">
                        {
                            Object.keys(this.days).map(function (key) {
                                return <option key={key} value={key}>{this.days[key]}</option>
                            }, this)
                        }
                    </FormControl>
                </span>
            )
        } else {
            return (
                <FormControl componentClass="select" name={this.props.name} placeholder="days" value={this.props.val} onChange={this.props.onChange} >
                    {
                        Object.keys(this.days).map(function (key) {
                            return <option key={key} value={key}>{this.days[key]}</option>
                        }, this)
                    }
                </FormControl>
            )
        }
    }
}

export class DeviceTypeSelect extends React.Component {
    static propTypes = {
        predicate: PropTypes.string.isRequired,
        val: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        selectInit: PropTypes.func.isRequired
    }
    constructor (props) {
        super(props)
        this.devices =
            {
                'desktop': 'desktop',
                'tablet': 'tablet',
                'handheld': 'handheld'
            }
        if (!props) return
        this.state = { predicate: props.predicate }
    }
    componentWillReceiveProps (newProps) {
        if (newProps.predicate !== this.state.predicate) { this.setState({ predicate: newProps.predicate }) }
    }
    componentWillMount () {
        if (!this.props.val) this.props.selectInit(Object.keys(this.devices)[0])
    }
    render () {
        const { FormControl } = ReactBootstrap
        return (
            <FormControl componentClass="select" placeholder="device types" name={this.props.name} value={this.props.val} onChange={this.props.onChange}>
                {
                    Object.keys(this.devices).map(function (key) {
                        return <option key={key} value={key}>{this.devices[key]}</option>
                    }, this)
                }
            </FormControl>
        )
    }
}

export class StateSelect extends React.Component {
    static propTypes = {
        predicate: PropTypes.string.isRequired,
        val: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        selectInit: PropTypes.func.isRequired
    }
    constructor (props) {
        super(props)
        this.states =
            {
                'AL': 'Alabama',
                'AK': 'Alaska',
                'AS': 'American Samoa',
                'AZ': 'Arizona',
                'AR': 'Arkansas',
                'CA': 'California',
                'CO': 'Colorado',
                'CT': 'Connecticut',
                'DE': 'Delaware',
                'DC': 'District Of Columbia',
                'FM': 'Federated States Of Micronesia',
                'FL': 'Florida',
                'GA': 'Georgia',
                'GU': 'Guam',
                'HI': 'Hawaii',
                'ID': 'Idaho',
                'IL': 'Illinois',
                'IN': 'Indiana',
                'IA': 'Iowa',
                'KS': 'Kansas',
                'KY': 'Kentucky',
                'LA': 'Louisiana',
                'ME': 'Maine',
                'MH': 'Marshall Islands',
                'MD': 'Maryland',
                'MA': 'Massachusetts',
                'MI': 'Michigan',
                'MN': 'Minnesota',
                'MS': 'Mississippi',
                'MO': 'Missouri',
                'MT': 'Montana',
                'NE': 'Nebraska',
                'NV': 'Nevada',
                'NH': 'New Hampshire',
                'NJ': 'New Jersey',
                'NM': 'New Mexico',
                'NY': 'New York',
                'NC': 'North Carolina',
                'ND': 'North Dakota',
                'MP': 'Northern Mariana Islands',
                'OH': 'Ohio',
                'OK': 'Oklahoma',
                'OR': 'Oregon',
                'PW': 'Palau',
                'PA': 'Pennsylvania',
                'PR': 'Puerto Rico',
                'RI': 'Rhode Island',
                'SC': 'South Carolina',
                'SD': 'South Dakota',
                'TN': 'Tennessee',
                'TX': 'Texas',
                'UT': 'Utah',
                'VT': 'Vermont',
                'VI': 'Virgin Islands',
                'VA': 'Virginia',
                'WA': 'Washington',
                'WV': 'West Virginia',
                'WI': 'Wisconsin',
                'WY': 'Wyoming'
            }
        this.state = { predicate: props.predicate }
    }
    componentWillReceiveProps (newProps) {
        if (newProps.predicate !== this.state.predicate) { this.setState({ predicate: newProps.predicate }) }
    }
    componentWillMount () {
        if (!this.props.val) this.props.selectInit(Object.keys(this.states)[0])
    }
    render () {
        const { FormControl } = ReactBootstrap
        return (
            <FormControl componentClass="select" placeholder="states" name={this.props.name} value={this.props.val} onChange={this.props.onChange}>
                {
                    Object.keys(this.states).map(function (key) {
                        return <option key={key} value={key}>{this.states[key]}</option>
                    }, this)
                }
            </FormControl>
        )
    }
}

export class CountrySelect extends React.Component {
    static propTypes = {
        predicate: PropTypes.string.isRequired,
        val: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        selectInit: PropTypes.func.isRequired
    }
    constructor (props) {
        super(props)
        this.countries =
            {
                'AF': 'Afghanistan',
                'AX': 'Åland Islands',
                'AL': 'Albania',
                'DZ': 'Algeria',
                'AS': 'American Samoa',
                'AD': 'AndorrA',
                'AO': 'Angola',
                'AI': 'Anguilla',
                'AQ': 'Antarctica',
                'AG': 'Antigua and Barbuda',
                'AR': 'Argentina',
                'AM': 'Armenia',
                'AW': 'Aruba',
                'AU': 'Australia',
                'AT': 'Austria',
                'AZ': 'Azerbaijan',
                'BS': 'Bahamas',
                'BH': 'Bahrain',
                'BD': 'Bangladesh',
                'BB': 'Barbados',
                'BY': 'Belarus',
                'BE': 'Belgium',
                'BZ': 'Belize',
                'BJ': 'Benin',
                'BM': 'Bermuda',
                'BT': 'Bhutan',
                'BO': 'Bolivia',
                'BA': 'Bosnia and Herzegovina',
                'BW': 'Botswana',
                'BV': 'Bouvet Island',
                'BR': 'Brazil',
                'IO': 'British Indian Ocean Territory',
                'BN': 'Brunei Darussalam',
                'BG': 'Bulgaria',
                'BF': 'Burkina Faso',
                'BI': 'Burundi',
                'KH': 'Cambodia',
                'CM': 'Cameroon',
                'CA': 'Canada',
                'CV': 'Cape Verde',
                'KY': 'Cayman Islands',
                'CF': 'Central African Republic',
                'TD': 'Chad',
                'CL': 'Chile',
                'CN': 'China',
                'CX': 'Christmas Island',
                'CC': 'Cocos (Keeling) Islands',
                'CO': 'Colombia',
                'KM': 'Comoros',
                'CG': 'Congo',
                'CD': 'Congo, Democratic Republic',
                'CK': 'Cook Islands',
                'CR': 'Costa Rica',
                'CI': 'Cote D"Ivoire',
                'HR': 'Croatia',
                'CU': 'Cuba',
                'CY': 'Cyprus',
                'CZ': 'Czech Republic',
                'DK': 'Denmark',
                'DJ': 'Djibouti',
                'DM': 'Dominica',
                'DO': 'Dominican Republic',
                'EC': 'Ecuador',
                'EG': 'Egypt',
                'SV': 'El Salvador',
                'GQ': 'Equatorial Guinea',
                'ER': 'Eritrea',
                'EE': 'Estonia',
                'ET': 'Ethiopia',
                'FK': 'Falkland Islands (Malvinas)',
                'FO': 'Faroe Islands',
                'FJ': 'Fiji',
                'FI': 'Finland',
                'FR': 'France',
                'GF': 'French Guiana',
                'PF': 'French Polynesia',
                'TF': 'French Southern Territories',
                'GA': 'Gabon',
                'GM': 'Gambia',
                'GE': 'Georgia',
                'DE': 'Germany',
                'GH': 'Ghana',
                'GI': 'Gibraltar',
                'GR': 'Greece',
                'GL': 'Greenland',
                'GD': 'Grenada',
                'GP': 'Guadeloupe',
                'GU': 'Guam',
                'GT': 'Guatemala',
                'GG': 'Guernsey',
                'GN': 'Guinea',
                'GW': 'Guinea-Bissau',
                'GY': 'Guyana',
                'HT': 'Haiti',
                'HM': 'Heard Island and Mcdonald Islands',
                'VA': 'Holy See (Vatican City State)',
                'HN': 'Honduras',
                'HK': 'Hong Kong',
                'HU': 'Hungary',
                'IS': 'Iceland',
                'IN': 'India',
                'ID': 'Indonesia',
                'IR': 'Iran',
                'IQ': 'Iraq',
                'IE': 'Ireland',
                'IM': 'Isle of Man',
                'IL': 'Israel',
                'IT': 'Italy',
                'JM': 'Jamaica',
                'JP': 'Japan',
                'JE': 'Jersey',
                'JO': 'Jordan',
                'KZ': 'Kazakhstan',
                'KE': 'Kenya',
                'KI': 'Kiribati',
                'KP': 'Korea (North)',
                'KR': 'Korea (South)',
                'XK': 'Kosovo',
                'KW': 'Kuwait',
                'KG': 'Kyrgyzstan',
                'LA': 'Laos',
                'LV': 'Latvia',
                'LB': 'Lebanon',
                'LS': 'Lesotho',
                'LR': 'Liberia',
                'LY': 'Libyan Arab Jamahiriya',
                'LI': 'Liechtenstein',
                'LT': 'Lithuania',
                'LU': 'Luxembourg',
                'MO': 'Macao',
                'MK': 'Macedonia',
                'MG': 'Madagascar',
                'MW': 'Malawi',
                'MY': 'Malaysia',
                'MV': 'Maldives',
                'ML': 'Mali',
                'MT': 'Malta',
                'MH': 'Marshall Islands',
                'MQ': 'Martinique',
                'MR': 'Mauritania',
                'MU': 'Mauritius',
                'YT': 'Mayotte',
                'MX': 'Mexico',
                'FM': 'Micronesia',
                'MD': 'Moldova',
                'MC': 'Monaco',
                'MN': 'Mongolia',
                'MS': 'Montserrat',
                'MA': 'Morocco',
                'MZ': 'Mozambique',
                'MM': 'Myanmar',
                'NA': 'Namibia',
                'NR': 'Nauru',
                'NP': 'Nepal',
                'NL': 'Netherlands',
                'AN': 'Netherlands Antilles',
                'NC': 'New Caledonia',
                'NZ': 'New Zealand',
                'NI': 'Nicaragua',
                'NE': 'Niger',
                'NG': 'Nigeria',
                'NU': 'Niue',
                'NF': 'Norfolk Island',
                'MP': 'Northern Mariana Islands',
                'NO': 'Norway',
                'OM': 'Oman',
                'PK': 'Pakistan',
                'PW': 'Palau',
                'PS': 'Palestinian Territory, Occupied',
                'PA': 'Panama',
                'PG': 'Papua New Guinea',
                'PY': 'Paraguay',
                'PE': 'Peru',
                'PH': 'Philippines',
                'PN': 'Pitcairn',
                'PL': 'Poland',
                'PT': 'Portugal',
                'PR': 'Puerto Rico',
                'QA': 'Qatar',
                'RE': 'Reunion',
                'RO': 'Romania',
                'RU': 'Russian Federation',
                'RW': 'Rwanda',
                'SH': 'Saint Helena',
                'KN': 'Saint Kitts and Nevis',
                'LC': 'Saint Lucia',
                'PM': 'Saint Pierre and Miquelon',
                'VC': 'Saint Vincent and the Grenadines',
                'WS': 'Samoa',
                'SM': 'San Marino',
                'ST': 'Sao Tome and Principe',
                'SA': 'Saudi Arabia',
                'SN': 'Senegal',
                'RS': 'Serbia',
                'ME': 'Montenegro',
                'SC': 'Seychelles',
                'SL': 'Sierra Leone',
                'SG': 'Singapore',
                'SK': 'Slovakia',
                'SI': 'Slovenia',
                'SB': 'Solomon Islands',
                'SO': 'Somalia',
                'ZA': 'South Africa',
                'GS': 'South Georgia and the South Sandwich Islands',
                'ES': 'Spain',
                'LK': 'Sri Lanka',
                'SD': 'Sudan',
                'SR': 'Suriname',
                'SJ': 'Svalbard and Jan Mayen',
                'SZ': 'Swaziland',
                'SE': 'Sweden',
                'CH': 'Switzerland',
                'SY': 'Syrian Arab Republic',
                'TW': 'Taiwan, Province of China',
                'TJ': 'Tajikistan',
                'TZ': 'Tanzania',
                'TH': 'Thailand',
                'TL': 'Timor-Leste',
                'TG': 'Togo',
                'TK': 'Tokelau',
                'TO': 'Tonga',
                'TT': 'Trinidad and Tobago',
                'TN': 'Tunisia',
                'TR': 'Turkey',
                'TM': 'Turkmenistan',
                'TC': 'Turks and Caicos Islands',
                'TV': 'Tuvalu',
                'UG': 'Uganda',
                'UA': 'Ukraine',
                'AE': 'United Arab Emirates',
                'GB': 'United Kingdom',
                'US': 'United States',
                'UM': 'United States Minor Outlying Islands',
                'UY': 'Uruguay',
                'UZ': 'Uzbekistan',
                'VU': 'Vanuatu',
                'VE': 'Venezuela',
                'VN': 'Viet Nam',
                'VG': 'Virgin Islands, British',
                'VI': 'Virgin Islands, U.S.',
                'WF': 'Wallis and Futuna',
                'EH': 'Western Sahara',
                'YE': 'Yemen',
                'ZM': 'Zambia',
                'ZW': 'Zimbabwe'
            }
        if (!props) return
        this.state = { predicate: props.predicate }
    }
    componentWillReceiveProps (newProps) {
        if (newProps.predicate !== this.state.predicate) { this.setState({ predicate: newProps.predicate }) }
    }
    componentWillMount () {
        if (!this.props.val) this.props.selectInit(Object.keys(this.countries)[0])
    }
    render () {
        const { FormControl } = ReactBootstrap
        return (
            <FormControl componentClass="select" placeholder="countries" name={this.props.name} value={this.props.val} onChange={this.props.onChange}>
                {
                    Object.keys(this.countries).map(function (key) {
                        return <option key={key} value={key}>{this.countries[key]}</option>
                    }, this)
                }
            </FormControl>
        )
    }
}

export class DurationInput extends React.Component {
    static propTypes = {
        predicate: PropTypes.string.isRequired,
        val: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        transform: PropTypes.func.isRequired
    }
    constructor (props) {
        super(props)
        this.functions = new Functions()
        this.state = { predicate: props.predicate }
        this.state.val = (props.predicate.indexOf('between') >= 0) ? this.functions.initBetween(this, props.val, true) : {}
        this.val = { a: this.state.val.a, b: this.state.val.b }
    }
    componentWillReceiveProps (newProps) {
        if (newProps.predicate !== this.state.predicate) { this.setState({ predicate: newProps.predicate }) }
        const vals = newProps.predicate === 'between' ? this.functions.initBetween(this, newProps.val, true) : {}
        this.setState(vals)
    }

    render () {
        const MaskedInput = require('react-maskedinput')
        const mask = '11:11:11'
        if (this.props.predicate.indexOf('between') >= 0) {
            return (
                <span>
                    <MaskedInput className="form-control" value={this.state.val.a} mask={mask} id={`duration-${this.props.name}-0`} name={'0'} placeholder="Duration (hh:mm:ss)" onChange={this.functions.betweenOnChange.bind(this, this)} onBlur={this.functions.sendIt.bind(this, this)} />
                    <span>&nbsp;and&nbsp;</span>
                    <MaskedInput className="form-control" value={this.state.val.b} mask={mask} id={`duration-${this.props.name}-1`} name={'1'} placeholder="Duration (hh:mm:ss)" onChange={this.functions.betweenOnChange.bind(this, this)} onBlur={this.functions.sendIt.bind(this, this)} />
                </span>
            )
        } else {
            return (
                <MaskedInput className="form-control" name={this.props.name} value={this.props.transform('in', this.props.val)} mask={mask} placeholder="Duration (hh:mm:ss)" onBlur={this.props.onChange} />
            )
        }
    }
}

export class TimeInput extends React.Component {
    static propTypes = {
        predicate: PropTypes.string.isRequired,
        val: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        transform: PropTypes.func.isRequired
    }
    constructor (props) {
        super(props)
        this.functions = new Functions()
        this.state = { predicate: props.predicate }
        this.state.val = (props.predicate.indexOf('between') >= 0) ? this.functions.initBetween(this, props.val, true) : {}
        this.val = { a: this.state.val.a, b: this.state.val.b }
    }

    render () {
        const MaskedInput = require('react-maskedinput')
        const mask = '11:11'
        if (this.props.predicate.indexOf('between') >= 0) {
            return (
                <span>
                    <MaskedInput className="form-control" value={this.state.val.a} mask={mask} id={`time-${this.props.name}-0`} name={'0'} placeholder="Time (hh:mm)" onChange={this.functions.betweenOnChange.bind(this, this)} onBlur={this.functions.sendIt.bind(this, this)} />
                    <span>&nbsp;and&nbsp;</span>
                    <MaskedInput className="form-control" value={this.state.val.b} mask={mask} id={`time-${this.props.name}-1`} name={'1'} placeholder="Time (hh:mm)" onChange={this.functions.betweenOnChange.bind(this, this)} onBlur={this.functions.sendIt.bind(this, this)} />
                </span>
            )
        } else {
            return (
                <MaskedInput className="form-control" name={this.props.name} value={this.props.transform('in', this.props.val)} mask={mask} placeholder="Time (hh:mm)" onBlur={this.props.onChange} />
            )
        }
    }
}

export class NumberInput extends React.Component {
    static propTypes = {
        predicate: PropTypes.string.isRequired,
        val: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        style: PropTypes.instanceOf(Object).isRequired,
        onChange: PropTypes.func.isRequired,
        transform: PropTypes.func.isRequired
    }
    constructor (props) {
        super(props)
        this.functions = new Functions()
        this.state = { predicate: props.predicate }
        this.state.val = (props.predicate.indexOf('between') >= 0) ? this.functions.initBetween(this, props.val, true) : {}
        this.val = { a: this.state.val.a, b: this.state.val.b }
    }
    componentWillReceiveProps (newProps) {
        if (newProps.predicate !== this.state.predicate) { this.setState({ predicate: newProps.predicate }) }
        const vals = newProps.predicate === 'between' ? this.functions.initBetween(this, newProps.val, true) : {}
        this.setState(vals)
    }

    render () {
        const { FormControl } = ReactBootstrap
        if (this.props.predicate.indexOf('between') >= 0) {
            return (
                <span>
                    <FormControl type="text" style={this.props.style} placeholder={this.props.placeholder ? this.props.placeholder : this.props.type} value={this.state.val.a} name={'0'} onChange={function (t, f, e) { f.betweenOnChange(t, e); f.sendIt(t) }.bind(this, this, this.functions)} />
                    <span>&nbsp;and&nbsp;</span>
                    <FormControl type="text" style={this.props.style} placeholder={this.props.placeholder ? this.props.placeholder : this.props.type} value={this.state.val.b} name={'1'} onChange={function (t, f, e) { f.betweenOnChange(t, e); f.sendIt(t) }.bind(this, this, this.functions)} />
                </span>
            )
        } else {
            return (
                <FormControl type="text" style={this.props.style} placeholder={this.props.placeholder ? this.props.placeholder : this.props.type} name={this.props.name} value={this.props.transform('in', this.props.val)} onChange={this.props.onChange} />
            )
        }
    }
}
