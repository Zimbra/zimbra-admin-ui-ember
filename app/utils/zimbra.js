import Ember from 'ember';

var auth = function(soapUrl, user, password, admin) {
  
  var payload = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">'
    + '<soap:Header>'
    + '<context xmlns="urn:zimbra">'
    + '<userAgent name="zimbra-ember"/>'
    + '<nosession/>'
    + '<format type="js"/>'
    + '</context></soap:Header>'
    + '<soap:Body>'
    + '<AuthRequest xmlns="urn:' + (admin ? 'zimbraAdmin' : 'zimbraAccount') + '" persistAuthTokenCookie="1">'
    + '<password>' + password + '</password>'
    + '<account by="name">' + user + '</account>'
    + '</AuthRequest></soap:Body></soap:Envelope>';  
  var url = soapUrl + '/soap/AuthRequest';
  
  var promise = new Ember.RSVP.Promise(function(resolve, reject) {
    Ember.$.ajax(url, {
      type: 'POST',
      dataType: 'json',
      data: payload,
    }).then(
      function(res, textStatus, jqXHR) {
        // console.debug("Authenticated", JSON.stringify(res.Body.AuthResponse));
        resolve(res.Body.AuthResponse);
      },
      function(jqXHR, textStatus, errorThrown) {
        console.debug(textStatus, errorThrown);
        // TODO reason = res?.Body?.Fault?.Reason?.Text
        reject(errorThrown);
      }
    );
  });
  return promise;
};


var generateSoapHeader = function(zimbraAuthToken, extraSoapHeaders) {
  var header = {
    context: {
      _jsns: 'urn:zimbra',
      userAgent: {
        name: 'zimbra-ember'
      }
    }
  };
  if (zimbraAuthToken) {
    header.context.authToken = zimbraAuthToken;
  }
  if (extraSoapHeaders) {
    _.assign(header.context, extraSoapHeaders);
  }
  return header;
};


var request = function(url, zimbraAuthToken, requestName, opts, extraSoapHeaders) {
  var parts = requestName.split(':');
  var requestUrn;
  if(parts.length === 2) {
    requestUrn = parts[0];
    requestName = parts[1];
  } else {
    requestUrn = 'zimbraMail';
  }
  
  var payload = {
    Header: generateSoapHeader(zimbraAuthToken, extraSoapHeaders),
    Body: {}
  };
  payload.Body[requestName] = opts || {};
  payload.Body[requestName]._jsns = 'urn:' + requestUrn;
  // console.log(JSON.stringify(payload));
  var url_ = url + '/soap/' + requestName;
  console.log('POST', url_, payload);
  
  var promise = new Ember.RSVP.Promise(function(resolve, reject) {
    Ember.$.ajax(url_, {
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(payload)
    }).then(
      function(res, textStatus, jqXHR) {
        // console.log("** ok", textStatus, res);
        var responseName = requestName.replace('Request', 'Response');
        resolve(res.Body[responseName]);
      },
      function(jqXHR, textStatus, errThrown) {
        // console.log("** err", textStatus, errThrown, jqXHR);
        reject(jqXHR.responseJSON.Body.Fault.Reason.Text);
      }
    );
  });
  return promise;
};


export default {
  auth   : auth,
  request: request
};