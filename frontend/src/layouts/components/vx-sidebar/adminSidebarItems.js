
export default [
    {
      url: "/admin",
      name: "Dashboard",
      slug: "dashboard",
      icon: "HomeIcon",
      i18n: "Dashboard",
    },
    {
      header: "Pages",
      i18n: "Pages",
    },
    {
      url: null,
      name: "Quizz",
      icon: "HelpCircleIcon",
      i18n: "Quizz",
      submenu: [
        {
            url: "/admin/quizz/all",
            name: "All",
            slug: "quizz-all",
            i18n: "All",
        },
        {
            url: "/admin/quizz/activated",
            name: "Activated",
            slug: "quizz-activated",
            i18n: "Activated",
        },
        {
            url: "/admin/quizz/deactivated",
            name: "Deactivated",
            slug: "quizz-deactivated",
            i18n: "Deactivated",
        },
        {
            url: "/admin/quizz/unchecked",
            name: "Unchecked",
            slug: "quizz-unchecked",
            i18n: "Unchecked",
        },
      ]
    },
    {
      url: "/admin/level",
      name: "Level",
      icon: "ListIcon",
      i18n: "Level",
    },
    {
      url: null,
      name: "Category and Courses",
      icon: "LayoutIcon",
      i18n: "Category_Courses",
      submenu: [
        {
          url: '/admin/category-courses/categories',
          name: "Categories",
          slug: "categories",
          i18n: "Categories",
        },
        {
          url: '/admin/category-courses/subjects',
          name: "Subjects",
          slug: "subjects",
          i18n: "Subjects",
        },
        {
            url: '/admin/category-courses/chapters',
            name: "Chapters",
            slug: "chapters",
            i18n: "Chapters",
        },
      ]
    },
    {
      url: "/admin/users",
      name: "Users",
      slug: "users",
      icon: "UserIcon",
      i18n: "Users",
    },
  ]
