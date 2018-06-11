import FrameSet from '@/views/frameset.vue';
export const MainRouter = [{
    path: '/',
    name: 'operation',
    redirect: '/content',
    icon: 'social-hackernews',
    meta: {
      title: '运营管理'
    },
    component: FrameSet,
    children: [{
        path: '/content',
        name: 'content',
        meta: {
          show: true,
          title: '内容管理'
        },
        component: () =>
          import ('@/views/content/list')
      },
      {
        path: '/comtent-add',
        name: 'contentAdd',
        meta: {
          show: false,
          title: '内容新增'
        },
        component: () =>
          import ('@/views/content/add')
      }
    ]
  },
  {
    path: '/system',
    icon: 'person',
    name: 'system',
    meta: {
      title: '系统管理'
    },
    component: FrameSet,
    children: [{
        path: '/user',
        name: 'user',
        meta: {
          show: true,
          title: '角色管理'
        },
        component: () =>
          import ('@/views/user/list')
      },
      {
        path: '/user-add',
        name: 'userAdd',
        meta: {
          show: false,
          title: '角色新增'
        },
        component: () =>
          import ('@/views/user/add')
      }
    ]
  }
]

