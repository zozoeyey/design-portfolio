// ---------------------------------------------------------------------------
// Site content — extracted from the original Framer project + CMS.
// Edit here to update copy, projects, links, etc. Images/videos live in
// /public (media pulled from Framer is in /public/media).
// ---------------------------------------------------------------------------

export const site = {
  name: "Zoey Yan",
  logo: "./",
  email: "zoeyyan91@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1B-GXIFrXU3iO_hCzd-kxhiZTk75YgN7d/view?usp=sharing",
  socials: {
    instagram: "https://www.instagram.com/_yzw_zoey/",
    linkedin: "https://www.linkedin.com/in/ziwenzoey-yan/",
  },
  copyright: "Zoey Yan 2026",
};

export const nav = [
  { label: "About Me", href: "/about" },
  { label: "My Work", href: "/#mywork" },
  { label: "Playground", href: "/playground" },
  { label: "Resume", href: site.resumeUrl, external: true },
];

export const hero = {
  greeting: "Hi, I’m Zoey!",
  tagline: "I connect dots others don’t see.",
};

export const approach = [
  {
    n: "01",
    title: "From Figma to live. Solo.",
    desc: "I don't hand off designs. I ship them.",
    link: { label: "More About Me", href: "/about" },
    // Drop your two screenshots into /public/approach/ with these names.
    images: ["/approach/01-a.jpg", "/approach/01-b.jpg"],
  },
  {
    n: "02",
    title: "Think in Prototypes.",
    desc: "I think with my hands. The faster I can make it real, the faster we learn.",
    link: { label: "More About Me", href: "/about" },
    images: ["/approach/02-canvas-b.png"],
  },
  {
    n: "03",
    title: "Design How People Learn",
    desc: "I design for how people think, not just how they click.",
    link: { label: "More About Me", href: "/about" },
    images: ["/approach/03-a.jpg"], // LDT Expo
  },
];

// About page intro — photo layered over a halftone echo of itself.
export const aboutIntro = {
  portrait: "/about/photo.png", // transparent-bg PNG works best
  greeting: "Nice to meet you!",
  paragraphs: [
    "I'm Zoey, a product designer who connects dots others don't see. I've been the founding designer at an AI startup, the design lead at a nonprofit, and the person who ships her own Figma files to production — I like owning a problem end to end.",
    "My work tends to live where things are messy: a 0→1 AI agent with no product direction yet, a fintech app whose charts ran off the screen, an eligibility tool losing half its users. I audit, prototype fast, and build the systems that let the whole team move quicker.",
    "Outside of work you'll find me on a bouldering wall, behind a film camera, in front of a canvas, or on a mountain. All of it is the same habit: read the situation, trust the process, embrace the imperfect result.",
  ],
};

export const collaborate = [
  { label: "Explorer", title: "Every domain. Full speed.", desc: "I don't specialize in one domain. I specialize in learning new ones." },
  { label: "Orchestrator", title: "Order without Authority", desc: "I make the team move faster without anyone noticing I'm doing it." },
  { label: "Bridger", title: "Conflict in. Clarity out.", desc: "I speak engineer, business, and user - and I translate between all three." },
];

export const testimonials = [
  {
    name: "Haoyang Pang",
    role: "CEO @ Canmarket.ai",
    avatar: "/testimonials/haoyang.jpg",
    quote:
      "Zoey is the kind of product leader every early-stage startup needs. She's strategic in ambiguity and hands-on in execution. She transformed our scattered ideas into a coherent product that delivered real results.",
  },
  {
    name: "Madeleine Villaneuva",
    role: "Interim Director of Higher Education @ Immigrants Rising",
    avatar: "/testimonials/madeleine.jpg",
    quote:
      "Zoey delivered thoughtful, user-centered design grounded in both research and real stakeholder needs. Her work reflects a strong balance of analytical rigor and creative problem-solving.",
  },
];

// About page — hobbies. `layout` controls image position relative to the text card.
export const hobbies = [
  {
    name: "Oil Painting",
    layout: "text-left",
    images: ["/media/gUTCQgUrV6DPsHuwHl5SMKWiE.png"],
    body: "I stumbled into oil painting almost by accident, but it quickly became one of my most treasured hobbies. I love the physicality of mixing colors, feeling the brush against canvas, building layers over time. Painting has taught me patience and given me a space where time slows down. Standing in front of my finished pieces, however imperfect, I feel genuine pride and growth.",
  },
  {
    name: "Bouldering",
    layout: "text-left",
    images: [
      "/media/t9G5sy0VnokiWw8R0CpsI8MgsE.jpg",
      "/media/d9Ux46i8Hr2GzyvpRw52AEZWCCo.jpg",
    ],
    body: "I got into bouldering because I wanted something that challenged both body and mind. Every route is a puzzle, and you can't just power through it. You have to read the wall, plan your sequence, execute with precision. Mid-climb, everything else falls away and I'm completely focused on the next hold. I've failed countless times, but that's why I keep coming back. Each attempt teaches me about technique, pushing past fear, and trusting my strength.",
  },
  {
    name: "Film Photography",
    layout: "text-right",
    images: ["/media/33BYcWBYBZLfd1RIIob3VpMpSn0.jpg"],
    body: "For me, photography is about capturing life's fleeting, extraordinary moments. Unlike digital's precision, I'm captivated by film's uncertainty. Waiting for negatives to develop is like opening a mystery box—each reveal a surprise that traveled through time, reminding me to slow down and feel the weight of light and shadow. I love that I don't know exactly what I captured until days later. It keeps the experience alive and teaches me to trust the process and embrace imperfection.",
  },
  {
    name: "Skiing",
    layout: "text-left",
    images: ["/media/nM3XBAk5ZrotanzMfiSoTBtzwE.png"],
    body: "At the mountain's top, surrounded by pristine snow and endless peaks, I feel both tiny and completely alive. I love the rush of carving down slopes, wind in my face, spray of snow. It's exhilarating and slightly terrifying in the best way—a perfect combination of adrenaline, natural beauty, and pure joy of movement.",
  },
];

