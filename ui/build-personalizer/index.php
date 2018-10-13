/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
ProfileListing=function(_React$Component){_inherits(ProfileListing,_React$Component);
function ProfileListing(props){_classCallCheck(this,ProfileListing);return _possibleConstructorReturn(this,(ProfileListing.__proto__||Object.getPrototypeOf(ProfileListing)).call(this,
props));
}_createClass(ProfileListing,[{key:"render",value:function render()
{
var Panel=ReactBootstrap.Panel;
var Table=ReactBootstrap.Table;
return(
React.createElement("div",{className:"col-lg-5 col-xs-12"},
React.createElement(Panel,{header:"Profiles"},
React.createElement(Table,{responsive:true,striped:true},
React.createElement("thead",null,
React.createElement("tr",null,
React.createElement("th",null,"Profile ID"),
React.createElement("th",null,"Last Access"),
React.createElement("th",null,"Visits"))),


React.createElement("tbody",null,

Object.keys(this.props.profiles).map(function(key,index){
return(
React.createElement("tr",{key:index},
React.createElement("td",null,key),React.createElement("td",null,this.props.profiles[key].last),React.createElement("td",null,this.props.profiles[key].visits)));


},this))))));






}}]);return ProfileListing;}(React.Component);exports.default=ProfileListing;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Actions=function(_React$Component){_inherits(Actions,_React$Component);
function Actions(){_classCallCheck(this,Actions);return _possibleConstructorReturn(this,(Actions.__proto__||Object.getPrototypeOf(Actions)).call(this));

}_createClass(Actions,[{key:"render",value:function render()
{
return(
React.createElement("div",{className:"actions-pane rows"},
React.createElement("h1",null,"Actions")));


}}]);return Actions;}(React.Component);exports.default=Actions;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _selects=__webpack_require__(8);
var _profile_listing=__webpack_require__(0);var _profile_listing2=_interopRequireDefault(_profile_listing);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/*  GROUPS  */var

CriteriaValue=function(_React$Component){_inherits(CriteriaValue,_React$Component);
function CriteriaValue(props){_classCallCheck(this,CriteriaValue);var _this=_possibleConstructorReturn(this,(CriteriaValue.__proto__||Object.getPrototypeOf(CriteriaValue)).call(this,
props));
var state={};
$.extend(state,props);
_this.state=state;return _this;
}_createClass(CriteriaValue,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(
newProps){
var state={};
$.extend(state,newProps);
this.setState(state);
}},{key:'parse',value:function parse(
type,value){
switch(type){
case'duration':
var h=Math.floor(value/3600);
var m=Math.floor(value%3600/60);
var s=Math.floor(value%3600%60);
return(h>0?h+":"+(m<10?"0":""):"")+m+":"+(s<10?"0":"")+s;
break;}

return value;
}},{key:'width',value:function width(
type,input){
switch(type){
case'zip':return'80px';break;}

switch(input){
case'number':return'80px';break;
case'text':return'150px';break;}

}},{key:'render',value:function render()

{
var FormControl=ReactBootstrap.FormControl;
var FormGroup=ReactBootstrap.FormGroup;
var Button=ReactBootstrap.Button;
switch(this.state.type){
case'number':case'string':case'duration':
return(
React.createElement(FormControl,{type:'text',style:{width:this.width(this.state.type,this.state.input)},placeholder:this.state.value,defaultValue:this.parse(this.state.type,this.state.value),onChange:this.props.onChange}));
break;
case'zip':return(
React.createElement(FormControl,{type:'text',style:{width:this.width(this.state.type,this.state.input)},placeholder:this.state.value,defaultValue:this.parse(this.state.type,this.state.value),maxLength:5,onChange:this.props.onChange}));
break;
case'state':
return(
React.createElement(_selects.StateSelect,{state:this.state.value,onChange:this.props.onChange}));
break;
case'hour':return(
React.createElement(_selects.HourSelect,{state:this.state.value,onChange:this.props.onChange}));
break;
case'day':return(
React.createElement(_selects.DaySelect,{state:this.state.value,onChange:this.props.onChange}));
break;
case'date':return(
React.createElement(_selects.DaySelect,{state:this.state.value,onChange:this.props.onChange}));
break;
case'device-types':return(
React.createElement(_selects.DeviceTypeSelect,{state:this.state.value,onChange:this.props.onChange}));
break;
case'location':return(
React.createElement(Button,null,this.state.value));
break;
case'field':return(
React.createElement(FormControl,{type:'text',style:{width:this.width(this.state.type,this.state.input)},placeholder:this.state.value,onChange:this.props.onChange}));
break;}

}}]);return CriteriaValue;}(React.Component);var


