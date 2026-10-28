"use client";

import Link from "next/link";
import { useActionState, type ReactNode } from "react";

import { upsertProduct } from "@/actions/admin/application/upsert-product";
import { STATUS_LABELS } from "@/components/admin/labels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FormState } from "@/common/admin/form-state";
import { MAX_UPLOAD_MB } from "@/common/admin/payload/product.dto";
import ImageDropzone from "@/components/admin/ImageDropzone";
import type { AdminProductDetailResponse } from "@/common/admin/response/product.response";
import { CATEGORIES, CATEGORY_META, CONDITIONS, CONDITION_LABELS } from "@/lib/catalog";

const SELECT_CLASS =
  "h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

interface FieldProps {
  name: string;
  label: string;
  hint?: string;
  state: FormState;
  children: ReactNode;
}

const Field = ({ name, label, hint, state, children }: FieldProps) => {
  const error = state?.fieldErrors?.[name]?.[0];
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-destructive">{error}</p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="space-y-4 rounded-xl border bg-card p-5">
    <h2 className="font-semibold">{title}</h2>
    {children}
  </section>
);

interface ProductFormProps {
  /** Omit to create a new product. */
  product?: AdminProductDetailResponse;
}

const ProductForm = ({ product }: ProductFormProps) => {
  const [state, formAction, pending] = useActionState(
    upsertProduct.bind(null, product?.id ?? null),
    null,
  );
  // React resets the form after each submit, so a failed submit refills from what was just sent.
  const value = (name: keyof AdminProductDetailResponse) => {
    const submitted = state?.values?.[name];
    if (submitted !== undefined) return submitted;
    const current = product?.[name];
    if (current === null || current === undefined) return "";
    if (Array.isArray(current)) return current.join("\n");
    return String(current);
  };

  return (
    <form action={formAction} className="space-y-6">
      <Section title="Basics">
        <Field name="title" label="Title" state={state}>
          <Input id="title" name="title" defaultValue={value("title")} required />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="brand" label="Brand" state={state}>
            <Input id="brand" name="brand" defaultValue={value("brand")} required />
          </Field>
          <Field name="model" label="Model" state={state}>
            <Input id="model" name="model" defaultValue={value("model")} required />
          </Field>
          <Field name="category" label="Category" state={state}>
            <select
              id="category"
              name="category"
              defaultValue={value("category") || CATEGORIES[0]}
              className={SELECT_CLASS}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {CATEGORY_META[category].label}
                </option>
              ))}
            </select>
          </Field>
          <Field name="condition" label="Condition" state={state}>
            <select
              id="condition"
              name="condition"
              defaultValue={value("condition") || CONDITIONS[0]}
              className={SELECT_CLASS}
            >
              {CONDITIONS.map((condition) => (
                <option key={condition} value={condition}>
                  {CONDITION_LABELS[condition]}
                </option>
              ))}
            </select>
          </Field>
          <Field name="status" label="Status" state={state}>
            <select
              id="status"
              name="status"
              defaultValue={value("status") || "AVAILABLE"}
              className={SELECT_CLASS}
            >
              {Object.entries(STATUS_LABELS).map(([status, label]) => (
                <option key={status} value={status}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field
            name="slug"
            label="URL slug"
            hint="Leave empty to generate from the title"
            state={state}
          >
            <Input id="slug" name="slug" defaultValue={value("slug")} placeholder="auto" />
          </Field>
        </div>
      </Section>

      <Section title="Price">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="price" label="Selling price ($)" state={state}>
            <Input
              id="price"
              name="price"
              type="number"
              min={1}
              step={1}
              inputMode="numeric"
              defaultValue={value("price")}
              required
            />
          </Field>
          <Field
            name="compareAtPrice"
            label="Original price ($)"
            hint="Shown struck through. Leave empty if not discounted"
            state={state}
          >
            <Input
              id="compareAtPrice"
              name="compareAtPrice"
              type="number"
              min={1}
              step={1}
              inputMode="numeric"
              defaultValue={value("compareAtPrice")}
            />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="isSpecial"
            defaultChecked={
              state?.values ? state.values.isSpecial === "on" : (product?.isSpecial ?? false)
            }
            className="size-4 accent-cta"
          />
          Show as Special (ribbon + Special filter)
        </label>
      </Section>

      <Section title="Specs">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field name="capacity" label="Capacity (kg / L)" state={state}>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              step="0.5"
              min={0}
              defaultValue={value("capacity")}
            />
          </Field>
          <Field name="energyRating" label="Energy stars" state={state}>
            <Input
              id="energyRating"
              name="energyRating"
              type="number"
              step="0.5"
              min={0}
              max={10}
              defaultValue={value("energyRating")}
            />
          </Field>
          <Field name="warrantyMonths" label="Warranty (months)" state={state}>
            <Input
              id="warrantyMonths"
              name="warrantyMonths"
              type="number"
              step={1}
              min={1}
              defaultValue={value("warrantyMonths")}
            />
          </Field>
          <Field name="widthCm" label="Width (cm)" state={state}>
            <Input
              id="widthCm"
              name="widthCm"
              type="number"
              step={1}
              min={1}
              defaultValue={value("widthCm")}
            />
          </Field>
          <Field name="heightCm" label="Height (cm)" state={state}>
            <Input
              id="heightCm"
              name="heightCm"
              type="number"
              step={1}
              min={1}
              defaultValue={value("heightCm")}
            />
          </Field>
          <Field name="depthCm" label="Depth (cm)" state={state}>
            <Input
              id="depthCm"
              name="depthCm"
              type="number"
              step={1}
              min={1}
              defaultValue={value("depthCm")}
            />
          </Field>
        </div>
      </Section>

      <Section title="Photos & description">
        <Field name="imageFiles" label="Upload photos" state={state}>
          <ImageDropzone
            name="imageFiles"
            hint={`Resized automatically. Up to ${MAX_UPLOAD_MB}MB per save; added after the URLs below`}
          />
        </Field>
        <Field
          name="images"
          label="Image URLs"
          hint="One per line; the first is the cover. Uploaded photos appear here after saving. Delete a line to remove it"
          state={state}
        >
          <Textarea id="images" name="images" rows={3} defaultValue={value("images")} />
        </Field>
        <Field name="description" label="Description" state={state}>
          <Textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={value("description")}
            required
          />
        </Field>
      </Section>

      <Section title="Admin note">
        <Field name="note" label="Note" hint="Only visible here, never on the shop" state={state}>
          <Textarea id="note" name="note" rows={2} defaultValue={value("note")} />
        </Field>
      </Section>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving…" : product ? "Save changes" : "Create product"}
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href="/admin">Cancel</Link>
        </Button>
        {state && !state.success && (
          <p role="alert" className="text-sm font-medium text-destructive">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
