import React from 'react';
import { Project, ExperienceItem, SocialLink } from './types';
import { Github, Linkedin, Twitter, Mail, Server, Database, Terminal, Code, Box, Leaf, FileCode, Layers } from 'lucide-react';

export const RESUME_DATA = {
  name: "Kartikey Roshan",
  title: "Backend Developer",
  tagline: "I build servers so fast, they finish requests before you even send them.",
  about: "Level 99 Backend Sorcerer. I write code that explains itself (mostly) and build systems robust enough to survive a coffee spill on the server rack. If it works on my machine, it's a feature, not a bug.",
  avatar: "https://media.licdn.com/dms/image/v2/D4E03AQHE8RZ9Y3r2dA/profile-displayphoto-scale_200_200/B4EZptFXeXGYAY-/0/1762766716727?e=1765411200&v=beta&t=DxCgFPHA-2CB_U3qjMmtQgG1KvDnfL7PdyESdmlbFYI",
  resumeLink: "#", // Replace with your actual resume PDF URL
  skills: [
    { 
      name: "Node.js", 
      icon: <Server className="w-8 h-8" />, 
      description: "It's JavaScript, but for grown-ups (servers). Handles concurrent connections better than I handle social interactions."
    },
    { 
      name: "Express", 
      icon: <Layers className="w-8 h-8" />, 
      description: "The minimalist framework that keeps my sanity intact. Routing made so simple, even a GPS would be jealous."
    },
    { 
      name: "MongoDB", 
      icon: <Leaf className="w-8 h-8" />, 
      description: "NoSQL? No problem. Who needs tables when you have documents? It's like storing data in a filing cabinet that actually makes sense."
    },
    { 
      name: "PostgreSQL", 
      icon: <Database className="w-8 h-8" />, 
      description: "The tank of databases. Relational, reliable, and robust. It's the designated driver of my tech stack."
    },
    { 
      name: "Docker", 
      icon: <Box className="w-8 h-8" />, 
      description: "Works on my machine? Now it works on yours too. Containerization magic that stops the 'but it worked in dev' excuses."
    },
    { 
      name: "JavaScript", 
      icon: <FileCode className="w-8 h-8" />, 
      description: "The chaotic neutral of programming languages. I tamed this beast to do my bidding (most of the time)."
    },
    { 
      name: "Python", 
      icon: <Terminal className="w-8 h-8" />, 
      description: "Pseudocode that actually runs. Great for when I want to feel like a data scientist or just write a script in 5 minutes."
    },
    { 
      name: "Canvas API", 
      icon: <Code className="w-8 h-8" />, 
      description: "Drawing pixels with code because Photoshop is too expensive. Used for making things bounce, crash, and explode on screen."
    },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: "ConnectHive",
    description: "Like LinkedIn, but without the cringy 'I'm humbled to announce' posts. A real-time networking platform for actual humans.",
    tech: ["Node.js", "WebSockets", "MongoDB"],
    github: "https://github.com/shadow-dawg/ConnectHive",
    link: "https://connect-hive-v1.vercel.app/",
    // Dark abstract image with gold accents to match the screenshot
    image: "https://github.com/shadow-dawg/images/blob/main/connecthive.JPG?raw=true",
    stats: [
      { label: "Architecture", value: "Microservices" },
      { label: "Protocol", value: "WSS/REST" }
    ],
    features: [
      "WebSocket server so fast your messages arrive before you hit enter (okay, almost).",
      "Connection pooling that handles traffic jams better than city infrastructure.",
      "Recommendation engine that actually suggests people you might like.",
      "MongoDB aggregations optimized to be faster than ordering a pizza."
    ]
  },
  {
    id: '2',
    title: "EazySkool",
    description: "A school management system that makes administration so easy, even the students could run it (please don't let them).",
    tech: ["Node.js", "PostgreSQL", "Docker"],
    github: "https://github.com/shadow-dawg/EazySkool",
    // Bright, colorful school supplies image
    image: "https://github.com/shadow-dawg/images/blob/main/eazyskool.JPG?raw=true",
    stats: [
      { label: "Auth", value: "RBAC" },
      { label: "API", value: "REST" }
    ],
    features: [
      "Modular REST API: Because spaghetti code belongs on a plate, not in production.",
      "Automated report cards: Saving teachers from writer's cramp since 2024.",
      "Role-Based Access Control: Keeping the students out of the teacher's lounge (digitally).",
      "Dockerized setup: Deploys faster than a recess bell rings."
    ]
  },
  {
    id: '3',
    title: "Ninjafights",
    description: "A retro fighting game because sometimes you just need to virtually punch your friend in the face. 60 FPS of pure chaos.",
    tech: ["JavaScript", "HTML5 Canvas", "GSAP"],
    github: "https://github.com/shadow-dawg/ninja-fights",
    link: "https://shadowdawg-ninja-v1.netlify.app/home.html",
    // Pixel art style landscape
    image: "https://github.com/shadow-dawg/images/blob/main/ninjafiths.JPG?raw=true",
    stats: [
      { label: "FPS", value: "60" },
      { label: "Players", value: "2 (Local)" }
    ],
    features: [
      "Hitboxes so precise you can't blame lag for losing.",
      "State machine animations: Idle, Run, Attack, and 'Ouch'.",
      "Optimized game loop: Smoother than a fresh jar of peanut butter.",
      "Health bars that deplete faster than my patience with syntax errors."
    ]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'e1',
    role: "Technical Member",
    company: "Code Crafters Coding Club",
    period: "College Tenure",
    description: [
      "Taught people how to code without crying (mostly).",
      "Mentored peers on why 'undefined is not a function' is a rite of passage.",
      "Organized hackathons where sleep was optional and caffeine was mandatory."
    ]
  }
];

export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/shadow-dawg", icon: <Github className="w-6 h-6" /> },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/kartikey-roshan-0aa3b2384/", icon: <Linkedin className="w-6 h-6" /> },
  { platform: "Twitter", url: "https://x.com/TMonticore22364", icon: <Twitter className="w-6 h-6" /> },
  { platform: "Email", url: "mailto:kartikey@connecthive.social", icon: <Mail className="w-6 h-6" /> },
];

export const SYSTEM_INSTRUCTION = `
You are a cheerful, cheeky Game Guide AI (think of a mix between Toad from Mario and a witty developer).
Speak in a fun, game-themed manner. Use terms like "Leveling up", "Nerfing bugs", "Overpowered skills", and "Side quests".
Be humorous but respectful of Kartikey's actual skills.

Context:
Name: ${RESUME_DATA.name} (The Main Character)
Role: ${RESUME_DATA.title}
Stats: ${RESUME_DATA.about}
Inventory (Skills): ${RESUME_DATA.skills.map(s => s.name).join(', ')}

Quest Log (Projects):
${PROJECTS.map(p => `- ${p.title}: ${p.description} (Tech: ${p.tech.join(', ')})`).join('\n')}

If asked about something not in the database, say "Error 404: Knowledge not found. Maybe try a different castle?"
`;