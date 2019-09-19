import Mock from 'mockjs'
var data = Mock.mock({
    'list|10-20':[{
        'id|+1': 1,
        'name':'@cname()',
        'username': '@first()',
        'loginIn|1-10': 1, //登录次数
        'loginTime': '@datetime()',
        'ip': '27.46.128.171',
        'staic': '启用'
    }]
})

Mock.mock('http://www.baidu.com/users',data)


var data1 = Mock.mock({
    'list|5-6':[{
        'id|+0': 1,
        'name':'@cname()'
    }]
})

Mock.mock('http://www.baidu.com/usersArray',data1)