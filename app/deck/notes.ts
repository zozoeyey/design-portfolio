// Speaker notes, shown only in the presenter window (/deck/notes) — never on the slides.
// Key = "<deck>:<slide heading>" ("shared" for the intro/close slides that appear in both decks);
// a repeated heading gets " #2". Lines starting with "- " render as bullets.
// DRAFTS: written from what's on each slide. Rewrite them in your own words.

export const NOTES: Record<string, string> = {
  // ---------- shared ----------
  "vg:Hi, I’m Zoey :)": `Hi, I’m Zoey. I’m a product designer who enjoys turning complex information into experiences people can understand. Thanks for taking the time to meet with me today.`,
  "vg:Agenda": `I’ll start with a quick introduction, then walk through one case study so I can go deeper into the decisions, iterations, and implementation. I’m aiming to leave about 7 minutes for questions, but feel free to jump in along the way.`,
  "vg:About me": `I got into product design in undergrad, where I studied Human-Computer Interaction. Then I got really interested in education, so I went to Stanford, which really shaped how I think about learning, information processing, and how to help users build mental models through design. I like finding the connection between what users are struggling with, what the business needs, and what the team can realistically build.
- Outside work: my cats, bouldering`,
  "shared:Q & A": ``,
  "shared:Thank you!": ``,

  // ---------- ValueGlance ----------
  "vg:ValueGlance": `ValueGlance is a web app for individual investors evaluating stocks for long-term value investing. It brings financial quality and valuation data together across desktop and mobile. For example, someone might want to understand whether a company generates strong returns, and whether its current price reflects that quality. So that’s the quick overview of this product, and now let me show you a few key features I designed.`,
  "vg:Feature 1 Mobile watchlist data visualization redesign": `Here’s the first feature: the mobile data visualization. As someone moves through the chart, the selected date and its financial metrics update together.
The redesign keeps those values outside the chart, so users can see the trend and the detail at the same time. It also connects the chart to metric customization and definitions.  From a design perspective, my focus here was fitting a lot of information into a tiny space while keeping it readable. I’ll come back to the decisions behind this flow.`,
  "vg:Feature 2 Screener filter redesign": `The second feature was the stock screener, where investors narrow down companies using financial criteria.
This work focused on making the filters and results easier to navigate. It connects to the same broader goal: helping investors find relevant information without having to work through unnecessary interface complexity.`,
  "vg:Feature 3 Design system revamp & migration": `The third part was the design system: rebuilding reusable components and migrating them into the product.`,
  "vg:My role & scope": `I worked as a product design and then product engineering intern, collaborating closely with the CTO, who also acted as the PM, as well as other designers and frontend engineers.
My scope covered the product audit, synthesis of more than 20 survey responses, design exploration, prototyping, and implementation work. Across the work shown here, I completed over a hundred points on Linear, and created more than thirty pull requests on Github, so actually get the changes into the product.`,
  "vg:Shipped to production": `The work shipped to production, with five important redesigns I made in one release.
Other designers also began reusing the components I migrated in their own pages, which helped the work support a broader visual revamp.
Beyond that, I partnered closely with the CTO and CEO to make sure our design decisions effectively balanced user needs, business objectives, and technical feasibility, which was highly recognized by the leadership team.`,
  "vg:Discovery: from execution to ownership": `Now, I want to share a very important story with you about how I went from execution to taking ownership.
  -At the beginning, the request sounded straightforward: It was to redesign the tooltip component on mobile and start building a component library.
But I didn’t yet know what was causing the usability problems and how the team decided on what to change. Was there too much information? Was the layout breaking? Or was the information organized in a way that didn’t match how investors made decisions?
Before opening Figma, I worked through three questions: why does this matter to the business, who is struggling with it, and what can we realistically change?`,
  "vg:Understand the business": `My first move was to understand the business context. I did this because I think without clear business goals, I’d be designing blindly and might miss what actually drives impact. So I sat in on the CEO's bi-weekly investing seminars, where he walked through the core strategy—the idea that the product helps people quickly weed out weak stocks instead of analyzing every single one. I asked a lot of basic questions about which metrics actually drive a decision, and why. This gave me a better picture of my work.`,
  "vg:Validate with real users": `My next move was to validate with real user behavior.  I did this because I think I needed real user insight instead of just guessing the issue. So I audited the mobile experience and compared what I found with the existing user survey responses. Three problems overlapped: First, the tooltip could cover the chart or run off-screen, second, timeline controls overlapped important information, and the hierarchy was difficult to understand on mobile. It showed my instinct matched the data, the clutter was real and clearly located.`,
  "vg:Check it with engineering": `Then I walked through the chart in DevTools with a frontend engineer. We discussed the current implementation, responsive behavior, and which parts we could realistically rebuild now versus later. I also learned that many existing fixes had been handled individually, without a strong shared component foundation.`,
  "vg:Define three strategic pillars": `I brought those findings together into three principles.
Readable density: keep the information investors need, but make it legible on a small screen.
Decision-first: organize the data around what users are trying to judge.
And a reusable system: solve recurring problems through shared components.
These became the criteria I used to evaluate the design directions, especially when a cleaner-looking screen still created friction in the workflow.
For example, simply hiding more information might improve visual simplicity, but it could make an investor’s comparison harder. - And a solution that worked on one screen but needed a custom implementation everywhere else would fall short of the system goal. Having these principles made those tradeoffs easier to discuss with the team.`,
  "vg:Feature deep dive": `Now we're moving into Design. I’ll focus on the mobile data visualization because it shows the most important decisions in this project: choosing the right scope, balancing competing needs, and changing direction after feedback.`,
  "vg:Question the scope": `I started by thinking about the scope of the project.
The tooltip sat inside a chart, the chart sat inside a page, and the page used shared components. Changing only the tooltip could fix one visual issue while leaving the surrounding workflow unchanged. But is that really the solution we're aiming for?`,
  "vg:Research competitor patterns": `With that question in mind, I spent some time on how similar tools like TradingView and Yahoo Finance handled this, and the overall user experience. I focused on: how they surfaced dense data without overwhelming users on a small screen. I also revisited my own audit and user feedback because I wanted to make sure whatever I designed actually matched how investors actually read a chart.`,
  "vg:Map what matters": `The second thing I did was map out what should go inside the data visualization — figuring out which metrics are the most important, like comparing ROIC against WACC,— so I knew exactly what to show, what to prioritize, and what to leave out. `,
  "vg:Explore design directions": `So based on that research, I used Claude to help explore and prototype design directions. There are two main directions. The first direction skill kept the tooltip on the chart, anchored to the selected point. That made the connection between point and value immediate, but the tooltip still competed with the chart for space. The second moved the readout outside the chart. That preserved the trend and gave the metrics a more stable area, but separated the values from their exact point.`,
  "vg:Off-chart tooltip": `So I went with the second direction — the off-chart readout. My rationale came down to a couple of angles. From a usability perspective, moving the detail off the chart meant it could never run off-screen or cover the data — the single most common complaint I'd found. And from a workflow perspective, users could now see the full trend and the point's values at the same time, instead of the readout blocking the chart they were reading. A fixed readout area also gave me room to let people customize which metrics they see, which mattered since our users ranged from beginners to veterans. The tradeoff was giving up the tight point-to-value link — but for a problem about things covering and overflowing the screen, an unobstructed chart was clearly the right call.`,
  "vg:The first pushback": `So that was my first action — exploring different design directions. With that decision made, the second thing I did was I mocked up the first version and brought it to a design review with the CTO and other designers — and that's where the first real pushback came in.
The metrics data was now below the chart, but metric selection still lived in another section farther down. To swap a metric, users had to leave the chart, make a change, and scroll back. SO the issue wasn't that the tooltip was wrong — our CTO was worried I'd split one task into two separate flows.`,
  "vg:Validate the concern": `To validate the concern, I walked through the prototyped flow myself: leave the chart, scroll down, pick a metric, and scroll back to inspect the result.
That confirmed the issue. Each adjustment interrupted the reading flow.
This was a walkthrough of the interaction, rather than a measured usability study. But it gave us a concrete basis for the next iteration: bring customization closer to the place where users read the data.`,
  "vg:Reframe the problem": `I brought a new framing back to the team.
The original question was, “How do we stop the tooltip from covering the chart?” The new question was, “How do we help investors read and adjust metrics smoothly and clearly?”
My biggest lesson from the review was to understand the concern behind the feedback, then use it to reconsider the problem I was solving.”`,
  "vg:The Iteration": `So after aligning with the CTO, my third step was to iterate on the design based on our discussion. So here is the iteration process.`,
  "vg:V1 Edit opens a metric sheet": `In V1, Edit opened a metric sheet. That brought customization closer to the chart, but the reading and editing experience still needed refinement.`,
  "vg:V2 Concept: pick metrics on the chart": `I also explored selecting metrics directly on the chart, shown here as V2. It was another way to connect selection and reading, but it added controls to an already dense chart area.`,
  "vg:Final Metrics above the chart → Edit chart metrics → All Metrics": `The final solution separated the jobs while keeping them connected.
First, the selected metrics sit above the chart. This is a change from the earlier below-chart prototype. The readout stays outside the plot, while the quality and valuation summary, its supporting values, and the chart form a clearer reading order.
Second, Edit chart metrics sits directly below the chart. It opens a picker grouped by Quality, Value, and Growth. Users can choose the metrics they want and save a custom view, without navigating to a separate section farther down the page.
Third, Metric definitions opens the All Metrics reference. Someone unfamiliar with a metric can find a definition, formula, and example, while the main view stays focused on reading the chart.
The tradeoff is that the full metric list and explanations take an extra action to open. In return, the default screen has less competing information, with a direct path to customization and learning.`,
  "vg:Rebuild the components": `To make this reusable, I also took ownership and rebuilt the component foundation behind the mobile experience. I documented sizing, selected states, and how the components handled different amounts of content. This ended up being useful beyond just this project — these components got picked up by other teams building on the same design system.`,
  "vg:Drive the handoff": `I worked on the implementation, using Linear tickets and Github pull-request reviews to communicate the intended behavior and work through issues. This example shows this redesign work moving from handoff to review, approval, and merge. The next step I would prioritize is measuring the user experience: can people locate a value, interpret it, and change a metric without losing their place? Those are more direct measures of this design’s success than the amount of work completed.`,
  "vg:Reflection": `Looking back, this project taught me two things.

First, a small component request can reveal a larger workflow problem. What started as fixing a tooltip became a question about how investors read and adjust financial data.

Second, feedback becomes more useful when I understand the concern behind it and walk through the actual interaction. That helped me see why a cleaner chart could still create an inconvenient workflow.

That’s the kind of ownership I want to bring to a team: defining the problem clearly, making thoughtful tradeoffs, and staying involved until the work ships.`,

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
  "cm:Map the flow": `- The gap to first value — keep it short`,
  "cm:Explore two directions": `- Inline analysis vs deferred report`,
  "cm:Choose inline analysis": `- Show the work → trust; live feedback; users can edit`,
  "cm:Hit real pushback": `- CEO: “Just give them a result.”`,
  "cm:Dig into the concern": ``,
  "cm:Validate with users": ``,
  "cm:Reframe the problem": ``,
  "cm:Iterate to final version": ``,
  "cm:Iterate to final version #2": ``,
  "cm:It became the front door": `- CTO: “Buildable, right signal.” User: “I’d actually use it.”`,
  "cm:Balancing tradeoffs": `- Model needs vs user effort: the smallest thing serving both`,
  "cm:Own the design system": `- design.md, style guide → Claude Code, hi-fi → component library`,
  "cm:Hands-on, not hand-off": `- Built and deployed the frontend myself with Figma MCP + Claude Code`,
};
