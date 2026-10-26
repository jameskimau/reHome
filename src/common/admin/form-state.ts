// State returned by admin form Server Actions to useActionState.
export type FormState = {
  success: boolean;
  message: string;
  /** Per-field messages from Zod, keyed by form field name. */
  fieldErrors?: Partial<Record<string, string[]>>;
  /** What was submitted, so the form can refill itself after React resets it. */
  values?: Record<string, string>;
} | null;
