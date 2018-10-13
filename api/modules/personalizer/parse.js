function inGroup(a,data) {
  var getTime = () => Math.floor((new Date()).getTime()/1000);

  var functions = {};
  functions.match = (a,b) => ((a).match(new RegExp(b)) != null);
  functions.between = (a) => { var b=a.split('..'); x=+b[0]; y=+b[1]; return (x<y?(s>=x && s<y):(s>=x || s<=y)) };
  functions.getelapsed = (t) => data.profile.timestamp-t;
  functions.random = (n) => Math.floor(Math.random() * (n[1] - n[0] + 1)) + n[0];
  functions.distance = (p) => {
    var lat = p[0], lon = p[1];
    var profile = data.profile;
    if (! ("geo_lat" in profile && "geo_lon" in profile)) { return null; }
    var pLat = profile.geo_lat;
    var pLon = profile.geo_lon;
    if (! (pLat && pLon))
      return null;
    var toRad = Math.PI/180;
    var toMiles = 0.621371;
    var R = 6371;   // Radius of the earth in km
    var dLat = (pLat-lat) * toRad;
    var dLon = (pLon-lon) * toRad; 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos((lat)*toRad) * Math.cos((pLat)*toRad) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c * toMiles;  // Distance in miles
    return d;
  };
  functions.dayofweek = function(t) { return (new Date(1000*(t?t:getTime()))).getDay(); };
  functions.dateofmonth = function(t) { return (new Date(1000*(t?t:getTime()))).getDate(); };
  functions.hourofday = function(t) { return (new Date(1000*(t?t:getTime()))).getHours(); };
  functions.timeofday = function(t) { var d=(new Date(1000*(t?t:getTime()))); return d.getHours()*60*60+d.getMinutes()*60; };
  functions.lastview = function(m) { return ((m in data.lastView) ? data.lastView[m] : ""); }; 
  for (var i=0, ilen=a.length; i<ilen; i++) {
    var s=a[i][0];
    if (s instanceof Array) {
      a[i][0] = inGroup([a[i][0]],data);
    } else if (typeof s == 'string' && typeof functions[s.toLowerCase()] == 'function') {
      return (functions[s.toLowerCase()])(a[i][1]);
    } else if (typeof s == 'string') {
      if (s in data.profile) { a[i][0] = data.profile[s]; }
    }
    s=a[i][0];
    var p=a[i][1], oo=a[i][2];
    if (! (oo instanceof Array)) {
      oo = [oo];
    }
    
    var r=false;
    var compliment=false;
    for (var j=0, jlen=oo.length; (j<jlen&&  !r  ); j++) {
      var o = oo[j];
      var s_num = parseFloat(s);
      switch(p) {
        case '=':case '==':case 'is':case 'equals':case 'eq':
          r=(s==o); break;
        case '!=':case 'is not':case 'is-not':
          compliment=true; r=(s==o); break;
        case '<':case 'lt': r=((typeof s==='number' && s<o) || (!isNaN(s_num) && s_num<o)); break;
        case '>':case 'gt': r=((typeof s==='number' && s>o) || (!isNaN(s_num) && s_num>o)); break;
        case '<=':case 'lte': r=((typeof s==='number' && s<=o) || (!isNaN(s_num) && s_num<=o)); break;
        case '>=':case 'gte': r=((typeof s==='number' && s>=o) || (!isNaN(s_num) && s_num>=o)); break;
        case 'match': r=functions.match(s,o); break;
        case 'does not match':case 'does-not-match': compliment=true; r=functions.match(s,o); break;
        case 'contains': r=functions.match(s,'.*'+o+'.*'); break;
        case 'does not contain':case 'does-not-contain': compliment=true; r=functions.match(s,'.*'+o+'.*'); break;
        case 'is between':case 'between': r=functions.between(o); break;
        case 'is not between':case 'is-not-between':case 'not between': compliment=true; r=functions.between(o); break;
        //case 'is between':case 'between': r=(s>=oo[0] && s<=oo[1]); break;
        //case 'is not between':case 'not between': r=(!(s>=oo[0] && s<=oo[1])); break;
        default: if (typeof functions[p.toLowerCase()]=='function') r=(functions[p.toLowerCase()])(s,o); else r=false; break;
      }
    }
    if (r == compliment) return [false,'cond '+(i+1)+' failed'];
  }
  return [true];
};

module.exports = { inGroup };
