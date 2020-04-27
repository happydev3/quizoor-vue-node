
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
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: () => import('./views/client/Profile.vue')
                },
                {
                    path: 'track/:id',
                    name: 'track',
                    component: () => import('./views/client/Track.vue')
                },
                {
                    path: 'test/:id',
                    name: 'test',
                    component: () => import('./views/client/Test.vue')
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
                rule: 'admin'
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
                rule: 'admin'
            }
          },
          {
            path: 'level/edit/:id',
            name: 'levelEdit',
            component: () => import('./views/admin/Level/EditForm.vue'),
            meta: {
                rule: 'admin'
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
                rule: 'admin'
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
                rule: 'admin'
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
                rule: 'admin'
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
              rule: 'admin'
            }
          },
          {
              path: 'quizz/add',
              name: 'quizz-add',
              component: () => import('./views/admin/Quizz/QuizzForm.vue'),
              meta: {
                pageTitle: 'Add-quizz',
                rule: 'admin'
              }
          },
          {
              path: 'quizz/edit/:id',
              name: 'quizz-edit',
              component: () => import('./views/admin/Quizz/QuizzForm.vue'),
              meta: {
                pageTitle: 'Edit-quizz',
                rule: 'admin'
              }
          },
          {
              path: 'quizz/detail/:id',
              name: 'quizz-edit',
              component: () => import('./views/admin/Quizz/QuizDetail.vue'),
              meta: {
                pageTitle: 'Edit-quizz',
                rule: 'admin'
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
                rule: 'admin'
              }
          },
          {
              path: 'category-courses/categories/add',
              name: 'addCategories',
              component: () => import('./views/admin/Category-courses/CategoryForm'),
              meta: {
                pageTitle: 'addCategories',
                rule: 'admin'
              }
          },
          {
              path: 'category-courses/categories/edit/:id',
              name: 'editCategories',
              component: () => import('./views/admin/Category-courses/CategoryForm'),
              meta: {
                pageTitle: 'editCategories',
                rule: 'admin'
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
                rule: 'admin'
              }
          },
          {
              path: 'category-courses/subjects/add',
              name: 'addSubjects',
              component: () => import('./views/admin/Category-courses/SubjectForm'),
              meta: {
                pageTitle: 'addSubjects',
                rule: 'admin'
              }
          },
          {
              path: 'category-courses/subjects/edit/:id',
              name: 'editSubjects',
              component: () => import('./views/admin/Category-courses/SubjectForm'),
              meta: {
                pageTitle: 'editSubjects',
                rule: 'admin'
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
                rule: 'admin'
              }
          },
          {
              path: 'category-courses/chapters/add',
              name: 'addChapters',
              component: () => import('./views/admin/Category-courses/ChapterForm'),
              meta: {
                pageTitle: 'addChapters',
                rule: 'admin'
              }
          },
          {
              path: 'category-courses/chapters/edit/:id',
              name: 'editChapters',
              component: () => import('./views/admin/Category-courses/ChapterForm'),
              meta: {
                pageTitle: 'editChapters',
                rule: 'admin'
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
              rule: 'admin'
            }
          },
          {
            path: 'users/add/',
            name: 'usersAdd',
            component: () =>import('./views/admin/User/UserForm.vue'),
            meta: {
              rule: 'admin'
            }
          },
          {
            path: 'users/edit/:id',
            name: 'usersEdit',
            component: () =>import('./views/admin/User/UserForm.vue'),
            meta: {
              rule: 'admin'
            }
          },
          {
              path: 'profile',
              name: 'AdminProfile',
              component: () => import('./views/admin/Profile.vue'),
              meta: {
                rule: 'admin'
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
                rule: 'author'
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
                  rule: 'author'
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
                  rule: 'author'
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
                rule: 'author'
              }
            },
          ]
        },
    ],
})

export default router