CriteriaItem=function(_React$Component2){_inherits(CriteriaItem,_React$Component2);
function CriteriaItem(props){_classCallCheck(this,CriteriaItem);var _this2=_possibleConstructorReturn(this,(CriteriaItem.__proto__||Object.getPrototypeOf(CriteriaItem)).call(this,
props));
_this2.state=_this2.initParams(_this2.initState(props),props);
_this2.changedCriterion=null;
_this2.changedOperator=null;
_this2.changedDescriptor=null;
_this2.changedValue=null;
_this2.currentParams=null;
_this2.changeActive=_this2.changeActive.bind(_this2);
_this2.setCriterion=_this2.setCriterion.bind(_this2);
_this2.changeCriterion=_this2.changeCriterion.bind(_this2);
_this2.changeDescriptor=_this2.changeDescriptor.bind(_this2);
_this2.changeOperator=_this2.changeOperator.bind(_this2);
_this2.changeValue=_this2.changeValue.bind(_this2);
_this2.grammar_operators={
'is':{name:'is',entry:['text']},
'is-not':{name:'is not',entry:['text']},
'matches':{name:'mataches',entry:['text']},
'contains':{name:'contains',entry:['text']},
'does-not-contain':{name:'does not contain',entry:['text']},
'in':{name:'is any of',entry:['text']},
'eq':{name:'=',entry:['number']},
'neq':{name:'is not',entry:['number']},
'gt':{name:'>',entry:['number']},
'gte':{name:'>=',entry:['number']},
'lt':{name:'<',entry:['number']},
'lte':{name:'<=',entry:['number']},
'between':{name:'between',entry:['number','number']},
'is-city-state':{name:'is',entry:['string','string']},
'is-not-city-state':{name:'is not',entry:['string','string']}};

_this2.grammar_types={
'string':{operators:['is','is-not','matches','contains','does-not-contain','in'],format:'"%s"'},
'number':{operators:['eq','neq','gt','gte','lt','lte','between'],format:'%s'},
'country':{operators:['is','is-not','in'],format:'%s'},
'zip':{operators:['is','is-not','in'],format:'%s'},
'state':{operators:['is','is-not'],format:'%s'},
'city-state':{operators:['is-city-state','is-not-city-state'],format:'%s'},
'duration':{operators:['gt','gte','lt','lte','between'],format:'%s'},
'distance':{operators:['gt','lt','between'],format:'%s'},
'hour':{operators:['eq','neq','gt','gte','lt','lte','between'],format:'%s'},
'day':{operators:['is','is-not','in'],format:'%s'},
'date':{operators:['eq','neq','gt','gte','lt','lte','between'],format:'%s'},
'device-types':{operators:['is','is-not'],format:'%s'}};

_this2.grammar_descriptors={
'current-page':{title:'current page',access:{premium:true,lite:true}},
'previous-page':{title:'previous page',access:{premium:true,lite:true}},
'current-session':{title:'current session',access:{premium:true,lite:true}},
'current-session-start':{title:'current session start',access:{premium:true,lite:true}},
'previous-session':{title:'previous session',access:{premium:true,lite:false}},
'previous-session-start':{title:'previous session start',access:{premium:true,lite:true}},
'previous-session-end':{title:'previous session end',access:{premium:true,lite:true}},
'first-session':{title:'first session',access:{premium:true,lite:false}},
'first-session-start':{title:'first session start',access:{premium:true,lite:false}},
'first-session-end':{title:'first session send',access:{premium:true,lite:false}},
'any-session':{title:'any session',access:{premium:true,lite:false}}};

_this2.grammar=[
{id:"viewed-uri",access:{premium:true,lite:true},params:[{name:"Viewed URI",preposition:'of'}],descriptor:['current-page','previous-page'],type:'string'},
{id:"viewed-page-hostname",access:{premium:true,lite:true},params:[{name:'Viewed page hostname',preposition:'of'}],descriptor:['current-page','previous-page'],type:'string'},
{id:"referring-page-url",access:{premium:true,lite:true},params:[{name:'Referring page URL',preposition:'of'}],descriptor:['current-page','previous-page'],type:'string'},
{id:"entry-page-uri",access:{premium:true,lite:true},params:[{name:'Entry page URI',preposition:'of'}],descriptor:['current-session','previous-session','first-session','any-session'],type:'string'},
{id:"entry-page-hostname",access:{premium:true,lite:true},params:[{name:'Entry page hostname',preposition:'of'}],descriptor:['current-session','previous-session','first-session','any-session'],type:'string'},
{id:"entry-referring-page-url",access:{premium:true,lite:true},params:[{name:'Entry referring page URL',preposition:'of'}],descriptor:['current-session','previous-session','first-session','any-session'],type:'string'},
{id:"exit-page-uri",access:{premium:true,lite:true},params:[{name:'Exit page URI',preposition:'of'}],descriptor:['previous-session','first-session','any-session'],type:'string'},
{id:"separator"},
{id:"country",access:{premium:true,lite:true},params:[{name:'Country',preposition:'of'}],descriptor:['current-session','previous-session','any-session'],type:'country'},
{id:"zip",access:{premium:true,lite:true},params:[{name:'Zip code',preposition:'of'}],descriptor:['current-session','previous-session','any-session'],type:'zip'},
{id:"state",access:{premium:true,lite:true},params:[{name:'State',preposition:'of'}],descriptor:['current-session','previous-session','any-session'],type:'state'},
{id:"city-state",access:{premium:true,lite:true},params:[{name:'City/State',preposition:'of'}],descriptor:['current-session','previous-session','any-session'],type:'city-state'},
{id:"distance",access:{premium:true,lite:false},params:[{name:'Distance',preposition:'from'},{name:'location',preposition:'to location viewed during',entry:'location'}],descriptor:['current-session','previous-session','first-session'],type:'distance'},
{id:"separator"},
{id:"sessions-count",access:{premium:true,lite:true},params:[{name:'Sessions count',preposition:false}],descriptor:false,type:'number'},
{id:"page-view-count",access:{premium:true,lite:true},params:[{name:'Page view count',preposition:'for'}],descriptor:['current-session','previous-session','first-session'],type:'number'},
{id:"elapsed-time",access:{premium:true,lite:false},params:[{name:'Elapsed time',preposition:'since'}],descriptor:['previous-session','first-session'],type:'duration'},
{id:"duration",access:{premium:true,lite:false},params:[{name:'Duration',preposition:'of'}],descriptor:['current-session','previous-session','first-session'],type:'duration'},
{id:"separator"},
{id:"hour-of-day",access:{premium:true,lite:false},params:[{name:'Hour-of-day',preposition:'of'}],descriptor:['current-session-start','previous-session-start','previous-session-end','first-session-start','first-session-end','current-page','previous-page'],type:'hour'},
{id:"time-of-day",access:{premium:true,lite:false},params:[{name:'Time-of-day',preposition:'of'}],descriptor:['current-session-start','previous-session-start','previous-session-end','first-session-start','first-session-end','current-page','previous-page'],type:'string'},
{id:"day-of-week",access:{premium:true,lite:false},params:[{name:'Day-of-week',preposition:'of'}],descriptor:['current-session-start','previous-session-start','previous-session-end','first-session-start','first-session-end','current-page','previous-page'],type:'day'},
{id:"date",access:{premium:true,lite:false},params:[{name:'Date',preposition:'of'}],descriptor:['current-session-start','previous-session-start','previous-session-end','first-session-start','first-session-end','current-page','previous-page'],type:'date'},
{id:"separator"},
{id:"device-type",access:{premium:true,lite:true},params:[{name:'Device type',preposition:'of'}],descriptor:['current-session','previous-session','any-session'],type:'device-types'},
{id:"device-os",access:{premium:true,lite:false},params:[{name:'Device OS',preposition:'of'}],descriptor:['current-session','previous-session','any-session'],type:'string'},
{id:"device-browser",access:{premium:true,lite:false},params:[{name:'Device browser',preposition:'of'}],descriptor:['current-session','previous-session','any-session'],type:'string'},
{id:"device-version",access:{premium:true,lite:false},params:[{name:'Device version',preposition:'of'}],descriptor:['current-session','previous-session','any-session'],type:'string'},
{id:"device-platform",access:{premium:true,lite:false},params:[{name:'Device platform',preposition:'of'}],descriptor:['current-session','previous-session','any-session'],type:'string'},
{id:"separator"},
{id:"impressions",access:{premium:true,lite:false},params:[{name:'Impression count',preposition:'of'},{name:'action',preposition:''}],descriptor:false,type:'number'},
{id:"profile-attribute",access:{premium:true,lite:false},params:[{name:'Profile attribute',preposition:'of'},{name:'field',preposition:'',entry:'string'}],descriptor:false,type:'string'}];return _this2;

}_createClass(CriteriaItem,[{key:'componentDidMount',value:function componentDidMount()

{
if(this.props.criteria.editing)
this.changeEditing(true);
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(
newProps){
var state={};
if(!this.state.isEditing){
this.setState(this.initParams(state,newProps));
}
}},{key:'changeActive',value:function changeActive()

{
var index=this.props.index;
var group=this.props.group;
group.criteria[index].active=!group.criteria[index].active;
this.props.functions.updateGroup(group);
}},{key:'changeEditing',value:function changeEditing(
state){
if(state){
this.changedCriterion=this.props.criteria.params[0];
this.changedDescriptor=this.props.criteria.params[this.props.criteria.params.length-3];
this.changedOperator=this.props.criteria.params[this.props.criteria.params.length-2];
this.changedValue=this.props.criteria.params[this.props.criteria.params.length-1];
this.setCriterion(this.state.criterion);
this.setState({
isEditing:state});

}else{
this.setState({
isEditing:state,
changedCriterion:null});

this.changedCriterion=null,
this.changedDescriptor=null,
this.changedOperator=null,
this.changedValue=null;
}
}},{key:'removeCriterion',value:function removeCriterion()
{
var index=this.props.index;
var group=this.props.group;
group.criteria.splice(index,1);
this.props.functions.updateGroup(group);
}},{key:'cancelCriterion',value:function cancelCriterion(
e){
this.changeEditing(false);
if(this.props.newCriterion){
this.props.functions.resetNewCriterion();
}
}},{key:'saveCriterion',value:function saveCriterion(
e){
var index=this.props.index;
var group=this.props.group;
//this.setState({ params:this.props.criteria.params, isEditing:false });
if(this.props.newCriterion){
group.criteria.push({active:false});
}

var displayString="";
var params=[];
params.push(this.changedCriterion);
this.state.grammar.params.map(function(key,index){
displayString+=key.name;
if(key.preposition)displayString+=" "+key.preposition;
if(index>0)params.push(this.changedObject);
});
if(this.state.grammar.descriptor){
displayString+=" "+this.grammar_descriptors[this.changedDescriptor].title;
params.push(this.changedDescriptor);
}
if(this.changedOperator){
displayString+=" "+this.grammar_operators[this.changedOperator].name;
params.push(this.changedOperator);
}
displayString+=" "+this.grammar_types[this.state.grammar.type].format.replace(/%s/,this.changedValue);
params.push(this.changedValue);

/*
    console.log ({ 
      "saveCriterion": { "criterion":this.changedCriterion, "descriptor":this.changedDescriptor, "operator":this.changedOperator, "value":this.changedValue },
      "displayString": displayString,
      "params": params
    });
    */

this.changeEditing(false);
group.criteria[index].string=displayString;
group.criteria[index].params=params;
this.props.functions.updateGroup(group);
}},{key:'changeCriterion',value:function changeCriterion(
e){
var id=e.target.value;
this.changeCriterion=id;
this.setCriterion(id);
}},{key:'changeObject',value:function changeObject(
e){
var object=e.target.value;
this.changedObject=object;
}},{key:'changeOperator',value:function changeOperator(
e){
var operator=e.target.value;
this.changedOperator=operator;
}},{key:'changeDescriptor',value:function changeDescriptor(
e){
var descriptor=e.target.value;
this.changedDescriptor=descriptor;
}},{key:'changeValue',value:function changeValue(
e){
var value=e.target.value;
this.changedValue=value;
}},{key:'setCriterion',value:function setCriterion(
id){
var FormControl=ReactBootstrap.FormControl;
var Button=ReactBootstrap.Button;
var grammar=$.grep(this.grammar,function(i){return i.id===id;})[0];
var controls=[];
var value={};
if(grammar.params.length>1){
var op={name:'is',entry:['string']};
$.each(grammar.params.slice(1),function(index,value){
switch(value.entry){
case'string':
controls.push(
React.createElement(CriteriaValue,{type:'field',input:op.entry[0],value:value.name}));

break;
case'location':
controls.push(
React.createElement(CriteriaValue,{type:'location',input:op.entry[0],value:value.name}));

break;}

});
}
if(grammar.descriptor){
controls.push(
React.createElement(FormControl,{componentClass:'select',placeholder:'select',defaultValue:this.state.descriptor,onChange:this.changeDescriptor},

grammar.descriptor.map(function(key,index){
var descriptor=this.grammar_descriptors[key];
return React.createElement('option',{key:index,value:key},descriptor.title);
},this)));



}
controls.push(
React.createElement(FormControl,{componentClass:'select',placeholder:'select',defaultValue:this.state.operator,onChange:this.changeOperator},

this.grammar_types[grammar.type].operators.map(function(key,index){
return React.createElement('option',{key:index,value:key},this.grammar_operators[key].name);
},this)));



value.type=grammar.type;
this.changedCriterion=grammar.id;
this.changedDescriptor=this.changedDescriptor?this.changedDescriptor:grammar.descriptor[0];
this.changedOperator=this.changedOperator?this.changedOperator:this.grammar_types[value.type].operators[0];
this.changedObject=this.changedObject?this.changedObject:"";
this.changedValue=this.changedValue?this.changedValue:"";
this.setState({
changedCriterion:grammar.id,
criterion:id,
value:value,
grammar:grammar,
controls:{selects:controls},
preposition:grammar.params[0].preposition});

}},{key:'initParams',value:function initParams(
state,props){
state.criterion=props.criteria.params[0];
state.descriptor=props.criteria.params[1];
state.operator=props.criteria.params[props.criteria.params.length-2];
return state;
}},{key:'initState',value:function initState(
props){
var state={
isEditing:false,
params:props.criteria.params.slice(1),
changedCriterion:null,
controls:{selects:['','','']},
value:{type:'',input:'string',value:props.criteria.params[props.criteria.params.length-1]}};

return state;
}},{key:'render',value:function render()

{
var FormGroup=ReactBootstrap.FormGroup;
var FormControl=ReactBootstrap.FormControl;
var ListGroup=ReactBootstrap.ListGroup;
var ListGroupItem=ReactBootstrap.ListGroupItem;
var ControlGroup=ReactBootstrap.ControlGroup;
var ControlLabel=ReactBootstrap.ControlLabel;
var Button=ReactBootstrap.Button;
if(!this.state.isEditing){
return(
React.createElement('tr',null,
React.createElement('td',null,React.createElement('span',{className:this.props.criteria.active?'glyphicon glyphicon-check':'glyphicon glyphicon-unchecked','aria-hidden':'true',onClick:this.changeActive.bind(this)})),
React.createElement('td',{onClick:this.changeEditing.bind(this,true)},this.props.criteria.string),
React.createElement('td',{onClick:this.removeCriterion.bind(this)},React.createElement('span',{className:'glyphicon glyphicon-remove','aria-hidden':'true'}))));


}else{
return(
React.createElement('tr',null,React.createElement('td',{colSpan:3},
React.createElement(ListGroup,{style:{marginBottom:'0px'}},
React.createElement(ListGroupItem,{className:'row'},
React.createElement(FormGroup,{bsSize:'small',controlId:'formControlsSelect',className:'col-md-12'},
React.createElement(FormControl,{componentClass:'select',placeholder:'select',value:this.state.criterion,onChange:this.changeCriterion},

this.grammar.map(function(key,index){
if(key.id=='separator')
return React.createElement('option',{key:index,disabled:true},'\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
return React.createElement('option',{key:index,value:key.id},key.params[0].name);
},this)),


React.createElement('span',{className:''},' ',this.state.preposition,' '),
this.state.controls.selects[0],
this.state.controls.selects[1],
this.state.controls.selects[2],
this.state.controls.selects[3],

React.createElement(CriteriaValue,{key:'CriteriaValue',type:this.state.value.type,input:this.grammar_operators[this.state.operator].entry[0],value:this.changedValue,onChange:this.changeValue.bind(this)}),
React.createElement('span',{className:'pull-right'},
React.createElement(Button,{onClick:this.saveCriterion.bind(this)},React.createElement('span',{className:'glyphicon glyphicon-ok','aria-hidden':'true'}),' Save'),
React.createElement(Button,{onClick:this.cancelCriterion.bind(this)},React.createElement('span',{className:'glyphicon glyphicon-remove','aria-hidden':'true'}),' Cancel'))))))));






}
}}]);return CriteriaItem;}(React.Component);var


Groups=function(_React$Component3){_inherits(Groups,_React$Component3);
function Groups(props){_classCallCheck(this,Groups);var _this3=_possibleConstructorReturn(this,(Groups.__proto__||Object.getPrototypeOf(Groups)).call(this,
props));
_this3.changeGroup=_this3.changeGroup.bind(_this3);
_this3.newCriterion=_this3.newCriterion.bind(_this3);
_this3.resetNewCriterion=_this3.resetNewCriterion.bind(_this3);
_this3.deleteGroup=_this3.deleteGroup.bind(_this3);
_this3.updateGroup=_this3.updateGroup.bind(_this3);
_this3.state={groups:props.groups,group:Object.keys(props.groups)[0],showDeleteDialog:false,newCriterion:null};return _this3;
}_createClass(Groups,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

newProps){
var group=this.state.group;
if(!newProps.groups[group])
group=Object.keys(newProps.groups)[0];
this.setState({group:group,groups:newProps.groups});
}},{key:'changeGroup',value:function changeGroup(

e){
this.setState({group:e.target.value});
}},{key:'newCriterion',value:function newCriterion()

{
/*
    var groups = {};
    $.extend(groups, this.state.groups);
    groups[this.state.group].criteria.push({ editing:true, new:true, active:false, string:'New Criterion', params:['viewed-uri','current-page','is', ''] });
    this.setState({ groups: groups });
*/
var newCriterion={editing:true,active:false,string:'New Criterion',params:['viewed-uri','current-page','is','']};
this.setState({newCriterion:newCriterion});
}},{key:'resetNewCriterion',value:function resetNewCriterion()

{
this.setState({newCriterion:null});
}},{key:'deleteCriterion',value:function deleteCriterion(

item){
}},{key:'updateGroup',value:function updateGroup(

group){
var groups={};
$.extend(groups,this.state.groups);
groups[this.state.group]=group;
this.setState({groups:groups,newCriterion:null});
this.props.updateData(groups);
}},{key:'deleteGroup',value:function deleteGroup()

{
this.setState({showDeleteDialog:true});
}},{key:'deleteGroup_close',value:function deleteGroup_close(

response){
if(response){
var groups={};
$.extend(groups,this.state.groups);
delete groups[this.state.group];
//this.setState({ groups:groups, group:groups[Object.keys(groups)[0]], showDeleteDialog:false });
this.setState({showDeleteDialog:false});
this.props.updateData(groups);
}else
this.setState({showDeleteDialog:false});
}},{key:'changeGroupValue',value:function changeGroupValue(

e){
var value=e.target.value;
this.groupValue=value;
}},{key:'renameGroup',value:function renameGroup()

{
this.groupValue="";
this.setState({showRenameDialog:true});
}},{key:'renameGroup_close',value:function renameGroup_close(

response){
if(response){
var groups={};
$.extend(groups,this.state.groups);
groups[this.state.group].name=this.groupValue;
this.setState({showRenameDialog:false});
this.props.updateData(groups);
}else
this.setState({showRenameDialog:false});
}},{key:'newGroup',value:function newGroup()

{
this.groupValue="";
this.setState({showNewDialog:true});
}},{key:'newGroup_close',value:function newGroup_close(

response){
if(response){
var groups={};
$.extend(groups,this.state.groups);
var group=this.groupValue;
var gid=group.toLowerCase().replace(/[^a-z0-9]+/,"-");
groups[gid]={name:group,criteria:[]};
this.setState({showNewDialog:false,group:gid,groups:groups},function(){
this.props.updateData(groups);
});
}else
this.setState({showNewDialog:false});
}},{key:'getProfiles',value:function getProfiles()

{
if(this.state.group==Object.keys(this.props.groups)[0]){
return{
'14c33d7ca1abe195fa0720d1369e8467':{visits:10,last:'3/18, 5:55pm'},
'8d8eaeb64d9d2ac5779a8caa2f6c4f8e':{visits:4,last:'3/18, 5:54pm'},
'3ee5caedacbec4735e5ef98a289a76d8':{visits:1,last:'3/18, 5:54pm'},
'acf8f625ecd4e582fea621bc08dc7dc0':{visits:5,last:'3/18, 5:51pm'},
'192a2f7012d33eb97fa084ff395b3a77':{visits:47,last:'3/18, 5:50pm'},
'3a797f5400c250f21d4bafcab4e525db':{visits:3,last:'3/18, 5:49pm'},
'4752d0bb3ec06e395ebbd71142b32af6':{visits:1,last:'3/18, 5:46pm'},
'113ebe6600246cc920af393c52c3bce3':{visits:123,last:'3/18, 5:45pm'},
'e0e31c05cb2629834dfb1ae027ddc90f':{visits:2,last:'3/18, 5:41pm'},
'07a8160a3c9c395059b9700291963c21':{visits:1,last:'3/18, 5:41pm'}};

}
return{};
}},{key:'render',value:function render()

{
var FormGroup=ReactBootstrap.FormGroup;
var FormControl=ReactBootstrap.FormControl;
var Button=ReactBootstrap.Button;
var Table=ReactBootstrap.Table;
var ListGroup=ReactBootstrap.ListGroup;
var ListGroupItem=ReactBootstrap.ListGroupItem;
var Modal=ReactBootstrap.Modal;
var newCriterionControl=this.state.newCriterion?
React.createElement(CriteriaItem,{newCriterion:true,key:'newCriterion',index:this.state.groups[this.state.group].criteria.length,criteria:this.state.newCriterion,
functions:{deleteCriterion:this.deleteCriterion,resetNewCriterion:this.resetNewCriterion,updateGroup:this.updateGroup},group:this.state.groups[this.state.group]}):
null;
return(
React.createElement('div',{className:'groups-pane rows'},
React.createElement('h1',null,'Groups'),
React.createElement('div',{className:'col-lg-7 col-xs-12'},
React.createElement('form',{className:'form-inline'},
React.createElement(ListGroup,{style:{marginBottom:'0px'}},
React.createElement(ListGroupItem,{className:'row'},
React.createElement(Button,{style:{marginBottom:'0px'},onClick:this.newGroup.bind(this)},React.createElement('span',{className:'glyphicon glyphicon-plus'}),' New'),
React.createElement(FormGroup,{controlId:'formControlsSelect',className:'pull-right'},
React.createElement(FormControl,{componentClass:'select',placeholder:'groups',value:this.state.group,onChange:this.changeGroup},

Object.keys(this.state.groups).map(function(key,index){
return React.createElement('option',{key:index,value:key},this.state.groups[key].name);
},this)),


React.createElement(Button,{className:'pull-right',style:{marginBottom:'0px'},onClick:this.deleteGroup},React.createElement('span',{className:'glyphicon glyphicon-remove'}),' Delete'),
React.createElement(Button,{className:'pull-right',style:{marginBottom:'0px'},onClick:this.renameGroup.bind(this)},React.createElement('span',{className:'glyphicon glyphicon-retweet'}),' Rename')))),




React.createElement(Table,null,
React.createElement('thead',null,
React.createElement('tr',null,
React.createElement('th',{colSpan:3,style:{verticalAlign:'middle'}},
React.createElement('div',{className:'col-xs-11'},React.createElement('h2',null,'Criteria')),
React.createElement(FormGroup,{controlId:'formControlsSelect',className:'col-xs-1'},
React.createElement(Button,{style:{marginBottom:'0px'},onClick:this.newCriterion},React.createElement('span',{className:'glyphicon glyphicon-plus'})))))),




React.createElement('tbody',null,

// this.state.groups so it updates on newCriterion
this.state.groups[this.state.group].criteria.map(function(criteria,index){
return(
React.createElement(CriteriaItem,{key:index,index:index,criteria:criteria,
functions:{deleteCriterion:this.deleteCriterion,updateGroup:this.updateGroup},group:this.state.groups[this.state.group]}));

},this),

newCriterionControl)))),





React.createElement(_profile_listing2.default,{profiles:this.getProfiles()}),
React.createElement('div',{className:'clear'}),

React.createElement(Modal,{show:this.state.showDeleteDialog,onHide:this.deleteGroup_close.bind(this,false)},
React.createElement(Modal.Header,{closeButton:true}),

React.createElement(Modal.Body,null,
React.createElement('h4',null,'Are you sure you want to delete ',React.createElement('em',null,this.state.groups[this.state.group].name),'?')),

React.createElement(Modal.Footer,null,
React.createElement(Button,{onClick:this.deleteGroup_close.bind(this,true)},'Yes'),' ',React.createElement(Button,{onClick:this.deleteGroup_close.bind(this,false),className:'pull-right'},'No'))),



React.createElement(Modal,{show:this.state.showRenameDialog,onHide:this.renameGroup_close.bind(this,false)},
React.createElement(Modal.Header,{closeButton:true}),

React.createElement(Modal.Body,null,
React.createElement('h4',null,'Rename group ',React.createElement('em',null,this.state.groups[this.state.group].name),' to:'),
React.createElement(FormControl,{type:'text',defaultValue:this.state.groups[this.state.group].name,onChange:this.changeGroupValue.bind(this)})),

React.createElement(Modal.Footer,null,
React.createElement(Button,{onClick:this.renameGroup_close.bind(this,true)},'OK'),' ',React.createElement(Button,{onClick:this.renameGroup_close.bind(this,false),className:'pull-right'},'Cancel'))),



React.createElement(Modal,{show:this.state.showNewDialog,onHide:this.newGroup_close.bind(this,false)},
React.createElement(Modal.Header,{closeButton:true}),

React.createElement(Modal.Body,null,
React.createElement('h4',null,'New group name: '),
React.createElement(FormControl,{type:'text',onChange:this.changeGroupValue.bind(this)})),

React.createElement(Modal.Footer,null,
React.createElement(Button,{onClick:this.newGroup_close.bind(this,true)},'OK'),' ',React.createElement(Button,{onClick:this.newGroup_close.bind(this,false),className:'pull-right'},'Cancel')))));






}}]);return Groups;}(React.Component);exports.default=Groups;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
TopNav=exports.TopNav=function(_React$Component){_inherits(TopNav,_React$Component);
function TopNav(){_classCallCheck(this,TopNav);return _possibleConstructorReturn(this,(TopNav.__proto__||Object.getPrototypeOf(TopNav)).call(this));

}_createClass(TopNav,[{key:"render",value:function render()
{
return(
React.createElement("div",{className:"top_nav"},
React.createElement("div",{className:"nav_menu"},
React.createElement("nav",{className:"",role:"navigation"},
React.createElement("div",{className:"nav toggle"},
React.createElement("a",{id:"menu_toggle"},React.createElement("i",{className:"fa fa-bars"}))),


React.createElement("ul",{className:"nav navbar-nav navbar-right"},
React.createElement("li",{className:""},
React.createElement("a",{href:"#",className:"user-profile dropdown-toggle","data-toggle":"dropdown","aria-expanded":"false"},
React.createElement("img",{src:"/images/img.jpg",alt:""}),"Mike Hill",
React.createElement("span",{className:" fa fa-angle-down"})),

React.createElement("ul",{className:"dropdown-menu dropdown-usermenu pull-right"},
React.createElement("li",null,React.createElement("a",{href:"#"}," Profile")),
React.createElement("li",null,
React.createElement("a",{href:"#"},
React.createElement("span",{className:"badge bg-red pull-right"},"50%"),
React.createElement("span",null,"Settings"))),


React.createElement("li",null,React.createElement("a",{href:"#"},"Help")),
React.createElement("li",null,React.createElement("a",{href:"login.html"},React.createElement("i",{className:"fa fa-sign-out pull-right"})," Log Out")))),



React.createElement("li",{role:"presentation",className:"dropdown"},
React.createElement("a",{href:"#",className:"dropdown-toggle info-number","data-toggle":"dropdown","aria-expanded":"false"},
React.createElement("i",{className:"fa fa-envelope-o"}),
React.createElement("span",{className:"badge bg-green"},"6")),

React.createElement("ul",{id:"menu1",className:"dropdown-menu list-unstyled msg_list",role:"menu"},
React.createElement("li",null,
React.createElement("a",null,
React.createElement("span",{className:"image"},React.createElement("img",{src:"/images/img.jpg",alt:"Profile Image"})),
React.createElement("span",null,
React.createElement("span",null,"Mike Hill"),
React.createElement("span",{className:"time"},"3 mins ago")),

React.createElement("span",{className:"message"},"New update available: Now, schedule actions to suspend or engage personalization."))))))))));












}}]);return TopNav;}(React.Component);var


