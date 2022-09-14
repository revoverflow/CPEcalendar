const express = require('express');
const CPE = require('./core/CPE');
const { Calendar, Event } = require('./core/iCalendar');

const config = require('./config.json');

const app = express();

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.toSimpleDate = function() {
    return this.toISOString().split('T')[0];
}


function getMondayOfCurrentWeek() {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;

    const monday = new Date(today.setDate(first));
    return monday;
}

app.get('/', (req, res) => {
    if (req.query.email && req.query.password) {
        let client = new CPE(req.query.email, req.query.password);

        client.login().then(async () => {
            let startDate = getMondayOfCurrentWeek();
            let endDate = startDate.addDays(6);

            let calendar = new Calendar();
            let planning = [];

            for (let i = 0; i < config.retrieveWeeks; i++) {
                let day = await client.getPlanning(startDate.toSimpleDate(), endDate.toSimpleDate());
                planning.push(...day);
                startDate = startDate.addDays(7);
                endDate = endDate.addDays(7);

                for(let j = 0; j < day.length; j++) {
                    if(!day[j].favori) continue;
                    let summary = Object.values(day[j].favori).filter(f => typeof f == 'string').join(', ');

                    let event = new Event(day[j].id, summary, day[j].matiere, day[j].ressource, new Date(day[j].date_debut), new Date(day[j].date_fin), false);
                    calendar.addEvent(event);
                }
            }

            res.setHeader('Content-Type', 'text/calendar');
            res.send(calendar.toString());
        }).catch((err) => {
            res.json({
                error: "Invalid credentials"
            });
        });
    } else {
        res.send('Please provide username and password');
    }
});

app.listen(config.port, () => {
    console.log('CPEcalendar is now running on port ' + config.port + '!');
});