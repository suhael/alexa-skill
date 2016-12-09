'use strict';
var alexaSDK = require('alexa-sdk'),
    giffgaff = require('./giffgaff.js');

const
    REPROMPT = 'For assistance just say \'Help Me\'.',
    SKILL = 'Osmosis';

exports.handler = function(event, context){
    var alexa = alexaSDK.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to ' + SKILL + '. How can I help?', REPROMPT);
    },
    'CreditScore': function () {
        // if (this.event.session.user.accessToken) {
            var alexa = this;
            giffgaff(alexa.event.session.user.accessToken, '/credit-file/pages/credit-report')
                    .done(function (data) {
                        alexa.emit(':tell', '<p>Your credit score is ' + data.updatedOn + '.</p>', REPROMPT);
                    });
        // } else {
        //     this.emit(':tellWithLogInToAccount', 'You\'ll need to log in to ' + SKILL + ' using the Alexa app before I can give you this information.');
        // }
    },
    'RecommendProduct': function () {
        this.emit(':tell', 'Hello World')
    },
    'ReadArticle': function () {
        // Find a recommended article based on credit score, read title and description to user. Tie this to 'Get me money fit'
        // /credit-file/pages/credit-report
    //    get the data.atricles[].category
    },
    'CheckForRetailLoan': function () {
        // Call gg_getLoans and indicate if user has retail loan
    //    /loans/latest
    },
    'CheckForHandsetLoan': function () {
        // Call gg_getLoans and indicate if user has handset loan
    },
    'GetLoanBalance': function () {
        // Return balance of all outstanding loans
    },
    'GetLoanPaymentSchedule': function () {
        // Return next scheduled payment across all loans
    //   loans/latest
    },
    // Standard Intents - https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/standard-intents
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', '<p>Giffgaff is here to help you get money fit. Here are some exercises you might be interested in:</p>' +
            '<p>What\'s my credit score?</p>' +
            '<p>Recommend me a product</p>',
            '<p>Get me money fit</p>',
            '<p>Do I have a retail loan?</p>',
            '<p>Do I have a handset loan?</p>',
            '<p>What is my loan balance?</p>',
            '<p>When is my next loan payment due?</p>', REPROMPT);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Kwaheri');
    },
    'Unhandled': function () {
        this.emit(':ask', 'Oops! Something went wrong.');
    }
};

