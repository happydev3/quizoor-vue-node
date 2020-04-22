
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
        //frontend
            path: '/',
            component: () => import('./layouts/client/Layout.vue'),
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('./views/client/Home.vue')
                },
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('./views/auth/Login.vue')
                },
                {
                    path: 'register',
                    name: 'register',
                    component: () => import('./views/auth/Register.vue')
                }
            ]
        },
        //admin
        {
        path: '/admin',
        component: () => import('./layouts/admin/Admin.vue'),
        children: [
          {
            path: '',
            name: 'dashboard',
            component: () => import('./views/admin/Dashboard/Dashboard.vue'),
            meta: {
                breadcrumb: [
                    { title: 'Home', url: '/admin' },
                    { title: 'dashboard', active: true},
                ],
                pageTitle: 'Dashboard',
                rule: 'editor'
            }
          },
          {
            path: 'level',
            name: 'level',
            component: () => import('./views/admin/Level/Level.vue'),
            meta: {
                breadcrumb: [
                    { title: 'Home', url: '/admin' },
                    { title: 'level', active: true},
                ],
                pageTitle: 'Level',
                rule: 'editor'
            }
          },
          {
            path: 'level/edit/:id',
            name: 'levelEdit',
            component: () => import('./views/admin/Level/EditForm.vue'),
            meta: {
                rule: 'editor'
            }
          },
          {
              path: 'quizz/all',
              name: 'quizz-all',
              component: () => import('./views/admin/Quizz/All-quizz.vue'),
              meta: {
                breadcrumb: [
                    { title: 'Home', url: '/admin' },
                    { title: 'Quizz', url: '/quizz/all' },
                    { title: 'All', active: true},
                ],
                pageTitle: 'All-quizz',
                rule: 'editor'
              }
          },
          {
              path: 'quizz/activated',
              name: 'quizz-activated',
              component: () => import('./views/admin/Quizz/Activated-quizz.vue'),
              meta: {
                breadcrumb: [
                    { title: 'Home', url: '/admin' },
                    { title: 'Quizz', url: '/quizz/all' },
                    { title: 'Activated', active: true},
                ],
                pageTitle: 'Activated-quizz',
                rule: 'editor'
              }
          },
          {
              path: 'quizz/deactivated',
              name: 'quizz-deactivated',
              component: () => import('./views/admin/Quizz/Deactivated-quizz.vue'),
              meta: {
                breadcrumb: [
                    { title: 'Home', url: '/admin' },
                    { title: 'Quizz', url: '/quizz/all' },
                    { title: 'Deactivated', active: true},
                ],
                pageTitle: 'Deactivated-quizz',
                rule: 'editor'
              }
          },
          {
            path: 'quizz/unchecked',
            name: 'quizz-unchecked',
            component: () => import('./views/admin/Quizz/Unchecked-quizz.vue'),
            meta: {
              breadcrumb: [
                  { title: 'Home', url: '/admin' },
                  { title: 'Quizz', url: '/quizz/all' },
                  { title: 'Unchecked', active: true},
              ],
              pageTitle: 'Unchecked-quizz',
              rule: 'editor'
            }
          },
          {
              path: 'category-courses/categories',
              name: 'categories',
              component: () => import('./views/admin/Category-courses/Categories'),
              meta: {
                breadcrumb: [
                    { title: 'Home', url: '/admin' },
                    { title: 'Quizz', url: '/category-courses/categories' },
                    { title: 'Categories', active: true},
                ],
                pageTitle: 'Categories',
                rule: 'editor'
              }
          },
          {
              path: 'category-courses/categories/add',
              name: 'addCategories',
              component: () => import('./views/admin/Category-courses/CategoryForm'),
              meta: {
                pageTitle: 'addCategories',
                rule: 'editor'
              }
          },
          {
              path: 'category-courses/categories/edit/:id',
              name: 'editCategories',
              component: () => import('./views/admin/Category-courses/CategoryForm'),
              meta: {
                pageTitle: 'editCategories',
                rule: 'editor'
              }
          },
          {
              path: 'category-courses/subjects',
              name: 'subjects',
              component: () => import('./views/admin/Category-courses/Subjects.vue'),
              meta: {
                breadcrumb: [
                    { title: 'Home', url: '/admin' },
                    { title: 'Quizz', url: '/category-courses/categories' },
                    { title: 'Subjects', active: true},
                ],
                pageTitle: 'Subjects',
                rule: 'editor'
              }
          },
          {
              path: 'category-courses/chapters',
              name: 'chapters',
              component: () => import('./views/admin/Category-courses/Chapters.vue'),
              meta: {
                breadcrumb: [
                    { title: 'Home', url: '/admin' },
                    { title: 'Quizz', url: '/category-courses/categories' },
                    { title: 'Chapters', active: true},
                ],
                pageTitle: 'Chapters',
                rule: 'editor'
              }
          },
          {
            path: 'users',
            name: 'users',
            component: () =>import('./views/admin/User/User.vue'),
            meta: {
              breadcrumb: [
                  { title: 'Home', url: '/admin' },
                  { title: 'Users', active: true},
              ],
              pageTitle: 'Users',
              rule: 'editor'
            }
          },
          {
            path: 'users/add/',
            name: 'usersAdd',
            component: () =>import('./views/admin/User/UserForm.vue'),
            meta: {
              rule: 'editor'
            }
          },
          {
            path: 'users/edit/:id',
            name: 'usersEdit',
            component: () =>import('./views/admin/User/UserForm.vue'),
            meta: {
              rule: 'editor'
            }
          }
        ],
        },


        {
          path: '/author',
          component: () => import('./layouts/admin/Admin.vue'),
          children: [
            {
              path: '',
              name: 'dashboard',
              component: () => import('./views/admin/Dashboard/Dashboard.vue'),
            },
            {
              path: 'quizz/all',
              name: 'quizz-all',
              component: () => import('./views/admin/Quizz/All-quizz.vue'),
              meta: {
                breadcrumb: [
                    { title: 'Home', url: '/author' },
                    { title: 'Quizz', url: '/quizz/all' },
                    { title: 'All', active: true},
                ],
                pageTitle: 'All-quizz',
                rule: 'editor'
              }
            },
            {
                path: 'quizz/activated',
                name: 'quizz-activated',
                component: () => import('./views/admin/Quizz/Activated-quizz.vue'),
                meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/author' },
                      { title: 'Quizz', url: '/quizz/all' },
                      { title: 'Activated', active: true},
                  ],
                  pageTitle: 'Activated-quizz',
                  rule: 'editor'
                }
            },
            {
                path: 'quizz/deactivated',
                name: 'quizz-deactivated',
                component: () => import('./views/admin/Quizz/Deactivated-quizz.vue'),
                meta: {
                  breadcrumb: [
                      { title: 'Home', url: '/author' },
                      { title: 'Quizz', url: '/quizz/all' },
                      { title: 'Deactivated', active: true},
                  ],
                  pageTitle: 'Deactivated-quizz',
                  rule: 'editor'
                }
            },
            {
              path: 'quizz/unchecked',
              name: 'quizz-unchecked',
              component: () => import('./views/admin/Quizz/Unchecked-quizz.vue'),
              meta: {
                breadcrumb: [
                    { title: 'Home', url: '/author' },
                    { title: 'Quizz', url: '/quizz/all' },
                    { title: 'Unchecked', active: true},
                ],
                pageTitle: 'Unchecked-quizz',
                rule: 'editor'
              }
            },
          ]
        },
    ],
})

export default router
