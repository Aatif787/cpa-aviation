<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Keep the requested cinematic website as one scrolling index page with section anchors; the brief explicitly requires continuous section storytelling.
- Load Lenis only after hydration and disable motion for reduced-motion users; SSR must remain browser-safe and the film must retain a still-image fallback.
- Use generated media as illustrative brand visuals, not evidence of owned aircraft or verified architecture; legal documents and policies must not be fabricated.
- Store externally supplied aircraft films and matching fallback frames as asset pointers; preserve the original page copy independently of the film and keep the supplied composition visible across screen sizes.
- Keep opening motion in a hydration-only Web Animations hook using clipped media and transform-based entrances; resizing or reduced-motion changes must restore the unchanged final layout.
- Load GSAP, ScrollTrigger, and Lenis inside the motion hook after hydration; use separate elements for entrance and scroll transforms, scope cleanup, and disable depth and magnetic effects on touch devices and reduced motion.
- Drive the repeating liquid-fill reveal from ScrollTrigger enter/leave callbacks on marked visual frames, drawing the wavy boundary with a computed clip-path; reset only once the frame has fully left the viewport, keep it out of the opening film, and leave images unclipped when motion is reduced.
- AI service suggestions live in a server-only module and may only choose from the site's fixed focus-area list; prompt forbids invented claims.
- Contact enquiries are inserted server-side with the admin client into a locked table (no public read/insert policies).
- Keep the aircraft blueprint and flight path as inline decorative SVG (aria-hidden, pointer-events none, painted behind section content) animated only by the motion hook's GSAP/ScrollTrigger code, and render them fully drawn and static when motion is reduced.
