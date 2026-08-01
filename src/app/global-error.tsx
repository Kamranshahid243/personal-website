"use client";

/**
 * Last-resort boundary for errors thrown by the root layout itself.
 *
 * Because the failing layout is what would normally provide `<html>` and
 * `<body>`, this component has to render them. It also cannot rely on the
 * providers or the stylesheet having loaded, hence the inline styles: this
 * page must work when everything else is broken.
 */
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          display: "grid",
          placeItems: "center",
          minHeight: "100dvh",
          margin: 0,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Something went wrong
          </h1>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: "1rem", cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
