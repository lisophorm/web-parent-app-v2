console.log('within CONFIG.JS');
define("config", [], function () {
    console.log('within define config');
    var environmentName = 'dev',
        baseUrl,
        mixPanelToken;
    switch (environmentName) {
        case "dev":
            mixPanelToken = '3f827a9347132195e8d3e74987e67eef';
            baseUrl = 'http://api.elb.ci.azoomee.ninja/api';
            break;
        case "prod":
            mixPanelToken = '7e94d58938714fa180917f0f3c7de4c9';
            baseUrl = 'https://api.azoomee.com/api';
            break;
        default:
            mixPanelToken = '3f827a9347132195e8d3e74987e67eef';
            baseUrl = "http://api.elb." + environmentName + ".azoomee.ninja/api";
            break;
    }
    return {
        'baseUrl': baseUrl,
        'authPage': '#/login/',
        'permissionPage': '#/login/403',
        'defaultHomePage': '#/home/',
        'userUrl': baseUrl + '/user',
        'statsUrl': baseUrl + '/stats',
        'authUrl': baseUrl + '/auth',
        'sharingUrl': baseUrl + '/share',
        'portHoleUrl': baseUrl + '/porthole',
        'cloudFrontSessionRefreshUrl': baseUrl + '/cookie/refresh/adult',
        'defaultAvatar': 'https://media.azoomee.ninja/static/assets/default_avatar.png',
        'tokenLoginEndpoint': baseUrl + '/auth/transferSession/token',
        'billingUrl': baseUrl + '/billing',
        'privacyPolicyUrl': 'http://azoomee.com/index.php/privacy-policy-2/',
        'payment': {
            addCardUrl: baseUrl + "/billing/card"
        },
        'mixPanelToken': mixPanelToken,
        'apples': 43200000
    };
});


