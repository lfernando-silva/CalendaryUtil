var moment = require('moment-timezone');

function getFormattedDate(data) {
    var dt = moment.tz(data, "America/Sao_Paulo").format().toString(); // 2013-11-18T11:55:00-05:00
    var fdate = {
        date: dt.slice(0, dt.indexOf('T')), //2013-11-18
        hour: dt.slice(11, 19), //11:55:00
        week: new Date().getUTCDay(), //0 a 6
        complete: dt.slice(0, 19).replace("T", " ") //2013-11-18 11:55:00
    };
    return fdate;
}

function getUTCDate(date) {
    return date.toUTCString().replace("GMT", "+0000");
}

var CalendaryUtil = {

    now: function (data) {
        return getFormattedDate(data).complete;
    },
    date: function (data) {
        return getFormattedDate(data).date;
    },
    hour: function (data) {
        return getFormattedDate(data).hour;
    },
    week: function (data) {
        return getFormattedDate(data).week;
    },
    getUTCDate: function (date) {
        return getUTCDate(date);
    },
    getInterval: function (dateStringStart, dateStringNow, unit) {
        var now = new Date(dateStringNow).getTime();
        var start = new Date(dateStringStart).getTime();

        var interval = now - start;
        if (!unit || !units[unit]) unit = 's';
        var units = {
            w: 604800000,
            d: 86400000,
            h: 3600000,
            m: 60000,
            s: 1000
        };

        var a = interval / units[unit];
        var b = Math.floor(a);
        return b;
    },
    getTomorrow: function (today) {
        var tomorrow = today;
        tomorrow.setDate(tomorrow.getDate() + 1);
        return getUTCDate(tomorrow);
    }
};

module.exports = CalendaryUtil;
