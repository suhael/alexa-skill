'use strict';
var alexaUtterances = require('alexa-utterances'),
    fs = require('fs');

var intents = [];
var utterances = [];

var generateUtterances = function (intent, template) {
    if (intents.indexOf(intent) === -1) {
        intents.push(intent);
    }
    var result = alexaUtterances(template);
    for (var i = 0; i < result.length; i++) {
        utterances.push(intent + ' ' + result[i]);
    }
};

generateUtterances('Money.CreditScore', '{give me |tell me |what is |what\'s }my credit score');
generateUtterances('Money.RecommendProduct', '{recommend me |advise me on |tell me about }a product');
generateUtterances('Money.ReadArticle', '{get |make }me money fit');
generateUtterances('Money.CheckForRetailLoan', 'Do I have a retail loan?');
generateUtterances('Money.CheckForHandsetLoan', 'Do I have a handset loan?');
generateUtterances('Money.GetLoanBalance', '{give me |tell me |what is |what\'s }my loan {balance|amount}');
generateUtterances('Money.GetLoanPaymentSchedule', '{when is |tell me when |when\'s }my next payment due');
generateUtterances('BalanceIntent', '{|account |current }balance');
generateUtterances('BalanceIntent', '{give me |tell me |what is |what\'s }my {|account |current }balance');

intents.push('AMAZON.HelpIntent');
intents.push('AMAZON.StopIntent');

for (var i = 0; i < intents.length; i++) {
    intents[i] = {intent: intents[i]};
}

fs.writeFile("intents.json", JSON.stringify({intents: intents}), function (err) {
    if (err) {
        console.log(err);
    }
});

fs.writeFile("utterances.txt", utterances.toString().replace(/,/g,'\n'), function (err) {
    if (err) {
        console.log(err);
    }
});
