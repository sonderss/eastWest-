import Mock from 'mockjs'
var data = Mock.mock({
    'list|10-20':[{
        'id':'@word(10,15)',
        'title':'@csentence(3,6)',
        'name':'@cname()',
        'desc':'@csentence()'
    }]
})

Mock.mock('http://www.baidu.com/emil',data)


// var data1 = Mock.mock({
//     'list|3':[{
//         'roleName':'@pick(["默认角色","系统管理员","网站业务","运营测试"])',
//         'desc':'@csentence()'
//     }]
// })

// Mock.mock('http://www.baidu.com/role',data1)