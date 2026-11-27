// Edit this file. Everything on the site reads from here.

export const profile = {
  name: "Jerald James Patiag",
  shortName: "Jerald Patiag",
  role: "Information Technology student in Davao City",
  availability: "Open to internships and side projects.",
  city: "Davao City",
  timezone: "Asia/Manila",
  now: [
    { label: "Studying", value: "BSIT, 2nd year, Holy Cross of Davao College" },
    { label: "Building", value: "Andam Davao, a disaster preparedness app for Davao City" },
    { label: "Based in", value: "Davao City, Philippines" },
  ],
  about: [
    "I’m a second-year Information Technology student in Davao City. I work mostly in Java, Kotlin, and JavaScript. So far that means Android apps, GUI apps in Java Swing, and web projects, including a Pomodoro app for my HCI class.",
    "I like projects where I have to think about the person using them, not only the code behind them.",
  ],
  email: "you@example.com",
  links: [{ label: "GitHub", href: "https://github.com/Rald011" }],
};

// Each project gets its own page at /projects/<slug>.
// Optional fields: year, status, context, repo, paper, about, features, design, images.
// Screenshots: put files in public/projects/<slug>/ and list them in images
// like { src: "/projects/focusmode/idle.png", alt: "Idle state", caption: "..." }.
export const projects = [
  {
    slug: "andam-davao",
    title: "Andam Davao",
    year: "2026",
    status: "In development",
    context: "Android app, forked from daku48/Andam-Davao",
    what: "A disaster preparedness and evacuation assistance app for Davao City, built for Android with Kotlin and Jetpack Compose.",
    stack: ["Kotlin", "Jetpack Compose", "Android"],
    repo: "https://github.com/Rald011/Andam-Davao",
    about: [
      "Andam Davao helps residents prepare for disasters and find evacuation centers. Its tagline is “Be Ready. Be Safe. Be Andam.”",
      "The core logic (center sorting, time handling, location, weather parsing, and JSON storage) is covered by unit tests. The app is still in development, and a pilot with local disaster management offices is planned before any public release.",
    ],
    features: [
      "An evacuation center directory and map, with Open, Full, Closed, and Unknown status.",
      "Nearest-first sorting with distance, when location permission is granted.",
      "Public announcements and alerts.",
      "Live Davao weather from Open-Meteo, which needs no API key.",
      "Emergency hotlines you can tap to dial, and preparedness guides that work offline.",
      "An offline cache that shows the last good data, with a “saved data” banner, when there is no network.",
    ],
  },
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
      "A clock and a rotating motivational quote at the top of the screen.",
      "Saves progress in the browser, so it survives a refresh, with no install or login.",
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
    slug: "connectapp",
    title: "connectapp",
    what: "An Android app with Firebase email and password sign-in, built in Java and Kotlin.",
    stack: ["Java", "Kotlin", "Firebase", "Android"],
    repo: "https://github.com/Rald011/connectapp",
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
    what: "A small Next.js practice project: a student card component with React state, styled with Tailwind CSS.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    repo: "https://github.com/Rald011/student-card-app",
  },
  {
    slug: "logo-making",
    title: "Logo-making",
    what: "A C++ program that prints a diamond logo inside a box in the console.",
    stack: ["C++"],
    repo: "https://github.com/Rald011/Logo-making",
  },
];

export const skills = [
  { group: "Languages", items: ["Java", "Kotlin", "JavaScript", "C++", "HTML", "CSS"] },
  { group: "Tools", items: ["Git", "GitHub", "Next.js", "React", "Tailwind CSS", "Firebase"] },
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
