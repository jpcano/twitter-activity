var OAuth = require('oauth').OAuth;
var javascript_time_ago = require('javascript-time-ago');

// Load number pluralization functions for the locales.
// (the ones that decide if a number is gonna be
//  "zero", "one", "two", "few", "many" or "other")
// http://cldr.unicode.org/index/cldr-spec/plural-rules
// https://github.com/eemeli/make-plural.js
// http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
//
javascript_time_ago.locale(require('javascript-time-ago/locales/en'));
require('javascript-time-ago/intl-messageformat-global');
require('intl-messageformat/dist/locale-data/en');
const time_ago_english = new javascript_time_ago('en-US');

function TwitterActivity(config) {
    /*if (!(this instanceof TwitterActivity)) {
        return new TwitterActivity(config);
    }*/
    this.consumer_key = config.consumer_key;
    this.consumer_secret = config.consumer_secret;
    this.access_token = config.access_token;
    this.access_token_secret = config.access_token_secret;
    this.base_url = 'https://api.twitter.com/1.1';
    this.oauth = new OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        this.consumer_key,
        this.consumer_secret,
        '1.0',
        null,
        'HMAC-SHA1'
    );
}

TwitterActivity.prototype.getActivity = function (user, count, callback) {
    var path = `/statuses/user_timeline.json?screen_name=${user}&count=${count}&trim_user=true`;
    var url = this.base_url + path;
    this._request(url, callback);
};

TwitterActivity.prototype._request = function (url, callbacky) {
     this.oauth.get(url, this.access_token, this.access_token_secret, function (err, data, response) {
         if (!err) {
             var result = JSON.parse(data).map(function (t) {
                 return {
                     id_str: t.id_str,
                     text: t.text,
                     ago: time_ago_english.format(new Date(t.created_at))
                 }
             });
             callbacky(err, JSON.stringify(result), response);
         } else {
             callbacky(new Error(err), data, response);
         }
     });
};

module.exports = TwitterActivity