LeftNav=exports.LeftNav=function(_React$Component2){_inherits(LeftNav,_React$Component2);
function LeftNav(props){_classCallCheck(this,LeftNav);return _possibleConstructorReturn(this,(LeftNav.__proto__||Object.getPrototypeOf(LeftNav)).call(this,
props));
}_createClass(LeftNav,[{key:"changeTab",value:function changeTab(
tab){
this.props.changeTab(tab);
}},{key:"render",value:function render()
{
return(
React.createElement("div",{className:"col-md-3 left_col"},
React.createElement("div",{className:"left_col scroll-view"},
React.createElement("div",{className:"navbar nav_title",style:{border:0}},
React.createElement("a",{href:"/",className:"site_title"},React.createElement("span",null,React.createElement("img",{src:"/images/logo-stacked_1024.png",style:{maxWidth:200},alt:"Influent Metrics"})))),


React.createElement("div",{className:"clearfix"}),

React.createElement("div",{className:"profile"},
React.createElement("div",{className:"org_pic"}),

React.createElement("div",{className:"profile_info"},
React.createElement("h2",null,this.props.settings.organization))),



React.createElement("div",{className:"clearfix"}),

React.createElement("br",null),


React.createElement("div",{id:"sidebar-menu",className:"main_menu_side hidden-print main_menu"},
React.createElement("div",{className:"menu_section active"},
React.createElement("h3",null,"\xA0"),
React.createElement("ul",{className:"nav side-menu"},
React.createElement("li",{className:"active",onClick:this.changeTab.bind(this,'overview')},React.createElement("a",null,React.createElement("i",{className:"fa fa-bar-chart-o"})," Overview"),
React.createElement("ul",{className:"nav child_menu hidden"},
React.createElement("li",{className:"current-page"},React.createElement("a",{href:"/"},"Dashboard1")),
React.createElement("li",null,React.createElement("a",{href:"/dashboard/2"},"Dashboard2")),
React.createElement("li",null,React.createElement("a",{href:"/dashboard/3"},"Dashboard3")),
React.createElement("li",null,React.createElement("a",{href:"/dashboard/add"},React.createElement("strong",null,"Add Dashboard ",React.createElement("span",{className:"fa fa-plus"})))))),



React.createElement("li",{onClick:this.changeTab.bind(this,'groups')},React.createElement("a",null,React.createElement("i",{className:"fa fa-users"})," Groups"),
React.createElement("ul",{className:"nav child_menu hidden"},
React.createElement("li",null,React.createElement("a",{href:"form_advanced.html"},"On Site Now")),
React.createElement("li",null,React.createElement("a",{href:"form_advanced.html"},"Local Monthly")),
React.createElement("li",null,React.createElement("a",{href:"form_validation.html"},"First Timers")),
React.createElement("li",null,React.createElement("a",{href:"form_wizards.html"},"Active in Library")),
React.createElement("li",null,React.createElement("a",{href:"index.html"},React.createElement("strong",null,"Add Group ",React.createElement("span",{className:"fa fa-plus"})))))),



React.createElement("li",{onClick:this.changeTab.bind(this,'profiles')},React.createElement("a",null,React.createElement("i",{className:"fa fa-database"})," Profiles"),
React.createElement("ul",{className:"nav child_menu hidden"},
React.createElement("li",null,React.createElement("a",{href:"form_advanced.html"},"Profile Search")),
React.createElement("li",null,React.createElement("a",{href:"form_validation.html"},"Upload User Data")))),



React.createElement("li",{onClick:this.changeTab.bind(this,'actions')},React.createElement("a",null,React.createElement("i",{className:"fa fa-check-circle"})," Actions"),
React.createElement("ul",{className:"nav child_menu hidden"},
React.createElement("li",null,React.createElement("a",{href:"form_advanced.html"},"Web Personalization")),
React.createElement("li",null,React.createElement("a",{href:"form_validation.html"},"Email List")),
React.createElement("li",null,React.createElement("a",{href:"index.html"},React.createElement("strong",null,"Add Action ",React.createElement("span",{className:"fa fa-plus"})))))),



React.createElement("li",null,React.createElement("a",{className:"disabled"},React.createElement("i",{className:"fa fa-heart-o"})," Insights ",React.createElement("span",{className:"label label-success pull-right"},"Coming Soon"))),


React.createElement("li",{onClick:this.changeTab.bind(this,'settings')},React.createElement("a",null,React.createElement("i",{className:"fa fa-cog"})," Settings"))))),







React.createElement("div",{className:"sidebar-footer hidden-small",style:{display:"none"}},
React.createElement("a",{"data-toggle":"tooltip","data-placement":"top",title:"","data-original-title":"FullScreen"},
React.createElement("span",{className:"glyphicon glyphicon-fullscreen","aria-hidden":"true"})),

React.createElement("a",{"data-toggle":"tooltip","data-placement":"top",title:"","data-original-title":"Lock"},
React.createElement("span",{className:"glyphicon glyphicon-eye-close","aria-hidden":"true"})),

React.createElement("a",{"data-toggle":"tooltip","data-placement":"top",title:"","data-original-title":"Logout"},
React.createElement("span",{className:"glyphicon glyphicon-off","aria-hidden":"true"}))))));







}}]);return LeftNav;}(React.Component);
;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
Overview=function(_React$Component){_inherits(Overview,_React$Component);
function Overview(){_classCallCheck(this,Overview);return _possibleConstructorReturn(this,(Overview.__proto__||Object.getPrototypeOf(Overview)).call(this));

}_createClass(Overview,[{key:"render",value:function render()
{
return(
React.createElement("div",{className:"overview-pane rows"},
React.createElement("h1",null,"Overview"),
React.createElement("div",{className:"row tile_count"},
React.createElement("div",{className:"col-md-2 col-sm-4 col-xs-6 tile_stats_count"},
React.createElement("span",{className:"count_top"},React.createElement("i",{className:"fa fa-user"})," Total Profiles"),
React.createElement("div",{className:"count"},"14,392")),


React.createElement("div",{className:"col-md-2 col-sm-4 col-xs-6 tile_stats_count"},
React.createElement("span",{className:"count_top"},React.createElement("i",{className:"fa fa-user"})," Total Sessions"),
React.createElement("div",{className:"count"},"2,517"),
React.createElement("span",{className:"count_bottom"},React.createElement("i",{className:"green"},React.createElement("i",{className:"fa fa-sort-asc"}),"34% ")," From last week")),


React.createElement("div",{className:"col-md-2 col-sm-4 col-xs-6 tile_stats_count"},
React.createElement("span",{className:"count_top"},React.createElement("i",{className:"fa fa-clock-o"})," Average Time Per Session"),
React.createElement("div",{className:"count"},"0:03:14"),
React.createElement("span",{className:"count_bottom"},React.createElement("i",{className:"green"},React.createElement("i",{className:"fa fa-sort-asc"}),"3% ")," From last week")),


React.createElement("div",{className:"col-md-2 col-sm-4 col-xs-6 tile_stats_count"},
React.createElement("span",{className:"count_top"},React.createElement("i",{className:"fa fa-user"})," New Profiles"),
React.createElement("div",{className:"count"},"1,142"),
React.createElement("span",{className:"count_bottom"},React.createElement("i",{className:"green"},React.createElement("i",{className:"fa fa-sort-asc"}),"4% ")," From last week")),

React.createElement("div",{className:"col-md-2 col-sm-4 col-xs-6 tile_stats_count"},
React.createElement("span",{className:"count_top"},React.createElement("i",{className:"fa fa-user"})," New Matches"),
React.createElement("div",{className:"count"},"107"),
React.createElement("span",{className:"count_bottom"},React.createElement("i",{className:"red"},React.createElement("i",{className:"fa fa-sort-desc"}),"14% ")," From last week")),

React.createElement("div",{className:"col-md-2 col-sm-4 col-xs-6 tile_stats_count"},
React.createElement("span",{className:"count_top"},React.createElement("i",{className:"fa fa-user"})," Total Matches"),
React.createElement("div",{className:"count"},"7,325"),
React.createElement("span",{className:"count_bottom"},"51% of total profiles")))));




}}]);return Overview;}(React.Component);exports.default=Overview;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _profile_listing=__webpack_require__(0);var _profile_listing2=_interopRequireDefault(_profile_listing);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

