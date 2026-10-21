// Speaker notes, shown only in the presenter window (/deck/notes) — never on the slides.
// Key = "<deck>:<slide heading>" ("shared" for the intro/close slides that appear in both decks);
// a repeated heading gets " #2". Lines starting with "- " render as bullets.
// DRAFTS: written from what's on each slide. Rewrite them in your own words.

export const NOTES: Record<string, string> = {
  // ---------- shared ----------
  "vg:Hi, I’m Zoey :)": `Hi, I’m Zoey. I’m a product designer who enjoys turning complex information into experiences people can understand. Thanks for taking the time to meet with me today.`,
  "vg:Agenda": `I'll start with a quick introduction, then walk through one case study, focusing on my design decisions, iterations, and implementation. I'm hoping to leave some time for questions at the end.`,
  "vg:About me": `I got into product design in undergrad, where I studied Human-Computer Interaction. Then I got really interested in education, so I went to Stanford, which really shaped how I think about learning, information processing, and how to help users build mental models through design. I'm especially interested in connecting user needs, business goals, and what a team can realistically build.
- Outside work: my cats, bouldering`,
  "shared:Q & A": ``,
  "shared:Thank you!": `Thank you.`,

  // ---------- ValueGlance ----------
  "vg:ValueGlance": `ValueGlance is a B2C financial analytics webapp that helps individual investors evaluate stocks using complex financial metrics.

Although the product is consumer-facing, the design challenges are very similar to those in data-heavy SaaS applications: organizing complex information, supporting analytical decisions, and building reusable components across the product. I was a product design and engineer intern. I worked on a small team of around 10 people, including the CEO, CTO, engineers, and other designers.

Let me quickly introduce three features I worked on.`,
  "vg:Feature 1 Mobile watchlist data visualization redesign": `The first is the mobile data visualization redesign.
As users interact with the chart, the selected date and financial metrics update together. The key change was moving those metrics outside the chart to keep both the trend and the details visible.
I'll come back to the design decisions behind this feature in a moment.`,
  "vg:Feature 2 Screener filter redesign": `The second feature was the stock screener, where I redesigned the filtering experience to make it easier for investors to narrow down companies using financial criteria.`,
  "vg:Feature 3 Design system revamp & migration": `The third part was the design system: rebuilding reusable components and migrating them into the product.`,
  "vg:My role & scope": `My work covered product audits, synthesis of over 20 survey responses, design exploration, prototyping, and implementation.
Across these projects, I completed over 100 Linear points and created more than 30 GitHub pull requests.`,
  "vg:Shipped to production": `Five major redesigns I worked on shipped in one release. Other designers also started reusing the components I migrated.

What I'm especially proud of is that I wasn't just handing off designs. I worked closely with engineering to make sure they were feasible and actually shipped.`,
  "vg:Discovery: from execution to ownership": `Now I want to share how a relatively small design request turned into a larger problem-solving opportunity.

Initially, I was asked to redesign a mobile tooltip and help build a component library.

But before jumping into Figma, I wanted to understand why the existing experience wasn't working.

I approached this from three angles: the business, the users, and engineering.`,
  "vg:Understand the product & business context": `First, I wanted to understand the business context.

I attended the CEO's investing seminars to understand the investment philosophy and core financial metrics.

Second, I reviewed Google Analytics to understand user engagement and navigation patterns.

And third, I studied internal feature documentation and UX audits to understand existing workflows and design decisions.

Together, these helped me understand the business goals, user behavior, and product structure.`,
  "vg:Validate with real users": `Next, I audited the mobile experience and compared my findings with existing survey responses.

Three issues consistently appeared: tooltips could cover the chart or overflow the screen, timeline controls overlapped important information, and the visual hierarchy made financial data difficult to read on mobile.

So I had a clearer understanding of what was going wrong.`,
  "vg:Check with engineering": `I also walked through the existing implementation with a frontend engineer.

We discussed responsive behavior and which parts could realistically be rebuilt.

I learned that many issues had been addressed through individual fixes instead of shared components, which created an opportunity for a more systematic solution.`,
  "vg:Define three strategic pillars": `Based on these findings, I defined three design principles.

The first was readable density: preserve important financial information without overwhelming a small screen.

The second was decision-first: organize information around what investors are trying to evaluate.

And the third was reusability: solve recurring problems through shared components.

These principles helped me evaluate the tradeoffs in my designs. For example, simply hiding more information might make the screen look cleaner, but could actually make financial comparisons harder.`,
  "vg:Feature deep dive": `Now I'll focus on the mobile data visualization redesign, because it best demonstrates how I made design decisions, responded to feedback, and iterated.`,
  "vg:Question the scope": `The first thing I did was question the scope of the original request.

I was initially asked to fix the mobile tooltip, but from my audit, I realized the problem wasn't just the tooltip itself. It was how financial information was displayed within a very limited chart area.

So instead of just adjusting the tooltip's size or position, I decided to explore how we could reorganize the information around the chart to make it easier to read.`,
  "vg:Research competitor patterns": `I looked at how products like TradingView and Yahoo Finance handled dense financial information on mobile.

I focused particularly on how they balanced chart visibility with detailed metrics.

I also revisited my audit and user feedback to make sure the design directions addressed our specific problems.`,
  "vg:Map what matters": `Then I mapped out the information hierarchy, identifying which metrics were essential for making investment decisions.

For example, comparing ROIC with WACC helps investors evaluate whether a company creates value.

This helped me decide what to prioritize in the default view.`,
  "vg:Explore design directions": `Based on that research, I used Claude to prototype and explore two directions.

The first kept the tooltip anchored to the selected point. This made the connection between the data point and its value immediate, but still created overlap problems.

The second moved the metric readout outside the chart. This preserved the full trend but introduced some distance between the point and its values.`,
  "vg:Off-chart tooltip": `So I went with the second direction — the off-chart readout, and prototyped quickly in Figma. My rationale came down to a couple of angles. From a usability perspective, moving the detail off the chart meant it could never run off-screen or cover the data — the single most common complaint I'd found. And from a workflow perspective, users could now see the full trend and the point's values at the same time, instead of the readout blocking the chart they were reading. A fixed readout area also gave me room to let people customize which metrics they see, which mattered since our users ranged from beginners to veterans. The tradeoff was giving up the tight point-to-value link — but for a problem about things covering and overflowing the screen, an unobstructed chart was clearly the right call.`,
  "vg:The first pushback": `I brought the first version to a design review with the CTO and other designers, and that's where the first real pushback came in.

The metrics were now below the chart, but picking them still lived in a section farther down. So to swap one metric, users had to leave the chart, scroll down, pick, and scroll back.

I validated the flow and walked through it myself, step by step, and the concern held up: every adjustment interrupted the chart-reading. It wasn't a formal usability study, but it pinpointed an interaction problem my first design hadn't addressed.`,
  "vg:Reframe the problem": `That feedback helped me confirm that the problem was bigger than just chart readability.

Initially, I was asking, "How do we make financial data easier to read on mobile?"

But now I was asking, "How do we help investors read and customize metrics without interrupting their workflow?"

That shifted my focus from improving the chart itself to connecting reading and customization.`,
  "vg:The Iteration": `With that new framing, I went back and explored how to connect metric customization with chart reading more closely.`,
  "vg:V1 Edit opens a metric sheet": `My first iteration introduced an Edit button that opened a metric selection sheet.

This brought customization closer to the chart, but I still wanted to refine how reading and editing worked together.`,
  "vg:V2 Concept: pick metrics on the chart": `I also explored allowing users to select metrics directly on the chart.

This made customization more immediate, but introduced additional controls into an already dense visualization.`,
  "vg:Final Metrics above the chart → Edit chart metrics → All Metrics": `The final solution separated the experience into three connected parts.

First, reading metrics.

I placed the selected metrics above the chart, creating a clearer hierarchy between the company summary, financial values, and visualization.

The readout stayed outside the plot, so users could still see the complete trend.

Second, customizing metrics.

I placed Edit Chart Metrics directly below the chart, opening a picker organized into Quality, Value, and Growth.

Users could customize their view without navigating to a different section of the page.

Third, understanding metrics.

I introduced a direct path to All Metrics, where users could find definitions, formulas, and examples.

This was particularly helpful for less experienced investors without overwhelming the default interface.

The key tradeoff was that customization and detailed explanations required an extra action.

But in return, the main chart became easier to read, while users still had clear access to those functions when needed.`,
  "vg:Rebuild the components": `Beyond designing the experience, I also rebuilt the underlying components to make them reusable.

I documented sizing, interaction states, and responsive behavior.`,
  "vg:Drive the handoff": `I stayed involved during implementation, using Linear and GitHub pull requests to communicate requirements, review changes, and resolve issues. This is an example of how we comminucate reviews through our PR to merging.

One thing I'd like to measure next is whether users can locate values, interpret metrics, and customize the chart without losing their place.
Those would be more meaningful indicators of success than simply measuring how much work was shipped.`,
  "vg:Ownership means looking beyond the initial request.": `Looking back, this project taught me two important things.

First, a small component request can reveal a much larger problem. What started as a tooltip redesign became a question about how investors read and interact with financial data.

Second, feedback is most valuable when I understand the concern behind it, rather than just responding to the suggested change.

That's the kind of ownership I want to bring to a product team: defining problems clearly, making thoughtful tradeoffs, and staying involved until the work ships.`,

  // ---------- Canmarket.ai ----------
  "cm:Canmarket.ai": `- Founding Product Designer & CPO, Jun 2025 – Feb 2026
- B2B AI marketing web app for resource-limited SMBs`,
  "cm:Feature 1 Onboarding experience": `- Business model → channels → brand analysis → assessment`,
  "cm:Feature 2 Campaign generation workflow": `- Campaign overview → SKU upload → AI creative calendar`,
  "cm:Founding Designer & CPO": `- 0 → 1, research → frontend; worked with the CEO and CTO`,
  "cm:Launched & validated": `- Jan 2026 launch, $200K seed, 21 paying customers across US / China / SG`,
  "cm:Start from ambiguity": `- Fast MVP, no PRD, no marketing background`,
  "cm:Build alignment": `- CEO’s vision notes + pitch deck → one shared definition`,
  "cm:Find the root problem": `- Three clients, three asks; the overlap: no affordable way to run professional-grade campaigns`,
  "cm:Study the market": `- Agencies, AI content tools, in-house teams, founders doing it all — each falls short`,
  "cm:Turn ambiguity into 3 pillars": `- Focused scope · Fast time-to-value · Trustworthy AI output`,
  "cm:Going deep: onboarding": `- Deep dive on onboarding`,
  "cm:Research similar tools": `- Goal: fewest questions → first AI result`,
  "cm:Map the path to first value": `- The gap to first value — keep it short`,
  "cm:Explore two directions": `- Inline analysis vs deferred report`,
  "cm:Decide what users should do": `- Show the work → trust; live feedback; users can edit`,
  "cm:Hit real pushback": `- CEO: “Just give them a result.”`,
  "cm:Dig into the concern": ``,
  "cm:Validate with users": ``,
  "cm:Reframe the problem": ``,
  "cm:Iterate to final version": ``,
  "cm:Iterate to final version #2": ``,
  "cm:It became the front door": `- CTO: “Buildable, right signal.” User: “I’d actually use it.”`,
  "cm:Balancing tradeoffs": `- Model needs vs user effort: the smallest thing serving both`,
  "cm:Turn the design system into code": `- design.md, style guide → Claude Code, hi-fi → component library`,
  "cm:Hands-on, not hand-off": `- Built and deployed the frontend myself with Figma MCP + Claude Code`,
};
