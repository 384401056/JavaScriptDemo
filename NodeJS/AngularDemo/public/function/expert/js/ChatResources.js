/**
*在线咨询-资源列表
*/
app.factory('Room', function($resource) {
    var chaturl="http://10.88.20.104:8084/acp-web-expert/";
    
    return $resource('rooms', [],{
        'create': {url: chaturl+'chat/creatromm/:roomName', method: 'POST', isArray:false,headers: {'Accept': 'application/json'}},

        'delete': {url: chaturl+'chat/delroom/:roomID', method: 'POST', isArray:false,headers: {'Accept': 'application/json'}},
        "addParticipant": {url: chaturl+'chat/adduser/:roomID', method: 'POST', isArray:false,headers: {'Accept': 'application/json'}},
        "sysinfo": {url: chaturl+'chat/sysinfo/:roomID', method: 'POST', isArray:false,headers: {'Accept': 'application/json'}},
        'removeParticipant': {url: chaturl+'chat/removeuser/:roomID', method: 'POST', isArray:false,headers: {'Accept': 'application/json'}},
        'load': {url: chaturl+'chat/findroom/:roomID', method: 'GET', isArray:false, headers:{'Accept': 'application/json'}},
        'setExpertIsOnline': {url: chaturl+'chat/setExpertIsOnline', method: 'POST', isArray:false,headers: {'Accept': 'application/json'} },
        'setExpertIsOffline': {url: chaturl+'chat/setExpertIsOffline', method: 'POST', isArray:false,headers: {'Accept': 'application/json'} },
        'list': {url: chaturl+'chat/listroom', method: 'GET', isArray:false, headers:{'Accept': 'application/json'}}
    });
});

app.factory('Message', function($resource) {
     var chaturl="http://10.88.20.104:8084/acp-web-expert/";

    return $resource('messages', [],{
        'create': {url: chaturl+'chat/postmsg/:roomID', method: 'POST', isArray:false,headers: {'Accept': 'application/json'}},
        'getmsgrecord': {url: chaturl+'chat/getmsgrecord/:roomID', method: 'POST', isArray:false,headers: {'Accept': 'application/json'}},
        'setMessageIsRead':{url: chaturl+'chat/setMessageIsRead/',method:'POST', isArray:false,headers: {'Accept': 'application/json'}},
        'load': {url: chaturl+'chat/getmsg/:roomID', method: 'GET', isArray:false, headers:{'Accept': 'application/json'}}
    });
});