Profiles=function(_React$Component){_inherits(Profiles,_React$Component);
function Profiles(){_classCallCheck(this,Profiles);return _possibleConstructorReturn(this,(Profiles.__proto__||Object.getPrototypeOf(Profiles)).call(this));

}_createClass(Profiles,[{key:"render",value:function render()
{
return(
React.createElement("div",{className:"profiles-pane rows"},
React.createElement("h1",null,"Profiles")));


}}]);return Profiles;}(React.Component);exports.default=Profiles;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Settings=function(_React$Component){_inherits(Settings,_React$Component);
function Settings(props){_classCallCheck(this,Settings);var _this=_possibleConstructorReturn(this,(Settings.__proto__||Object.getPrototypeOf(Settings)).call(this,
props));
_this.state={settings:props.settings};return _this;
}_createClass(Settings,[{key:"render",value:function render()
{
var Panel=ReactBootstrap.Panel;
return(
React.createElement("div",{className:"settings-pane rows"},
React.createElement("h1",null,"Settings"),
React.createElement(Panel,null,

React.createElement("dl",{className:"dl-horizontal"},
React.createElement("dt",null,"Organization"),


React.createElement("dd",null,
this.state.settings.organization),

React.createElement("dt",null,"Timezone"),


React.createElement("dd",null,
this.state.settings.timezone),

React.createElement("dt",null,"Sites"),


React.createElement("dd",null,

this.state.settings.sites.map(function(key,index){
return React.createElement("div",null,key);
})),


React.createElement("dt",null,"Locations"),


React.createElement("dd",null,
React.createElement("table",{className:"table table-bordered"},
React.createElement("tr",null,React.createElement("th",null,"Location ID"),React.createElement("th",null,"Name"),React.createElement("th",null,"Coordinates")),

this.state.settings.locations.map(function(key,index){
return React.createElement("tr",null,React.createElement("td",null,key.id),React.createElement("td",null,key.name),React.createElement("td",null,key.coordinates[0],", ",key.coordinates[1]));
})))))));








}}]);return Settings;}(React.Component);exports.default=Settings;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _nav=__webpack_require__(3);
var _overview=__webpack_require__(4);var _overview2=_interopRequireDefault(_overview);
var _groups=__webpack_require__(2);var _groups2=_interopRequireDefault(_groups);
var _profiles=__webpack_require__(5);var _profiles2=_interopRequireDefault(_profiles);
var _actions=__webpack_require__(1);var _actions2=_interopRequireDefault(_actions);
var _settings=__webpack_require__(6);var _settings2=_interopRequireDefault(_settings);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

