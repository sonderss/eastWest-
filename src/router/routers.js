import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/goodsmanage',
    name: 'goodsmanage',
    meta: {
      icon: 'md-desktop',
      title: '商品管理'
    },
    component: Main,
    children: [
      {
        path: 'goodsinfo',
        name: 'goodsinfo',
        meta: {
          icon: 'md-barcode',
          title: '商品信息'
        },
        component: () => import('@/view/goodsmanage/goodsinfo/goodsinfo.vue')
      },
      {
        path: 'goodsrecom',
        name: 'goodsrecom',
        meta: {
          icon: 'md-cube',
          title: '商品类型'
        },
        component: () => import('@/view/goodsmanage/goodstype/goodstype.vue')
      },
      {
        path: 'goodssort',
        name: 'goodssort',
        meta: {
          icon: 'md-pricetags',
          title: '商品分类'
        },
        component: () => import('@/view/goodsmanage/goodssort/goodssort.vue')
      },
      {
        path: 'oilscene',
        name: 'oilscene',
        meta: {
          icon: 'md-images',
          title: '油画场景'
        },
        component: () => import('@/view/goodsmanage/oilscene/oilscene.vue')
      },
      {
        path: 'goodstype',
        name: 'goodstype',
        meta: {
          icon: 'md-done-all',
          title: '商品推荐'
        },
        component: () => import('@/view/goodsmanage/goodsrecom/goodsrecom.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/odd',
    name: 'odd',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'odd_num',
        name: 'oddNum',
        meta: {
          icon: 'logo-buffer',
          title: '订单信息'
        },
        component: () => import('@/view/odd/odd.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'userManage',
    meta: {
      icon: 'md-contacts',
      title: '用户管理'
    },
    component: Main,
    children: [
      {
        path: 'memberManage',
        name: 'memberManage',
        meta: {
          icon: 'md-person',
          title: '会员管理'
        },
        component: () => import('@/view/user/member.vue')
      },
      {
        path: 'onSiteOtice',
        name: 'onSiteOtice',
        meta: {
          icon: 'ios-notifications',
          title: '站内通知'
        },
        component: () => import('@/view/user/onSiteOtice.vue')
      },
      {
        path: 'userRank',
        name: 'userRank',
        meta: {
          icon: 'ios-ribbon',
          title: '会员等级'
        },
        component: () => import('@/view/user/userRank.vue')
      }
    ]
  },
  {
    path: '/base',
    name: 'basisSet',
    meta: {
      icon: 'md-git-network',
      title: '基础数据'
    },
    component: Main,
    children: [
      {
        path: 'unit',
        name: 'numUnit',
        meta: {
          icon: 'md-thermometer',
          title: '计量单位'
        },
        component: () => import('@/view/base/unit.vue')
      },
      {
        path: 'brand_set',
        name: 'brandSet',
        meta: {
          icon: 'ios-construct',
          title: '品牌设置'
        },
        component: () => import('@/view/base/brand_set.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  {
    path: '/parame',
    name: 'parame_set',
    meta: {
      icon: 'md-hammer',
      title: '参数设置'
    },
    component: Main,
    children: [
      {
        path: 'parame',
        name: 'sys_parame',
        meta: {
          icon: 'md-settings',
          title: 'parame'
        },
        component: () => import('@/view/parame/parame.vue')
      },
      {
        path: 'test2',
        name: 'email_set',
        meta: {
          icon: 'ios-mail',
          title: '邮件设置'
        },
        component: () => import('@/view/email1/email1.vue')
      }
    ]
  },
  {
    path: '/account',
    name: 'sys_guan',
    meta: {
      access: ['super_admin'], // 拥有数组内用户权限的用户可以看到此路由
      icon: 'ios-stats',
      title: '系统管理'
    },
    component: Main,
    children: [
      {
        path: 'account',
        name: 'zhanghao',
        meta: {
          icon: 'ios-body',
          title: '账号管理'
        },
        component: () => import('@/view/account/index.vue')
      },
      {
        path: 'role',
        name: 'role_g',
        meta: {
          icon: 'md-contacts',
          title: '角色管理'
        },
        component: () => import('@/view/role/role.vue')
      }
    ]
  },
  {
    path: '/finance',
    name: 'finance',
    meta: {
      icon: 'logo-usd',
      title: '财务'
    },
    component: Main,
    children: [
      {
        path: 'finance1',
        name: 'finance1',
        meta: {
          icon: 'md-hand',
          title: '财务操作'
        },
        component: () => import('@/view/finance/financialcz/index.vue')
      },
      {
        path: 'finance2',
        name: 'finance2',
        meta: {
          icon: 'ios-pricetags',
          title: '佣金记录'
        },
        component: () => import('@/view/finance/financialyj/index.vue')
      },
      {
        path: 'finance3',
        name: 'finance3',
        meta: {
          icon: 'ios-color-fill',
          title: '充值记录'
        },
        component: () => import('@/view/finance/financialrd/index.vue')
      },
      {
        path: 'finance4',
        name: 'finance4',
        meta: {
          icon: 'md-thermometer',
          title: '资金监控'
        },
        component: () => import('@/view/finance/financialjk/index.vue')
      }
    ]
  },
  {
    path: '/dataLine',
    name: 'dataLine',
    meta: {
      icon: 'ios-stats',
      title: '数据'
    },
    component: Main,
    children: [
      {
        path: 'deal_data',
        name: 'dealData',
        meta: {
          access: ['super_admin'],
          icon: 'md-trending-up',
          showAlways: true,
          title: '交易数据'
        },
        component: parentView,
        children: [
          {
            path: 'odd_statistics',
            name: 'oddStatistics',
            meta: {
              title: '订单统计'
            },
            component: () => import('@/view/data/dealData/odd.vue')
          },
          {
            path: 'product_statistics',
            name: 'productStatistics',
            meta: {
              title: '产品统计'
            },
            component: () => import('@/view/data/dealData/product.vue')
          }
        ]
      },
      {
        path: 'finance_data',
        name: 'financeData',
        meta: {
          icon: 'logo-yen',
          title: '财务数据'
        },
        component: parentView,
        children: [
          {
            path: 'financial_sheet',
            name: 'financialSheet',
            meta: {
              title: '财务报表'
            },
            component: () => import('@/view/data/finance/financialSheet.vue')
          },
          {
            path: 'cash_statistical',
            name: 'cashStatistical',
            meta: {
              title: '提现统计'
            },
            component: () => import('@/view/data/finance/cashStatistical.vue')
          },
          {
            path: 'recharge_statistics',
            name: 'rechargeStatistics',
            meta: {
              title: '充值统计'
            },
            component: () => import('@/view/data/finance/rechargeStatistics.vue')
          },
          {
            path: 'rebate_statistics',
            name: 'rebateStatistics',
            meta: {
              title: '返佣统计'
            },
            component: () => import('@/view/data/finance/rebateStatistics.vue')
          }
        ]
      },
      {
        path: 'member_data',
        name: 'memberData',
        meta: {
          icon: 'md-people',
          title: '会员数据'
        },
        component: parentView,
        children: [
          {
            path: 'user_statistical',
            name: 'userStatistical',
            meta: {
              title: '用户统计'
            },
            component: () => import('@/view/data/member/userStatistical.vue')
          },
          {
            path: 'member_increase',
            name: '会员增长',
            meta: {
              title: '会员增长'
            },
            component: () => import('@/view/data/member/memberIncrease.vue')
          },
          {
            path: 'member_business',
            name: '会员业务',
            meta: {
              title: '会员业务'
            },
            component: () => import('@/view/data/member/memberBusiness.vue')
          },
          {
            path: 'member_type',
            name: '会员属性',
            meta: {
              title: '会员属性'
            },
            component: () => import('@/view/data/member/memberType.vue')
          },
          {
            path: 'sales_member',
            name: '分销会员业务',
            meta: {
              title: '分销会员业务'
            },
            component: () => import('@/view/data/member/salesMember.vue')
          }
        ]
      },
      {
        path: 'top_list',
        name: 'topList',
        meta: {
          icon: 'md-podium',
          title: '排行榜'
        },
        component: parentView,
        children: [
          {
            path: 'market',
            name: '产品销售排行榜',
            meta: {
              title: '产品销售排行榜'
            },
            component: () => import('@/view/data/topList/market.vue')
          },
          {
            path: 'rebate',
            name: '返佣排行',
            meta: {
              title: '返佣排行'
            },
            component: () => import('@/view/data/topList/rebate.vue')
          },
          {
            path: 'integral',
            name: '积分排行',
            meta: {
              title: '积分排行'
            },
            component: () => import('@/view/data/topList/integral.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/chat',
    name: 'chat',
    meta: {
      icon: 'logo-octocat',
      title: '客服系统'
    },
    component: Main,
    children: [
      {
        path: 'chat1',
        name: 'chat1',
        meta: {
          icon: 'logo-octocat',
          title: '客服'
        },
        component: () => import('@/view/chat/chat.vue')
      },
      {
        path: 'chat2',
        name: 'chat2',
        meta: {
          icon: 'logo-octocat',
          title: '客服02'
        },
        component: () => import('@/view/chat/chat1.vue')
      }
    ]
  }

]