// Travel photo strip on the About page
export const travelPhotos = [
  { src: "/media/TXzWDHIvM8XNn9Bsau8lWFzJLyE.jpg", caption: "@ Paris" },
  { src: "/media/XeH8VQhjSzEqX1dHm1kA48Ikz3E.jpg", caption: "@ Berlin" },
  { src: "/media/rqCbyAtviMBnn9yJ3lqVhOtxg.jpg", caption: "@ Copenhagen" },
];

// ---------------------------------------------------------------------------
// Work — full case studies
// ---------------------------------------------------------------------------

export type Feature = {
  title: string;
  desc?: string | null;
  video?: string | null;
  image?: string | null;
  /** Optional multi-image gallery shown below the text (banner layout). */
  images?: string[];
  /** Full-bleed band background behind this feature (banner layout only). */
  band?: "dark" | null;
};
export type Story = { subheading: string; body: string; image?: string | null; tags?: string[]; graphic?: "observation-map" | "mindset-shift" | "before-after" | "requests-overlap" | "onboarding-wipe" | null };

export type Project = {
  slug: string;
  name: string;
  tag: string;
  summary: string;
  claim: string; // outcome-first one-liner shown on the work card
  year: string;
  color: string; // accent color
  liveUrl?: string | null;
  headerImage?: string | null;
  /** Poster for the work card when it differs from headerImage (e.g. first frame of mainVideo). */
  cardImage?: string | null;
  /** Playground pieces with an internal case study: hidden from the home "My Work" grid. */
  playgroundOnly?: boolean;
  /** Heading for the features section (default "Solution"). */
  featuresHeading?: string;
  /** Optional "Problem / Outcome" pair shown in the case-study header. */
  problem?: string | null;
  outcome?: string | null;
  mainVideo?: string | null;
  /** Coded card animation shown instead of mainVideo on the work card. */
  cardMotion?: "canmarket" | "screener";
  role: string;
  duration: string;
  tools: string;
  team: string;
  overview: string; // html
  features: Feature[];
  memorable?: { title: string; body: string }; // body = html
  storyHeading: string;
  stories: Story[];
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "valueglance",
    name: "ValueGlance",
    tag: "Fintech SaaS",
    summary:
      "A B2C fintech tool that helps individual investors identify quality stocks for long-term investing.",
    claim: "A B2C fintech tool that helps individual investors identify quality stocks for long-term investing.",
    year: "2026",
    color: "rgb(44, 131, 127)",
    liveUrl: "https://valueglance.com/",
    headerImage: "/media/valueglance-header.webp",
    mainVideo: "/media/valueglance/card.mp4",
    cardImage: "/media/valueglance/card-poster.jpg",
    role: "UX Designer",
    duration: "Oct 2025 - Present",
    tools: "Linear, Figma, Notion, Claude Code",
    team: "1 CTO (PM), 1 Design Lead, 2 UX Designer, 4 Engineers",
    problem:
      "How might we present dense financial data clearly on mobile, when charts, tooltips, and info boxes routinely ran off-screen?",
    outcome:
      "A structured design-system foundation for data visualization that two other designers adopted to drive a product-wide visual revamp.",
    overview:
      "<p>At the time I came on board, ValueGlance had no coherent mobile experience, and data visualizations were so cluttered that info boxes routinely ran off-screen. Collaborating alongside the CTO and a frontend engineer, I ran a product audit paired with user feedback synthesis to surface the core tension: investors needed dense financial data on a small screen, but the product had no shared component foundation to make that possible. By the end of the project, what began as a fragmented collection of off-screen charts and broken tooltips became a structured design system foundation, two other designers adopted directly to drive a product-wide visual revamp.</p>",
    features: [
      {
        title: "Feature #1: Designing a new mobile watchlist data visualization tooltip experience",
        desc: "Watchlist tooltips routinely ran off-screen on mobile. I redesigned the interaction so dense financial data stays readable — and tappable — on a small screen.",
        video: "/media/t4wUnIveqy01Kg9APLetPug7AE.mp4",
      },
      {
        title: "Feature #2: Revamping data visualization chart components",
        desc: "I rebuilt the chart components on a shared foundation, standardizing tags, tooltips, and scrolling bars so every chart renders consistently across the product.",
        video: "/media/iGL6q5kOpeqTG45TWIQSa4tc.mp4",
      },
    ],
    memorable: {
      title: "I don't measure my work by what ships. I measure it by what sticks.",
      body:
        "<p>The most impactful design decisions aren't always the ones that add new features. Often, they are the ones that <strong>simplify the system so the entire team can move faster</strong> without breaking things.</p><p>During this project, I was tasked with redesigning complex mobile data visualizations for individual investors. Instead of just fixing the layouts, I focused on building a scalable architecture, standardizing core components like Tags, Tooltips, and Scrolling Bars. While this work felt granular, its impact was immediate: <strong>other designers began pulling these components into their own workflows</strong> to solve entirely different problems. By prioritizing the \"logic\" over the \"pixel,\" I didn't just deliver a set of screens; I created a multiplier that reduced team friction and eliminated redundant design cycles.</p><p>What I learned from this experience is that the true measure of a design's value isn't just its visual polish, but its ability to <strong>lower the cost of execution for the whole team</strong>. My goal is no longer just to ship a product, but to build the sustainable foundation that makes the next ten versions possible.</p>",
    },
    storyHeading: "Designing for Visual Clarity in a Complex Cross-Platform Investment Tool",
    stories: [
      {
        subheading: "Question first. Validate always.",
        tags: ["Problem Identification", "Affinity Mapping", "Opportunity Mapping", "Brainstorm"],
        body:
          "<p>When this project started, no one handed me a problem statement, I was expected to find my own entry point. I audited the existing product independently, flagged what felt broken in the mobile data visualization experience, then cross-referenced my observations against the user feedback survey already sitting on the team's website. What I found stopped me: the issues users were reporting, info boxes cut off the screen, a button blocking key data — matched exactly what I had flagged on my own. That moment clarified something I now treat as a working rule: your instinct is worth trusting, but only after you've made it earn its place.</p>",
        graphic: "observation-map",
      },
      {
        subheading: "Less assumption. More iteration.",
        tags: ["Iterations", "Pushback", "Cross-functional Collaboration"],
        body:
          "<p>As discovery progressed into design, I made a call I later had to undo. I started building cross-platform components from the desktop layout first, it felt like the natural starting point, then brought those designs to mobile, where I quickly realized the desktop structure simply had no room to breathe on a smaller screen. I had to rebuild significant parts from scratch with a mobile-first approach, which cost real time. The rework was frustrating, but it sharpened something I hadn't fully internalized: the starting point of a design decision is not neutral, it quietly sets the constraints everything else has to work within.</p>",
        graphic: "before-after",
      },
      {
        subheading: "I don't measure launches. I measure leverage.",
        tags: ["Design System", "Design Handoff & Documentation", "Handoff Meeting", "UX Metrics"],
        body:
          "<p>Once the direction became clear, I delivered a set of design system components, tags, tooltips, a scrolling bar, and immediately questioned whether any of it counted as a real outcome, since nothing had shipped as a full page. I completed detailed annotations and stayed through reviews so engineers and other designers could actually use what I'd built. What happened next surprised me: other designers started pulling my components into their own work, reusing them across pages without rebuilding anything. That's when I replaced an old metric with a better one: a design system's value isn't in its launch — it's in how much rework it quietly removes from every decision after.</p>",
        graphic: "mindset-shift",
      },
    ],
    tags: [
      "Problem Identification", "Affinity Mapping", "Opportunity Mapping", "Brainstorm",
      "Iterations", "Pushback", "Cross-functional Collaboration", "Design System",
      "Design Handoff & Documentation", "Handoff Meeting", "UX Metrics",
    ],
  },
  // Case-study content to be filled in; the work card is live (ScreenerCardMotion).
  {
    slug: "valueglance-screener",
    name: "ValueGlance Stock Screener",
    tag: "Fintech SaaS",
    summary: "Screener filter redesign — case study in progress.",
    claim: "Screener filter redesign — case study in progress.",
    year: "2026",
    color: "rgb(67, 79, 160)",
    headerImage: null,
    mainVideo: null,
    cardMotion: "screener",
    role: "",
    duration: "",
    tools: "",
    team: "",
    overview: "",
    features: [],
    storyHeading: "",
    stories: [],
    tags: [],
  },
  {
    slug: "canmarketai",
    name: "Canmarket.ai",
    tag: "AI Agent",
    summary:
      "A B2B AI-powered marketing platform that automates end-to-end campaign management for SMBs.",
    claim: "Led a 0→1 AI marketing agent from idea to $200k seed and 20+ paying users.",
    year: "2025",
    color: "rgb(21, 93, 252)",
    liveUrl: "https://canlah.ai/",
    headerImage: "/media/dNbNIiljAfxGz8cuplGeSZVUs.png",
    mainVideo: "/media/BxGLNi8Iw5kls0gZ4FAeaPiPJjw.mp4",
    cardMotion: "canmarket",
    role: "Founding Designer/CPO",
    duration: "June 2025 - Feb 2026",
    tools: "Figma, V0, Claude, Figma MCP",
    team: "1 CEO, 1 CTO, Me, and 2 Engineers",
    overview:
      "<p>Taking on Canmarket as CPO, I led a 0 to 1 AI marketing agent on Chrome: a web app built for resource-limited SMB marketing teams who had no affordable path to running professional-grade campaigns. Alongside a CTO and engineering team, I shaped the product direction through user interviews and competitive analysis, surfacing the core gap: SMBs needed end-to-end campaign automation, but every existing tool was either too expensive or too narrow in scope. By the end of the project, what started as a loosely defined idea became a focused onboarding-to-campaign workflow, enabling the team to raise $200k in seed funding and acquire 20+ paying users across three markets.</p>",
    features: [
      { title: "Feature #1: Onboarding Experience", video: "/media/zx73D9l4IsZyHitMvZZHkhTOcs.mp4" },
      { title: "Feature #2: Campaign Generation Workflow", video: "/media/YQ93hSvVIr4OcYes8o7KmqEpY.mp4" },
    ],
    memorable: {
      title: "Before I learn the answers, I learn what to ask",
      body:
        "<p>What stayed with me wasn't just shipping the MVP, it was the moment I realized that as a designer, my value doesn't come from having all the answers, but from <strong>being the person who isn't afraid to ask why</strong>.</p><p>When I first joined this AI marketing project, I felt like an outsider. I was sitting in rooms where everyone was talking about SEO strategies and UGC content loops, and I honestly didn't know what half the acronyms meant. There was this huge pressure to \"catch up\" and act like an expert, but I decided to do the opposite. I started asking the most basic, fundamental questions about how our customers actually made money and where their manual work was failing them. By <strong>treating my own lack of domain knowledge as a tool for simplification</strong>, I was able to help the team strip away the jargon and focus on the core logic that eventually defined our product's strategy.</p><p>I used to think that being a senior designer meant being the smartest person in the room about the industry. Now, I realize it's about being the most curious. If I can ask the right questions to uncover the basic logic of a business, I can design a solution for it, even if I've never worked in that field before. <strong>Clear thinking will always beat domain expertise</strong> when it comes to solving a new problem.</p>",
    },
    storyHeading: "From Zero to Campaign: Designing an End-to-End AI Marketing Tool for Small Businesses",
    stories: [
      {
        subheading: "Not every need is a direction.",
        tags: ["Stakeholder Interviews", "Affinity Mapping", "Problem Identification", "Persona"],
        body:
          "<p>As discovery progressed, our three early paying clients each wanted something different, brand sentiment monitoring, UGC-driven content, and sales-driven content generation. I had no marketing background and didn't know what SEO or UGC even meant, but instead of trying to master the domain, I kept asking one question: which of these needs shares the same root problem? That focus helped us avoid building a product that tried to do everything and ended up doing nothing well, we held our scope and shipped a coherent MVP. What I learned is that designers don't need to become domain experts; they need to ask sharper questions than the room.</p>",
        graphic: "requests-overlap",
      },
      {
        subheading: "Less polish. More principle.",
        tags: ["Design Direction", "Information Architecture", "Lo-fi Sketch", "Design Critiques"],
        body:
          "<p>Once the direction became clear, I started designing the onboarding flow, and immediately hit a real tension between two competing needs. The technical side needed enough user input to generate accurate results; the user side needed to see value as quickly as possible. I set one design constraint for myself: the fewest questions it takes to get someone to their first AI-generated result. Competitor SaaS products looked polished and I felt the pull to match them, but I held that constraint instead — our team stayed focused on shipping something functional rather than something impressive. An MVP's job is to validate logic, not win visual comparisons.</p>",
        graphic: "onboarding-wipe",
      },
      {
        subheading: "Not the hand-off. The hands-on.",
        tags: ["Feasibility Adjustments", "Cross-functional Collaboration", "Ship Quick Iterations", "Design Handoff & Documentation"],
        body:
          "<p>When it came time to ship, I didn't hand the designs off, I built them myself. Using Figma MCP connected to Claude Code, I established a loop: design, generate code, deploy, test, adjust, completing the full cycle in a few hours. For features beyond my technical reach, I sat in real-time with the CTO, watching implementation happen and making immediate feasibility adjustments when something couldn't be built as designed. What changed wasn't just the speed, it was my judgment. I stopped asking for things I couldn't defend technically, and started knowing the difference between what was worth fighting for and what could be solved a different way.</p>",
        image: "/media/XCCRJrEOaiKO8kH3KkLrqWk7co.png",
      },
    ],
    tags: [
      "Stakeholder Interviews", "Affinity Mapping", "Problem Identification", "Persona",
      "Design Direction", "Information Architecture", "Lo-fi Sketch", "Design Critiques",
      "Feasibility Adjustments", "Cross-functional Collaboration", "Ship Quick Iterations",
      "Design Handoff & Documentation",
    ],
  },
  {
    slug: "immigrantsrising",
    name: "Immigrants Rising",
    tag: "Internal Tool",
    summary:
      "A web-based internal tool to help undocumented/in-state students determine eligibility for AB540.",
    claim: "Rebuilt a tool losing half its users into a guided flow with +15% completion.",
    year: "2025",
    color: "rgb(122, 192, 224)",
    liveUrl: "https://istt.immigrantsrising.org/",
    headerImage: "/media/GLRWuy0L0OoDiihRNCNBCDJE77o.png",
    mainVideo: "/media/jvqafGjFyaFOuXxZc2QrEtCvG8.mp4",
    role: "Product Designer (Design Lead)",
    duration: "Oct 2024 - Feb 2025",
    tools: "Figma, Framer",
    team: "2 Client Member, 1 PM, 3 Product Designers, 1 Software Engineer",
    overview:
      "<p>Brought on as a Product Designer at Immigrants Rising, I inherited a California In-State Tuition Tool that was losing users at alarming rates—dense, overwhelming, and visually inaccessible. Collaborating with a cross-functional team of designers, a PM, and an engineer, I led the redesign from a single-page form into a guided multi-step experience. Drawing on form design research and usability testing, I identified the core gap: users had no sense of progress, no inline guidance, and no confidence in the legitimacy of their results. By the end of the project, what had been a <strong>50%+ drop-off tool became a 15% higher completion rate experience</strong> backed by Immigrants Rising's first design system—built from scratch and ready for scalable development.</p>",
    features: [
      { title: "Feature #1: Multi-step guided flow", video: "/media/WLHnTEOCPaMWmYlKdmKXZb6H8.mp4" },
      { title: "Feature #2: Real-time inline guidance", video: "/media/WAV0u4UQ4r0mAclcnMAlSHzcngQ.mp4" },
    ],
    memorable: {
      title: "Designing for Trust Over Warmth",
      body:
        "<p>The most memorable moment that stayed with me most wasn't a metric—it was <strong>a user reaction</strong>. While designing an eligibility results page, I added motivational language with emojis to make the experience feel supportive and human. But during usability testing, a participant hesitated and said, \"I'm not sure if I can take this seriously.\"</p><p>That feedback made me realize I had prioritized warmth over credibility in a high-stakes context. For undocumented students making decisions about their educational future, <strong>trust matters more than friendliness</strong>.</p><p>I redesigned the page by removing emojis from the header, shifting encouragement into secondary text, and emphasizing clarity and institutional legitimacy. This experience reshaped how I think about empathy in design—not as making something feel good, but as <strong>helping users feel confident in critical moments</strong>.</p>",
    },
    storyHeading: "Designing for high-stakes decision-making in underserved communities",
    stories: [
      {
        subheading: "Clarity is my responsibility",
        tags: ["Research", "Information Architecture", "Design Strategy", "Stakeholder Alignment"],
        body:
          "<p>When this project started, the client knew the form wasn't working, but no one could point to why. The PM said \"users are dropping off,\" but there was no consensus on whether it was the length, the language, or the structure. I ran a competitive analysis across government eligibility tools, fintech onboarding flows, and multi-step form best practices, drew my own conclusions about what patterns would reduce cognitive load, and built a research document that mapped single-page vs. multi-section forms with clear trade-offs. That gave the team a working foundation—a direction I could explain and a structure the engineer could build toward. What I learned is that when no one hands you a clear problem definition, defining it yourself is not extra work. It's the actual job.</p>",
        image: "/media/KIC87lLkZoJ11Wk99lK7auPurc.png",
      },
      {
        subheading: "When Feedback Challenged My Assumptions",
        tags: ["Usability Testing", "Design Iteration", "Design Critique", "Cross-Functional Collaboration"],
        body:
          "<p>I designed an eligibility results page with emojis and motivational language to make the experience feel encouraging. During usability testing with five users, one participant paused and said, \"I'm not sure if I can take this seriously.\" That stopped me cold. I had prioritized warmth over credibility—a fundamental misread for users making high-stakes decisions about education and finances.</p><p>I revisited the design. I removed the emojis from the header, moved motivational copy into supporting text, and restructured the results page to surface unmet requirements first with clear, institutional language. I presented the rationale to the client: trust isn't built through friendliness. It's built through precision. The revised design made it into production.</p><p>What I realized: empathy in design isn't about making things feel good—it's about understanding what users need to feel confident.</p>",
        image: "/media/vrBLPlvfgGNHVdCEtBRhdFBgXo.png",
      },
      {
        subheading: "From first design system to production-ready foundation",
        tags: ["Design System", "Responsive Design", "Developer Handoff", "Implementation QA"],
        body:
          "<p>Once the design direction was validated, I built Immigrants Rising's first design system from scratch. I aligned with the engineer on technical constraints, referenced Tailwind CSS and @shadcn/ui for component structure, and built a scalable system in Figma covering typography, spacing, breakpoints, and component states.</p><p>But when handoff came, the developer flagged inconsistencies I had missed—edge cases in form validation states and responsive behavior I hadn't documented. I compiled an Implementation Document that mapped every component to its Tailwind equivalent, annotated responsive breakpoints with exact pixel values, and scheduled a walkthrough to address gaps in real time.</p><p>What I carry from this: being thorough isn't enough if you haven't yet learned what thorough means for that specific deliverable. Ownership means making the system usable for the person who has to build from it.</p>",
        image: "/media/n8uKUQRt4HtLG5ZVvKF3sC7usqA.png",
      },
    ],
    tags: [
      "Research", "Information Architecture", "Design Strategy", "Stakeholder Alignment",
      "Usability Testing", "Design Iteration", "Design Critique", "Cross-Functional Collaboration",
      "Design System", "Responsive Design", "Developer Handoff", "Implementation QA",
    ],
  },
  {
    slug: "connectlink",
    name: "Connect Link",
    tag: "Webapp Saas",
    summary:
      "A B2C SaaS networking platform that helps entrepreneurs and business professionals connect.",
    claim: "Took a stalled discussion board from placeholder wireframes to MVP-ready.",
    year: "2024",
    color: "rgb(0, 74, 173)",
    liveUrl: null,
    headerImage: "/media/gyr7Hz1NJ4MIILMBR6x3EAjEZw.png",
    mainVideo: "/media/Tp3l4GMTsqlIqrnf7JKh1gWU7Y.mp4",
    role: "UX Design Intern",
    duration: "Feb 2024 - June 2024",
    tools: "Figma, Discord",
    team: "1 CEO, 1 PM, 1 Design Lead, 2 UX Designers",
    overview:
      "<p>Brought on as a UX intern at ConnectLink, I stepped into a Discussion Board feature stalled at placeholder wireframes, with no clear navigation or information hierarchy in place. Collaborating with a Design Lead and PM, I drew on existing user research and competitor analysis to identify the core gap: users had no navigable path through discussions and no intuitive way to discover relevant topics. By the end of the project, what had been a navigationally fragmented wireframe became a hi-fi discussion system backed by a component library built from scratch, the complete design foundation the team needed for their MVP.</p>",
    features: [
      { title: "Feature #1: Discussion Board Navigation Flow", video: "/media/nfu0x3r9Ic86GIFGzK5X25Q6c.mp4" },
    ],
    memorable: {
      title: "From Task-Taker to Decision-Maker.",
      body:
        "<p>What stayed with me wasn't the final high-fidelity handoff, it was the moment I realized that as an intern, my job wasn't just to fill placeholders, but to <strong>have the courage to question a flawed direction</strong>.</p><p>While mapping the structure for a new community feature, I noticed the existing wireframes forced users through a confusing navigation path that cluttered the experience with irrelevant options. As a new intern, I felt a huge internal conflict, I worried whether I had the standing to challenge the established flow. However, I translated that doubt into design logic, analyzing common industry patterns and proposing a simplified hierarchy that stripped away the noise. During the design review, I pushed past my nerves to present the structural issues I'd identified. My rationale resonated with the leadership, and <strong>my decision to streamline the interface was fully adopted</strong> for the product launch.</p><p>This experience taught me that <strong>design influence isn't granted by seniority; it's earned through professional judgment</strong>. When I felt like I didn't have the \"right\" to speak up, that was exactly when the product needed someone to bridge the gap between a placeholder and a functional solution. I've learned that being an owner means looking past the assigned task to protect the integrity of the user experience.</p>",
    },
    storyHeading: "Designing for Community Engagement in Early-Stage Professional Networking Apps",
    stories: [
      {
        subheading: "Ambiguity is my starting point.",
        tags: ["Persona", "Problem Identification", "Opportunity Mapping", "Design Direction"],
        body:
          "<p>When this project started, there was no clear direction on how to approach the design, no one told me which platform to reference, or whether to create something entirely new for our users. I ran a competitor analysis across Reddit, Quora, and Product Hunt, drew my own conclusions about what patterns would fit, and built a self-imposed weekly schedule since the PM had no specific timeline requirements. That gave me a working foundation, a direction I could explain and a structure I could be accountable to. What I learned is that when no one hands you a map, building your own is not extra work. It's the actual job.</p>",
        image: "/media/6C2yVGiOuQNS6nIrCMUKKsk13c.png",
      },
      {
        subheading: "Soft voice. Firm logic.",
        tags: ["Architecture", "Brainstorm", "Lo-fi Sketch", "Design Critiques"],
        body:
          "<p>As discovery progressed, I inherited a wireframe for the Discussion Board and felt something was structurally off, even as the most junior person on the team, I knew I had to say something. I mapped the information architecture, named a specific problem: three tabs at the top forced users to think about sections irrelevant to their current task, and I proposed replacing them with breadcrumb navigation instead. I was nervous the team wouldn't take it seriously, but the Design Lead supported the direction, and it made it into the final design. What I realized is that a quiet voice backed by clear reasoning carries more weight than I expected.</p>",
        image: "/media/pT07E6Paej302lZXmJ99sEFGVx8.png",
      },
      {
        subheading: "From first-timer to accountable owner.",
        tags: ["Design System", "Edge Cases", "Design Handoff & Documentation", "Handoff Meeting"],
        body:
          "<p>Once the direction became clear, I had to build a component library from scratch, something I had never done before. I didn't wait to be shown how. I scheduled a one-on-one with the Design Lead, learned the fundamentals of building components in Figma, and applied them directly to the Discussion Board's design system. But when the handoff came, the PM and other designers asked questions I hadn't prepared for, edge cases I had missed entirely. That moment was uncomfortable, and clarifying. What I carry from it is this: being thorough isn't enough if you haven't yet learned what thorough means for that specific deliverable.</p>",
        image: "/media/aOBSZjIhHOFMgpJcmdfyB50HKk.png",
      },
    ],
    tags: [
      "Persona", "Problem Identification", "Opportunity Mapping", "Design Direction",
      "Architecture", "Brainstorm", "Lo-fi Sketch", "Design Critiques", "Design System",
      "Edge Cases", "Design Handoff & Documentation", "Handoff Meeting",
    ],
  },
  {
    slug: "neurafutures",
    playgroundOnly: true,
    name: "Neura Futures",
    tag: "Graphic Design",
    summary:
      "Speculative-design graphics for brain-computer interfaces — a 70+ page booklet, a BCI-Fi history collage, and event posters for MIT Media Lab's Fluid Interfaces group.",
    claim: "Graphic designs for Brain Computer Interaction @ MIT Media Lab's Fluid Interface group.",
    year: "2023",
    color: "rgb(0, 0, 0)",
    liveUrl: null,
    headerImage: "/media/neurafutures/01-2Je3MMj8UYENR9BR8GaCO5mbKU.png",
    mainVideo: null,
    role: "Graphic Designer",
    duration: "Oct 2022 - Mar 2023",
    tools: "Figma, Adobe Illustrator, Procreate",
    team: "MIT Media Lab — Fluid Interfaces group",
    overview:
      "<p>I worked as a graphic designer with MIT Media Lab's Fluid Interfaces group on NeuraFutures — a speculative-design project asking how far brain-computer interfaces should go. My work spanned updating posters and data visualizations, creating new designs for NeuraFutures, refreshing the BCI history collage, and helping produce the BCI introductory brochure designed for speakers of Augmenting Brains 2022. Beyond print, I led 3+ in-person demo events and helped establish the physical installations that carried the work into the room.</p>",
    tags: ["Print Design", "Data Visualization", "Exhibition Design", "Speculative Design"],
    featuresHeading: "Deliverables",
    features: [
      {
        title: "Deliverable #1: Brain-Computer Interaction brochure",
        desc: "A 70+ page booklet cataloguing BCI props and science from 500+ books, movies, and shows — from Cerebro to the Neuralyser — each rated on reality factor, neurafictionality, and a BCI forecast.",
        image: "/media/neurafutures/02-NiJFOq9lnnNt1vEa2lbwhETTQw.png",
      },
      {
        title: "Deliverable #2: BCI-Fi history collage",
        desc: "A century-spanning collage tracing brain-computer interfaces through science and fiction, from Galvani's frog legs in 1780 to the pandemic era.",
        image: "/media/neurafutures/05-PGkWcSQCGeBZjxI8PPTEG5I3dYM.png",
      },
      {
        title: "Deliverable #3: Event posters",
        band: "dark",
        desc: "Poster and banner system for Augmenting Brains 2022 at the MIT Museum — BCI hardware woven through the typography.",
        image: "/media/neurafutures/07-CS5lAphE4c1PScKnIAsNuBzTc.png",
      },
    ],
    storyHeading: "",
    stories: [],
  },
  {
    slug: "mixvox",
    playgroundOnly: true,
    name: "MixVox",
    tag: "Instrument",
    summary:
      "A musical instrument made up of three dolls — each carries a different sound, so players compose personalized music through touch.",
    claim: "A musical instrument made up of three dolls. Each doll carries a different sound.",
    year: "2024",
    color: "rgb(232, 219, 39)",
    liveUrl: null,
    headerImage: "/media/mixvox/01.png",
    mainVideo: null,
    role: "Software & Hardware Developer, Product Designer",
    duration: "Jan - Mar 2024",
    tools: "Rhino, Arduino IDE, Python, Node.js, p5.js",
    team: "MIT Design Academy",
    overview:
      "<p>MixVox is a musical instrument made up of three dolls. Each doll carries a different sound, so players can create personalized music through interactions. It offers a playful, accessible way to experiment with sound and rhythm, blending music creation with tactile interaction — empowering users of all ages to express themselves musically, sparking curiosity and creativity.</p>",
    tags: ["Physical Computing", "Sound", "Toy Design", "Arduino"],
    featuresHeading: "How It Came Together",
    features: [
      {
        title: "A simple game about sound and rhythm",
        desc: "We folded a physical instrument into a 1D game format — players navigate the dolls along the line, laying down unique sounds as they go. Ever played Incredibox or Chrome Music Lab? We wanted to make the physical version of those.",
        images: ["/media/mixvox/02.png", "/media/mixvox/03.png"],
      },
      {
        title: "How to Play",
        desc: "Rotate the handles on the sides of the dolls to move them and place colored audio blocks in the sequence — the blue doll by brushing its teeth, the yellow doll by tapping its belly, and the red doll by blowing into its ears.",
        // 3x2 grid: each doll photo sits above its instrument icon
        images: [
          "/media/mixvox/04.png",
          "/media/mixvox/05.png",
          "/media/mixvox/06.png",
          "/media/mixvox/07.png",
          "/media/mixvox/08.png",
          "/media/mixvox/09.png",
        ],
        // wide color-mixing diagram, full width below the grid
        image: "/media/mixvox/10.png",
      },
      {
        title: "State Diagram",
        images: ["/media/mixvox/11.png", "/media/mixvox/12.png"],
      },
      {
        title: "Code — how to tie them together!",
        images: ["/media/mixvox/13.png"],
      },
      {
        title: "Lessons Learned",
        band: "dark",
        desc: "It's better to make one thing that works really well instead of a lot of things that don't really work.\n\nThink creatively: what are the possibilities besides just literal representation?\n\nIterate your ideas, test with users, and iterate, and test over and over.",
      },
      {
        title: "Recognition",
        desc: "Our work was featured on both @mitdesignacad and @mitarchitecture's Instagram!",
        images: ["/media/mixvox/14.png", "/media/mixvox/15.png"],
      },
    ],
    storyHeading: "",
    stories: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// ---------------------------------------------------------------------------
// Playground — smaller experiments
// ---------------------------------------------------------------------------

export type PlaygroundItem = {
  slug: string;
  category: "product-design" | "coding" | "physical-ai" | "graphic-design";
  name: string;
  tag: string;
  year: string;
  summary: string;
  color: string;
  link: string;
  image: string;
  /** Live page shown inside the Playground preview (must allow iframing). */
  embed?: string;
  /** "phone" shows the embed in a phone-sized frame (mobile web apps). */
  embedFrame?: "desktop" | "phone";
  /** Demo video played in the Playground preview (poster = `image`). */
  video?: string;
};

export const playground: PlaygroundItem[] = [
  {
    slug: "pebbles",
    category: "product-design",
    name: "Pebbles",
    tag: "Mobile App",
    year: "2025",
    summary:
      "A mobile app that helps parents of kids 3–11 respond to big emotions, with strategies, reflection, and peer support.",
    color: "rgb(253, 209, 92)",
    link: "https://pebbles-sel.vercel.app/",
    image: "/media/pebbles/cover.png",
    embed: "https://pebbles-sel.vercel.app/",
    embedFrame: "phone",
  },
  {
    slug: "colorimia",
    category: "physical-ai",
    name: "Colorimia",
    tag: "Embodied AI",
    year: "2024",
    summary: "A physical visualization device that extracts real-world colors and creates images using generative AI.",
    color: "rgb(222, 87, 67)",
    link: "https://drive.google.com/file/d/19S4dJ27skl1WqS8lyCyzeUlImYKRkNxF/view",
    image: "/media/colorimia/poster.jpg",
    video: "/media/colorimia/colorimia.mp4",
  },
  {
    slug: "mixvox",
    category: "physical-ai",
    name: "MixVox",
    tag: "Instrument",
    year: "2024",
    summary: "A musical instrument made up of three dolls. Each doll carries a different sound.",
    color: "rgb(232, 219, 39)",
    link: "/work/mixvox",
    image: "/media/v8K6sJNQ2oN7TIcQI1xnetzF4w.webp",
  },
  {
    slug: "dream",
    category: "coding",
    name: "What's In Your Dream",
    tag: "Data Visualization",
    year: "2023",
    summary: "An interactive coding website that helps you record, visualize, and analyze your dreams.",
    color: "rgb(220, 174, 242)",
    link: "https://zozoeyey.github.io/MIT-4.032/",
    image: "/media/ED7cnytyUuZY5fFps9gykNdirs.webp",
    embed: "https://zozoeyey.github.io/MIT-4.032/",
  },
  {
    slug: "neurafutures",
    category: "graphic-design",
    name: "Neura Futures",
    tag: "Graphic Design",
    year: "2023",
    summary: "Graphic designs for Brain Computer Interaction @ MIT Media Lab's Fluid Interface group.",
    color: "rgb(0, 0, 0)",
    link: "/work/neurafutures",
    image: "/media/hpBQU7e3jED2frOfvIouJYDy0Q.webp",
  },
];
