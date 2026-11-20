// Edit this file. Everything on the site reads from here.

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

// Each project gets its own page at /projects/<slug>.
// Optional fields: year, context, repo, paper, about, features, design, images.
// Screenshots: put files in public/projects/<slug>/ and list them in images
// like { src: "/projects/focusmode/idle.png", alt: "Idle state", caption: "..." }.
export const projects = [
  {
    slug: "focusmode",
    title: "FocusMode",
    year: "2026",
    context: "Group project for HCI 101, May 2026",
    what: "A single-screen Pomodoro dashboard for students, built with HTML, CSS, and JavaScript.",
    stack: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/Rald011/FocusMode",
    paper: "/papers/FocusMode_HCI101.pdf",
    about: [
      "Students often struggle to concentrate with constant phone alerts and cluttered productivity tools. FocusMode keeps a timer, a task list, and background sound on one screen, so there is no switching between apps.",
      "It was a group project for Human and Computer Interaction 101 at Holy Cross of Davao College, completed in May 2026 by a team of five. The paper covers the problem, objectives, proposed solution, and interface designs.",
    ],
    features: [
      "A focus timer with three stages: focus (25 minutes by default), short break (5), and long break (15). The lengths can be adjusted, and the timer moves from one stage to the next on its own.",
      "A task checklist beside the timer, so study goals are logged without leaving the screen.",
      "Four background sounds (lo-fi, rain, white noise, and fire crackle) generated in the browser with the Web Audio API, so there are no audio files to download.",
      "Daily stats for sessions, tasks, and minutes, plus a streak indicator.",
      "Runs in the browser with no install or login, and the layout adjusts from phones to desktops.",
    ],
    design: [
      "Everything lives on one screen. No dropdowns or sidebars compete for attention.",
      "Only a few controls (reset, start or pause, skip), kept large and within easy reach, following Fitts’ Law.",
      "Few choices at each step, following Hick’s Law, to make starting a session easier.",
      "Immediate feedback for every action, based on Norman’s action and feedback model.",
      "Flat, low-key colors and plain buttons, guided by cognitive load theory and Nielsen’s usability heuristics.",
    ],
  },
  {
    slug: "focvs",
    title: "Focvs",
    year: "2026",
    what: "A mockup of a productivity app, designed to practice interface layout and flow.",
    stack: ["UI and UX design"],
  },
  {
    slug: "student-card-app",
    title: "student-card-app",
    what: "A student card app built in JavaScript.",
    stack: ["JavaScript"],
    repo: "https://github.com/Rald011/student-card-app",
  },
  {
    slug: "connectapp",
    title: "connectapp",
    what: "An app built in Java.",
    stack: ["Java"],
    repo: "https://github.com/Rald011/connectapp",
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