MainContent=function(_React$Component){_inherits(MainContent,_React$Component);
function MainContent(props){_classCallCheck(this,MainContent);var _this=_possibleConstructorReturn(this,(MainContent.__proto__||Object.getPrototypeOf(MainContent)).call(this,
props));
_this.state={overview:[],groups:[],profiles:[],actions:[],settings:{organization:""}};
_this.updateOverview=_this.updateOverview.bind(_this);
_this.updateGroups=_this.updateGroups.bind(_this);
_this.updateProfiles=_this.updateProfiles.bind(_this);
_this.updateActions=_this.updateActions.bind(_this);
_this.updateSettings=_this.updateSettings.bind(_this);
_this.getData=_this.getData.bind(_this);
_this.putData=_this.putData.bind(_this);
_this.url="https://fu6uwdxxpl.execute-api.us-east-1.amazonaws.com/prod/Dashboard";
_this.getData();
setInterval(_this.getData,10000);return _this;
}_createClass(MainContent,[{key:'updateOverview',value:function updateOverview()

{
var newProps={};
$.extend(newProps,this.state.overview);
this.setState({overview:newProps});
this.putData({overview:newProps});
}},{key:'updateGroups',value:function updateGroups(

groups){
//var newProps = {};
//$.extend(newProps, this.state.groups);
console.log({Groups_updateGroups:groups});
this.setState({groups:groups});
this.putData({groups:groups});
}},{key:'updateProfiles',value:function updateProfiles()

{
var newProps={};
$.extend(newProps,this.state.profiles);
this.setState({profiles:newProps});
this.putData({profiles:newProps});
}},{key:'updateActions',value:function updateActions()

{
var newProps={};
$.extend(newProps,this.state.actions);
this.setState({actions:newProps});
this.putData({actions:newProps});
}},{key:'updateSettings',value:function updateSettings()

{
var newProps={};
$.extend(newProps,this.state.settings);
this.setState({settings:newProps});
this.putData({settings:newProps});
}},{key:'getData',value:function getData()

{
$.get(this.url,{a:"getConfig"},function(data){
console.log({"getData":data});
var config=data.data;
this.setState({groups:config.groups,settings:config.settings});
this.props.setSettings(config.settings);
}.bind(this),"json");
}},{key:'putData',value:function putData(

data){
console.log({"putData":data});
$.post(this.url,JSON.stringify(data),function(response){
}.bind(this),"json");
}},{key:'render',value:function render()

{
var content;
switch(this.props.nav){
case"overview":
return(
React.createElement('div',{className:'right_col',role:'main',style:{minHeight:1647}},
React.createElement('div',{className:'clear'}),
React.createElement(_overview2.default,{overview:this.state.overview,updateData:this.updateOverview})));


break;

case"groups":
return(
React.createElement('div',{className:'right_col',role:'main'},
React.createElement('div',{className:'clear'}),
React.createElement(_groups2.default,{groups:this.state.groups,updateData:this.updateGroups})));


break;

case"profiles":
return(
React.createElement('div',{className:'right_col',role:'main',style:{minHeight:1647}},
React.createElement('div',{className:'clear'}),
React.createElement(_profiles2.default,{profiles:this.state.profiles,updateData:this.updateProfiles})));


break;

case"actions":
return(
React.createElement('div',{className:'right_col',role:'main',style:{minHeight:1647}},
React.createElement('div',{className:'clear'}),
React.createElement(_actions2.default,{actions:this.state.actions,updateData:this.updateActions})));


break;

case"settings":
return(
React.createElement('div',{className:'right_col',role:'main',style:{minHeight:1647}},
React.createElement('div',{className:'clear'}),
React.createElement(_settings2.default,{settings:this.state.settings,updateData:this.updateSettings})));


break;}


return React.createElement('div',null);
}}]);return MainContent;}(React.Component);var


