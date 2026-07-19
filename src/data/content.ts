// ─── All site content lives here. Edit this file to update the website. ───

export const SITE = {
  name: 'Aaryateja Addala',
  firstName: 'AARYATEJA',
  lastName: 'ADDALA',
  initials: 'AA',
  email: 'hello@aaryateja.dev',
  roles: ['ROBOTICS ENGINEER', 'AI DEVELOPER', 'FULL-STACK DEVELOPER'],
  tagline: 'Robotics & AI Engineer',
  github: 'https://github.com/AaryaTeja',
  linkedin: 'https://linkedin.com/in/aaryateja',
}

export const ABOUT_TEXT =
  "I'm Aarya — a student engineer exploring robotics, AI, and full-stack development. With hands-on experience across engineering and software, I focus on robotics, AI research, and modern web development. I love the part where hardware meets code — building autonomous machines and modern web experiences, and treating every project as a way to learn out loud."

export const EXPERTISE = [
  {
    title: 'Robotics & AI',
    subtitle: 'Building intelligent systems & autonomous machines',
    description:
      'Developing autonomous robots and intelligent machines — sensor integration, motor control, and object detection for real-world environments — alongside machine learning, data analysis, and AI applied to engineering and research challenges.',
    skills: [
      'Python',
      'C++',
      'Arduino',
      'OpenCV',
      'Machine Learning',
      'Data Analysis',
      'Sensor Integration',
      'Motor Control',
      'Object Detection',
      'Autonomous Systems',
    ],
  },
  {
    title: 'Full-Stack Web',
    subtitle: 'Modern web development & immersive experiences',
    description:
      'Creating modern, immersive web experiences with React, TypeScript, and 3D technologies through Three.js and React Three Fiber. Clean, efficient code from embedded systems to full-stack web applications.',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Three.js',
      'React Three Fiber',
      'Node.js',
      'Tailwind CSS',
      'Framer Motion',
      'Vite',
      'Git',
    ],
  },
]

export const TIMELINE = [
  {
    role: 'Learning Something New',
    org: 'Self-Development',
    year: 'NOW',
    description:
      'Continuously exploring emerging technologies across robotics, AI research, and immersive web experiences — pushing the boundaries of what hardware and software can do together.',
  },
  {
    role: 'Research Apprentice',
    org: 'MIT',
    year: '2025',
    description:
      'Independent scientific research in bioprocess modeling — statistical analysis and material yield optimization across complex biomanufacturing systems.',
  },
  {
    role: 'Robotics Engineer',
    org: 'Personal Projects',
    year: '2024',
    description:
      'Built autonomous robots and intelligent machines with sensor integration, motor control, and object detection — including a wall-detecting robot chassis car.',
  },
  {
    role: 'Web Developer',
    org: 'Freelance & Projects',
    year: '2023',
    description:
      'Crafted modern, immersive web experiences with React, TypeScript, and 3D technologies through Three.js and React Three Fiber.',
  },
]

export const PROJECTS = [
  {
    num: '01',
    name: 'Drone Nexus Web',
    category: 'Web / Personal',
    description:
      'An immersive, animated marketing site for a drone technology concept — built to explore Three.js scene composition alongside scroll-driven motion design.',
    tools: ['React', 'TypeScript', 'Three.js', 'Framer Motion'],
    href: 'https://github.com/AaryaTeja/drone-nexus-web',
  },
  {
    num: '02',
    name: 'Robot Chassis Car',
    category: 'Robotics',
    description:
      'An autonomous wall-detecting rover — ultrasonic sensing, real-time obstacle avoidance, and motor control tuned for a small chassis platform.',
    tools: ['Arduino', 'C++', 'Ultrasonic Sensors', 'Motor Control', 'Wall Detection'],
    href: 'https://github.com/AaryaTeja/Robot-Chassis-Car_Wall-Detection',
  },
  {
    num: '03',
    name: 'MIT Bioprocess Research',
    category: 'Research',
    description:
      'Independent research into bioprocess modeling — statistical analysis and material yield optimization across complex biomanufacturing systems.',
    tools: ['Python', 'Statistical Modeling', 'Data Analysis', 'Yield Optimization'],
    href: SITE.github,
  },
]

export const TECH_STACK = [
  'Python',
  'Java',
  'TypeScript',
  'JavaScript',
  'C++',
  'HTML',
  'CSS',
  'React',
  'Next.js',
  'Three.js',
  'React Three Fiber',
  'Node.js',
  'Tailwind CSS',
  'Framer Motion',
  'Vite',
  'Arduino',
  'OpenCV',
  'Git',
  'GitHub',
  'VS Code',
]

export const SOCIALS = [
  { label: 'GitHub', href: SITE.github },
  { label: 'LinkedIn', href: SITE.linkedin },
]
