import "server-only";

/**
 * Transport-agnostic mail port.
 *
 * The contact form's server action depends on this interface, never on a
 * vendor SDK, so switching from Resend to Postmark to SES is a new file in
 * this folder plus one line in `getMailer()` — no page or action changes.
 *
 * The dev transport logs instead of sending, which means the contact flow is
 * fully testable locally with no API key and no risk of emailing a real
 * person.
 */

export type MailMessage = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  /** So a reply goes to the lead rather than to the site's own address. */
  replyTo?: string;
};

export type Mailer = {
  send(message: MailMessage): Promise<void>;
};

const consoleMailer: Mailer = {
  async send(message) {
    console.warn(
      "[mailer] No transport configured; message not sent.\n",
      JSON.stringify(message, null, 2),
    );
  },
};

export function getMailer(): Mailer {
  // Swap in a real transport here once RESEND_API_KEY (or equivalent) is set
  // in the environment and added to `src/env.ts`.
  return consoleMailer;
}
