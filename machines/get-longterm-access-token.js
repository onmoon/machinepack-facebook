module.exports = {

  identity: 'get-longterm-access-token',
  friendlyName: 'Get longterm access token',
  description: 'Swap a short term access token for a long term one.',
  cacheable: false,

  inputs: {
    appId: {
      example: '215798311808508',
      description: 'Your Facebook app id',
      required: true
    },
    appSecret: {
      example: 'dsg4901g0123456',
      description: 'Your Facebook app secret',
      required: true
    },
    shortToken: {
      example: 'g29hgasdg9a4u2h9en4Wejga$$2g00dhgj1olfndsga93103592t9hadignadva291',
      description: 'The token obtained from the get-access-token machine.'
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    error: {},
    success: {
      description: 'The long term access token which allows you to do things and get information on behalf of a particular Facebook user. Should expire no earlier than 60 days.',
      example: 'aw9391th139sdvna$g00sdK!13gd'
    }
  },

  fn: function (inputs, exits) {

    var doJSONRequest = require('../lib/do-request');

    // hit GET projects/ and send the api token as a header
    doJSONRequest({
      method: 'get',
      url: '/oauth/access_token',
      data: {
        'grant_type': 'fb_exchange_token',
        'client_id':inputs.appId,
        'client_secret':inputs.appSecret,
        'fb_exchange_token':inputs.shortToken,
      },
      headers: {},
    }, function (err, responseBody) {
      if (err) { return exits.error(err); }
      return exits.success(responseBody);
    });

  }
};