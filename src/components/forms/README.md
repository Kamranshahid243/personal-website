# `components/forms`

Form components: `contact-form.tsx` first, a newsletter form later.

Forms get their own folder because they are the only place three concerns meet
— React Hook Form for state, a Zod schema from `src/lib/validations` for rules,
and a server action from `src/server/actions` for submission. Isolating them
keeps that wiring in one predictable place instead of scattered through
sections.

The pattern:

1. Client component, `useForm({ resolver: zodResolver(schema) })`.
2. Fields composed from `components/ui/field` + `input` / `textarea`.
3. Submit calls the server action, which re-validates with the same schema.
4. Result reported through `sonner`, never an `alert()` or a page reload.
