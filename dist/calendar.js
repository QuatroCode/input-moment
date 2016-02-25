var cx = require('classnames');
var moment = require('moment');
var React = require('react');
var range = require('lodash/utility/range');
var chunk = require('lodash/array/chunk');
var Day = React.createClass({
    displayName: 'Day',
    render: function () {
        var i = this.props.i;
        var w = this.props.w;
        var prevMonth = (w === 0 && i > 7);
        var nextMonth = (w >= 4 && i <= 14);
        var cn = cx({
            'prev-month': prevMonth,
            'next-month': nextMonth,
            'current-day': !prevMonth && !nextMonth && (i === this.props.d)
        });
        return React.createElement("td", React.__spread({className: cn}, this.props), i);
    }
});
module.exports = React.createClass({
    displayName: 'Calendar',
    render: function () {
        var _this = this;
        var m = this.props.moment;
        var d = m.date();
        var d1 = m.clone().subtract(1, 'month').endOf('month').date();
        var d2 = m.clone().date(1).day();
        var d3 = m.clone().endOf('month').date();
        // get short names for weekdays in current locale, example:
        //   ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        var weeks = moment.weekdaysShort();
        // check if week starts with Monday
        if (moment.localeData().firstDayOfWeek() == 1) {
            // swap sunday with monday (weekday names)
            weeks.push(weeks.shift());
            if (d2 == 0)
                d2 = 7; // convert to ISO day of the week (1..7)
            var days = [].concat(range(d1 - d2 + 2, d1 + 1), range(1, d3 + 1), range(1, 42 - d3 - d2 + 2));
        }
        else {
            var days = [].concat(range(d1 - d2 + 1, d1 + 1), range(1, d3 + 1), range(1, 42 - d3 - d2 + 1));
        }
        return (React.createElement("div", {className: cx('m-calendar', this.props.className)}, React.createElement("div", {className: "toolbar"}, React.createElement("button", {type: "button", className: "prev-month", onClick: this.prevMonth}, React.createElement("i", {className: this.props.prevMonthIcon || "ion-ios-arrow-left"})), React.createElement("span", {className: "current-date"}, m.format('MMMM YYYY')), React.createElement("button", {type: "button", className: "next-month", onClick: this.nextMonth}, React.createElement("i", {className: this.props.nextMonthIcon || "ion-ios-arrow-right"}))), React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, weeks.map(function (w, i) { return React.createElement("td", {key: i}, w); }))), React.createElement("tbody", null, chunk(days, 7).map(function (row, w) { return (React.createElement("tr", {key: w}, row.map(function (i) { return (React.createElement(Day, {key: i, i: i, d: d, w: w, onClick: _this.selectDate.bind(null, i, w)})); }))); })))));
    },
    selectDate: function (i, w) {
        var prevMonth = (w === 0 && i > 7);
        var nextMonth = (w >= 4 && i <= 14);
        var m = this.props.moment;
        m.date(i);
        if (prevMonth)
            m.subtract(1, 'month');
        if (nextMonth)
            m.add(1, 'month');
        this.props.onChange(m);
    },
    prevMonth: function (e) {
        e.preventDefault();
        this.props.onChange(this.props.moment.subtract(1, 'month'));
    },
    nextMonth: function (e) {
        e.preventDefault();
        this.props.onChange(this.props.moment.add(1, 'month'));
    }
});
