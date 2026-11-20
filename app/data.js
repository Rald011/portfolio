// Edit this file. Everything on the page reads from here.

export const profile = {
  name: "Jerald James Patiag",
  shortName: "Jerald Patiag",
  role: "Information Technology student, Holy Cross of Davao College",
  availability: "Open to internships and side projects.",
  city: "Davao City",
  timezone: "Asia/Manila",
  about: [
    "I’m a second-year Information Technology student in Davao City. So far I’ve built GUI apps in Java Swing and in HTML and JavaScript, plus a Pomodoro web app for my HCI class.",
    "I like projects where I have to think about the person using them, not only the code behind them.",
  ],
  email: "you@example.com",
  links: [{ label: "GitHub", href: "https://github.com/Rald011" }],
};

// Add a project by copying one block. Leave out href if there is no link yet.
export const projects = [
  {
    title: "FocusMode",
    year: "2026",
    what: "A Pomodoro timer web app, built as my HCI 102 final project with a research paper, design documentation, and a defense.",
    stack: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/Rald011/FocusMode",
  },
  {
    title: "Focvs",
    year: "2026",
    what: "A mockup of a productivity app, designed to practice interface layout and flow.",
    stack: ["UI and UX design"],
  },
];

export const skills = [
  { group: "Languages", items: ["Java", "JavaScript", "HTML", "CSS"] },
  { group: "Tools", items: ["Git", "GitHub", "Next.js"] },
  {
    group: "Coursework",
    items: [
      "Data structures and algorithms",
      "Discrete mathematics",
      "Human-computer interaction",
      "Probability and statistics",
    ],
  },
];
