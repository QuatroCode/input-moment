var cx = require('classnames');
var moment = require('moment');
var React = require('react');
var Calendar = require('./calendar');
var Time = require('./time');
module.exports = React.createClass({
    displayName: 'InputMoment',
    getInitialState: function () {
        return {
            tab: 0
        };
    },
    render: function () {
        var tab = this.state.tab;
        var m = this.props.moment;
        var className = (this.props.className != null) ? this.props.className : "";
        return (React.createElement("div", {className: "m-input-moment " + className}, React.createElement("div", {className: "options"}, React.createElement("button", {type: "button", className: cx('ion-calendar im-btn', { 'is-active': tab === 0 }), onClick: this.handleClickTab.bind(null, 0)}, "Date"), React.createElement("button", {type: "button", className: cx('ion-clock im-btn', { 'is-active': tab === 1 }), onClick: this.handleClickTab.bind(null, 1)}, "Time")), React.createElement("div", {className: "tabs"}, React.createElement(Calendar, {className: cx('tab', { 'is-active': tab === 0 }), moment: m, onChange: this.props.onChange, prevMonthIcon: this.props.prevMonthIcon, nextMonthIcon: this.props.nextMonthIcon}), React.createElement(Time, {className: cx('tab', { 'is-active': tab === 1 }), moment: m, onChange: this.props.onChange})), React.createElement("button", {type: "button", className: "im-btn btn-save ion-checkmark", onClick: this.handleSave}, "Save")));
    },
    handleClickTab: function (tab, e) {
        e.preventDefault();
        this.setState({ tab: tab });
    },
    handleSave: function (e) {
        e.preventDefault();
        if (this.props.onSave)
            this.props.onSave();
    }
});