MainApp=function(_React$Component2){_inherits(MainApp,_React$Component2);
function MainApp(){_classCallCheck(this,MainApp);var _this2=_possibleConstructorReturn(this,(MainApp.__proto__||Object.getPrototypeOf(MainApp)).call(this));

_this2.changeTab=_this2.changeTab.bind(_this2);
_this2.state={nav:'overview',settings:{}};return _this2;
}_createClass(MainApp,[{key:'changeTab',value:function changeTab(
tab){
this.setState({nav:tab});
}},{key:'componentDidMount',value:function componentDidMount()
{
UX_init();
}},{key:'setSettings',value:function setSettings(
settings){
this.setState({settings:settings});
}},{key:'render',value:function render()
{
return(
React.createElement('div',{className:'Container'},
React.createElement(_nav.LeftNav,{changeTab:this.changeTab,nav:this.state.nav,settings:this.state.settings}),
React.createElement('div',{className:'Dashboard'},React.createElement(_nav.TopNav,null),React.createElement(MainContent,{nav:this.state.nav,setSettings:this.setSettings.bind(this)}))));


}}]);return MainApp;}(React.Component);
;


ReactDOM.render(
React.createElement(MainApp,null),
document.getElementById('content'));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var HourSelect=exports.HourSelect=function(_React$Component){_inherits(HourSelect,_React$Component);
function HourSelect(){_classCallCheck(this,HourSelect);var _this=_possibleConstructorReturn(this,(HourSelect.__proto__||Object.getPrototypeOf(HourSelect)).call(this));

_this.state={hours:
{
'0':'12 midnight',
'1':'1 am',
'2':'2 am',
'3':'3 am',
'4':'4 am',
'5':'5 am',
'6':'6 am',
'7':'7 am',
'8':'8 am',
'9':'9 am',
'10':'10 am',
'11':'11 am',
'12':'12 noon',
'13':'1 pm',
'14':'2 pm',
'15':'3 pm',
'16':'4 pm',
'17':'5 pm',
'18':'6 pm',
'19':'7 pm',
'20':'8 pm',
'21':'9 pm',
'22':'10 pm',
'23':'11 pm'}};return _this;


}_createClass(HourSelect,[{key:'render',value:function render()
{
var FormControl=ReactBootstrap.FormControl;
return(
React.createElement(FormControl,{componentClass:'select',placeholder:'hours',defaultValue:this.props.hour,onChange:this.props.onChange},

Object.keys(this.state.hours).map(function(key){
return React.createElement('option',{key:key,value:key},this.state.hours[key]);
},this)));



}}]);return HourSelect;}(React.Component);var


