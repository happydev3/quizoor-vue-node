
export default [
  {
    url: "/author",
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
          url: "/author/quizz/all",
          name: "All",
          slug: "quizz-all",
          i18n: "All",
      },
      {
          url: "/author/quizz/activated",
          name: "Activated",
          slug: "quizz-activated",
          i18n: "Activated",
      },
      {
          url: "/author/quizz/deactivated",
          name: "Deactivated",
          slug: "quizz-deactivated",
          i18n: "Deactivated",
      },
      {
          url: "/author/quizz/unchecked",
          name: "Unchecked",
          slug: "quizz-unchecked",
          i18n: "Unchecked",
      },
    ]
  },
]
