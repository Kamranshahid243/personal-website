# `server/actions`

Next.js Server Actions — `"use server"` functions that mutate something:
`contact.ts` (send the enquiry), `subscribe.ts` (newsletter signup).

They live here rather than beside the components that call them so it is
obvious at a glance what server-side surface area the site exposes. Every file
in this folder is a public, unauthenticated endpoint once deployed, and should
be reviewed as one.

Every action follows the same shape:

1. Re-validate the input with the Zod schema from `src/lib/validations`. The
   client-side check is a UX affordance; this one is the security boundary.
2. Rate-limit and check the honeypot before doing any real work.
3. Call a service in `src/server` (for example `mail/mailer.ts`) — never a
   vendor SDK directly.
4. Return a plain serialisable result object; never throw raw errors across
   the boundary.
