const VoiceResponse = require('twilio').twiml.VoiceResponse;
const cdrModel = require("./models/call.model");
const moment = require("moment");


exports.welcome = async function welcome(req) {
  const voiceResponse = new VoiceResponse();
  // return JSON.parse(req);
  // console.log(req.body)
  console.log(req.body);

  const { 
    Called:called, 
    Caller:caller, 
    Direction:direction,
    CallStatus:callStatus,
    Timestamp:callTime,
    CallDuration: callDuration,
    CalledCountry: calledCountry,
    CallerCountry: callerCountry
  }=req.body;

   await cdrModel.query().insert({
    called, 
    caller, 
    direction,
    callStatus,
    callTime:moment(callTime).format('YYYY-MM-DD HH:mm:ss'),
     callDuration,
    calledCountry,
    callerCountry
  });

  const gather = await voiceResponse.gather({
    action: '/ivr/menu',
    numDigits: '1',
    method: 'POST',
  });
  
  await gather.say(
    'Thanks for calling ' +
    'Please press 1 to dial other number. ' +
    'Press 2 toleave a voice message.',
    {loop: 3}
  );

  return voiceResponse.toString();
};

exports.logsData = async function logsData(req) {
let dbResponse =await cdrModel.query().select();
  return dbResponse;
};

exports.logs = function logs(req) {
  const voiceResponse = new VoiceResponse();
  // return JSON.parse(req);
  
//   const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  const accountSid = 'AC4221f0102d930762a9163f3eca83d50b';
const authToken = '8f2cf409e6d9f98cae9d83d5ffd0234c';
const client = require('twilio')(accountSid, authToken);

client.calls.list({limit: 20})
            .then(calls => calls.forEach(c => console.log(c.sid)));

  // console.log(req.body['Timestamp']);
  // const gather = voiceResponse.gather({
  //   action: '/ivr/menu',
  //   numDigits: '1',
  //   method: 'POST',
  // });
  
  // gather.say(
  //   'Thanks for calling ' +
  //   'Please press 1 to dial other number. ' +
  //   'Press 2 toleave a voice message.',
  //   {loop: 3}
  // );

  return 'asd';
};

exports.menu = function menu(digit) {
  const optionActions = {
    '1': dialAnotherNumber,
    '2': record,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : redirectWelcome();
};

/**
 * Returns Twiml
 * @return {String}
 */
function dialAnotherNumber() {
  const twiml = new VoiceResponse();
  twiml.dial('+923105942509');

  return twiml.toString();
}

/**
 * Returns a TwiML to interact with the client
 * @return {String}
 */
function record() {
  const twiml = new VoiceResponse();

twiml.record({
    timeout: 10,
    transcribe: true
});

  return twiml.toString();
}

/**
 * Returns an xml with the redirect
 * @return {String}
 */
function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say('Returning to the main menu', {
    voice: 'alice',
    language: 'en-GB',
  });

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}
