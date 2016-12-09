'use strict';
var alexaSDK = require('alexa-sdk'),
    giffgaff = require('./giffgaff.js');

const
    REPROMPT = 'For assistance just say \'Help Me\'.',
    SKILL = 'Osmosis';

exports.handler = function (event, context) {
    var alexa = alexaSDK.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var error = function(){
    alexa.emit(':ask', 'Oops! Something went wrong.');
};

var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to ' + SKILL + '. We\'ll get you money fit in no time', REPROMPT);
    },
    'CreditScore': function () {
        this.emit(':tell', 'I\'m sorry, but we can\'t supply your credit score directly. Please log in to your giffgaff account to view your free credit report')
    },
    'CreditScoreExists': function () {
        var alexa = this;
        giffgaff('', '/credit-file/pages/credit-report').then(function (data) {
            alexa.emit(':tell', '<p>Yes, you have a credit report with giffgaff! Please log in to see your full credit report.</p>', REPROMPT);
        }, function () {
            alexa.emit(':tell', '<p>You don\'t currently have a credit report. Sign up for your free credit report at https://www.giffgaff.com/money</p>', REPROMPT);
        });
    },
    'CreditScoreLastUpdate': function () {
        var alexa = this;
        giffgaff('', '/credit-file/pages/credit-report')
            .then(function (data) {
                alexa.emit(':tell', '<p>Your credit score was last updated at: ' + data.updatedOn + '</p>', REPROMPT);
            }, error());
    },
    'RecommendProduct': function () {
        var alexa = this;
        giffgaff('',
            '/credit-file/pages/credit-report')
            .then(function (data) {
                alexa.emit(':tell', '<p>Given your credit score, I\'d recommend ' + data.products[0].title + '.</p>', REPROMPT);
            }, error());
    },
    'ReadArticle': function () {
        var alexa = this;
        giffgaff('',
            '/credit-file/pages/credit-report')
            .then(function (data) {
                alexa.emit(':tell', '<p>Maybe some research would help. Given your credit score, maybe you should read: ' + data.articles[0].title + '.</p>', REPROMPT);
                alexa.emit(':tell', '<p>' + data.articles[0].summary + '</p>', REPROMPT);
            }, error());
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
        error();
    }
};

