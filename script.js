var baseUrl = false;

$(document).ready(function() {
    if(baseUrl === false) window.alert("Couldn't find your locker, you might need to add a config.js (see dev.singly.com)");
});

$(function() {
    window.setTimeout(function(){$("#txt").text("When was I")}, 5000);
    document.forms[0].q.focus();
});

function query(f){
    $.getJSON(baseUrl + '/Me/search/query',{type:'place', sort:true, q:f.q.value}, function(data) {
        if(!data || !data.length) return;
        var html = '';
        for(var i in data)
        {
            var p = data[i];
            if(!p.data) continue;
            html += '<li>'+ago(p.at)+' '+p.data.from+' ('+p.data.title+')';
        }
        $("#list").append(html);
    });
    $("#list").html("<h3></b>"+f.q.value+"</b>:</h3>");
    f.q.value = '';
}

function ago(time){
    diff = (((new Date()).getTime() - time) / 1000),
    day_diff = Math.floor(diff / 86400);

  if ( isNaN(day_diff) || day_diff < 0)
    return;

  return day_diff == 0 && (
      diff < 60 && "just now" ||
      diff < 120 && "1 minute ago" ||
      diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
      diff < 7200 && "1 hour ago" ||
      diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
    day_diff == 1 && "Yesterday" ||
    day_diff < 7 && day_diff + " days ago" ||
    day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago"
    || Math.floor( day_diff / 30 ) + " months ago";
}