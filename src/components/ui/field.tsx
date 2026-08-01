"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * Form field composition.
 *
 * Wiring a field up correctly means a unique id shared by the label and the
 * control, an `aria-describedby` pointing at the description *and* the error,
 * and an `aria-invalid` that matches what is rendered. That is four things to
 * get right per field, and in practice one of them is always missing.
 *
 * `<Field>` generates the ids and shares them through context, and
 * `<FieldControl>` injects them onto whatever control it wraps. The result is
 * that an accessible field is the path of least effort rather than a checklist.
 *
 * ```tsx
 * <Field invalid={!!errors.email}>
 *   <FieldLabel>Email</FieldLabel>
 *   <FieldControl>
 *     <Input {...register("email")} />
 *   </FieldControl>
 *   <FieldDescription>Where the reply goes.</FieldDescription>
 *   <FieldError>{errors.email?.message}</FieldError>
 * </Field>
 * ```
 */

type FieldContextValue = {
  id: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
  hasDescription: boolean;
  hasError: boolean;
  registerDescription: () => void;
  registerError: () => void;
};

const FieldContext = React.createContext<FieldContextValue | null>(null);

function useField() {
  const context = React.useContext(FieldContext);
  if (!context) {
    throw new Error("Field components must be used inside a <Field>.");
  }
  return context;
}

/* -------------------------------------------------------------------------- */

function Field({
  className,
  invalid = false,
  children,
  ...props
}: React.ComponentProps<"div"> & { invalid?: boolean }) {
  const id = React.useId();
  const [hasDescription, setHasDescription] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const value = React.useMemo<FieldContextValue>(
    () => ({
      id,
      descriptionId: `${id}-description`,
      errorId: `${id}-error`,
      invalid,
      hasDescription,
      hasError,
      registerDescription: () => setHasDescription(true),
      registerError: () => setHasError(true),
    }),
    [id, invalid, hasDescription, hasError],
  );

  return (
    <FieldContext.Provider value={value}>
      <div
        data-slot="field"
        data-invalid={invalid || undefined}
        className={cn("flex flex-col gap-(--spacing-stack-xs)", className)}
        {...props}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
}

/** Vertical rhythm for a stack of fields. */
function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex flex-col gap-(--spacing-stack-md)", className)}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const field = useField();

  return (
    <Label
      data-slot="field-label"
      htmlFor={field.id}
      className={cn("text-body-sm text-text", className)}
      {...props}
    />
  );
}

/**
 * Injects id and ARIA wiring onto its child control.
 *
 * Uses Radix's `Slot`, so it renders no element of its own — the props land
 * directly on the `<Input>`, `<Textarea>` or custom control inside.
 */
function FieldControl({ children }: { children: React.ReactNode }) {
  const field = useField();

  const describedBy =
    [
      field.hasDescription ? field.descriptionId : null,
      field.hasError ? field.errorId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <Slot.Root
      id={field.id}
      aria-describedby={describedBy}
      aria-invalid={field.invalid || undefined}
    >
      {children}
    </Slot.Root>
  );
}

/** Helper text. Always visible — hint text that only appears on error is a
 *  hint nobody read in time. */
function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  const field = useField();
  const { registerDescription } = field;

  React.useEffect(() => {
    registerDescription();
  }, [registerDescription]);

  return (
    <p
      data-slot="field-description"
      id={field.descriptionId}
      className={cn("text-caption text-text-muted", className)}
      {...props}
    />
  );
}

/**
 * Validation message.
 *
 * Renders nothing when there is no error, and announces itself politely when
 * one appears — `role="alert"` would interrupt a screen reader mid-word while
 * the visitor is still typing.
 */
function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const field = useField();
  const { registerError } = field;
  const hasContent = Boolean(children);

  React.useEffect(() => {
    if (hasContent) registerError();
  }, [hasContent, registerError]);

  if (!hasContent) return null;

  return (
    <p
      data-slot="field-error"
      id={field.errorId}
      aria-live="polite"
      className={cn("text-caption text-danger", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export {
  Field,
  FieldGroup,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  useField,
};
