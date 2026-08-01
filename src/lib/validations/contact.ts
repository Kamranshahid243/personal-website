import { z } from "zod";

/**
 * The contact form contract.
 *
 * Defined once and used in three places: as the React Hook Form resolver, as
 * the server action's input guard, and as the source of the TypeScript type.
 * A single definition is what makes client and server validation impossible to
 * desynchronise — and the server check is the one that actually matters, since
 * the client one can always be bypassed.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is unusually long."),
  email: z.email("Please enter a valid email address.").max(254),
  company: z.string().trim().max(120).optional(),
  /** Drives routing and the reply template. */
  budget: z
    .enum(["under-5k", "5k-15k", "15k-50k", "50k-plus", "not-sure"])
    .optional(),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps me give you a useful answer.")
    .max(4000, "Please keep it under 4000 characters."),
  /**
   * Honeypot. Real users never see this field, so any value at all means a bot
   * filled the form in. Cheap first line of defence before rate limiting.
   */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