DaySelect=exports.DaySelect=function(_React$Component2){_inherits(DaySelect,_React$Component2);
function DaySelect(){_classCallCheck(this,DaySelect);var _this2=_possibleConstructorReturn(this,(DaySelect.__proto__||Object.getPrototypeOf(DaySelect)).call(this));

_this2.state={days:
{
'0':'Sunday',
'1':'Monday',
'2':'Tuesday',
'3':'Wednesday',
'4':'Thursday',
'5':'Friday',
'6':'Saturday'}};return _this2;


}_createClass(DaySelect,[{key:'render',value:function render()
{
var FormControl=ReactBootstrap.FormControl;
return(
React.createElement(FormControl,{componentClass:'select',placeholder:'days',defaultValue:this.props.day,onChange:this.props.onChange},

Object.keys(this.state.days).map(function(key){
return React.createElement('option',{key:key,value:key},this.state.days[key]);
},this)));



}}]);return DaySelect;}(React.Component);var


DeviceTypeSelect=exports.DeviceTypeSelect=function(_React$Component3){_inherits(DeviceTypeSelect,_React$Component3);
function DeviceTypeSelect(){_classCallCheck(this,DeviceTypeSelect);var _this3=_possibleConstructorReturn(this,(DeviceTypeSelect.__proto__||Object.getPrototypeOf(DeviceTypeSelect)).call(this));

_this3.state={devices:
{
'desktop':'desktop',
'tablet':'tablet',
'handheld':'handheld'}};return _this3;


}_createClass(DeviceTypeSelect,[{key:'render',value:function render()
{
var FormControl=ReactBootstrap.FormControl;
return(
React.createElement(FormControl,{componentClass:'select',placeholder:'device types',defaultValue:this.props.device_type,onChange:this.props.onChange},

Object.keys(this.state.devices).map(function(key){
return React.createElement('option',{key:key,value:key},this.state.devices[key]);
},this)));



}}]);return DeviceTypeSelect;}(React.Component);var


