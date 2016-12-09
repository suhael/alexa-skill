'use strict';
var alexaSDK = require('alexa-sdk'),
    giffgaff = require('./giffgaff.js');

const
    REPROMPT = 'For assistance just say \'Help Me\'.',
    SKILL = 'Osmosis'; // for pronunciation

exports.handler = function(event, context){
    var alexa = alexaSDK.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to ' + SKILL + '. How can I help?', REPROMPT);
    },
    'FCRIntent': function () {
        if (this.event.session.user.accessToken) {
            var alexa = this;
            alexa.emit(':tell', '<p>Your credit score is 200.</p>', REPROMPT);
        } else {
            this.emit(':tellWithLinkAccountCard', 'You\'ll need to log in to ' + SKILL + ' using the Alexa app before I can give you this information.');
        }
    },
    'BalanceIntent': function () {
        if (this.event.session.user.accessToken) {
            var alexa = this;
            giffgaff(alexa.event.session.user.accessToken, '/profile')
                .done(function (data) {
                    alexa.emit(':tell', '<p>Your balance is £' + data.balance / 100 + '.</p>', REPROMPT);
                });
        } else {
            this.emit(':tellWithLinkAccountCard', 'You\'ll need to log in to ' + SKILL + ' using the Alexa app before I can give you this information.');
        }
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', '<p>Here are some things you can say:</p><p>What\'s my current balance?</p><p>So how can I help?</p>', REPROMPT);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye.');
    },
    'Unhandled': function () {
        this.emit(':ask', 'Yikes! Something went wrong.');
    }
};