StateSelect=exports.StateSelect=function(_React$Component4){_inherits(StateSelect,_React$Component4);
function StateSelect(){_classCallCheck(this,StateSelect);var _this4=_possibleConstructorReturn(this,(StateSelect.__proto__||Object.getPrototypeOf(StateSelect)).call(this));

_this4.state={states:
{
'AL':'Alabama',
'AK':'Alaska',
'AS':'American Samoa',
'AZ':'Arizona',
'AR':'Arkansas',
'CA':'California',
'CO':'Colorado',
'CT':'Connecticut',
'DE':'Delaware',
'DC':'District Of Columbia',
'FM':'Federated States Of Micronesia',
'FL':'Florida',
'GA':'Georgia',
'GU':'Guam',
'HI':'Hawaii',
'ID':'Idaho',
'IL':'Illinois',
'IN':'Indiana',
'IA':'Iowa',
'KS':'Kansas',
'KY':'Kentucky',
'LA':'Louisiana',
'ME':'Maine',
'MH':'Marshall Islands',
'MD':'Maryland',
'MA':'Massachusetts',
'MI':'Michigan',
'MN':'Minnesota',
'MS':'Mississippi',
'MO':'Missouri',
'MT':'Montana',
'NE':'Nebraska',
'NV':'Nevada',
'NH':'New Hampshire',
'NJ':'New Jersey',
'NM':'New Mexico',
'NY':'New York',
'NC':'North Carolina',
'ND':'North Dakota',
'MP':'Northern Mariana Islands',
'OH':'Ohio',
'OK':'Oklahoma',
'OR':'Oregon',
'PW':'Palau',
'PA':'Pennsylvania',
'PR':'Puerto Rico',
'RI':'Rhode Island',
'SC':'South Carolina',
'SD':'South Dakota',
'TN':'Tennessee',
'TX':'Texas',
'UT':'Utah',
'VT':'Vermont',
'VI':'Virgin Islands',
'VA':'Virginia',
'WA':'Washington',
'WV':'West Virginia',
'WI':'Wisconsin',
'WY':'Wyoming'}};return _this4;


}_createClass(StateSelect,[{key:'render',value:function render()
{
var FormControl=ReactBootstrap.FormControl;
return(
React.createElement(FormControl,{componentClass:'select',placeholder:'states',defaultValue:this.props.state,onChange:this.props.onChange},

Object.keys(this.state.states).map(function(key){
return React.createElement('option',{key:key,value:key},this.state.states[key]);
},this)));



}}]);return StateSelect;}(React.Component);

/***/ })
/******/ ]);