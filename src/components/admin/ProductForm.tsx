"use client";

import Link from "next/link";
import { useActionState, type ReactNode } from "react";

import { upsertProduct } from "@/actions/admin/application/upsert-product";
import { CATEGORY_LABELS, CONDITION_LABELS, STATUS_LABELS } from "@/components/admin/labels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FormState } from "@/common/admin/form-state";
import { MAX_UPLOAD_MB } from "@/common/admin/payload/product.dto";
import ImageDropzone from "@/components/admin/ImageDropzone";
import NativeSelect from "@/components/admin/NativeSelect";
import type { AdminProductDetailResponse } from "@/common/admin/response/product.response";
import { CATEGORIES, CONDITIONS } from "@/lib/catalog";

const SELECT_CLASS =
  "h-8 rounded-lg border-input bg-transparent pl-2.5 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30";

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
      <Section title="기본 정보">
        <Field name="title" label="상품명" state={state}>
          <Input id="title" name="title" defaultValue={value("title")} required />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="brand" label="브랜드" state={state}>
            <Input id="brand" name="brand" defaultValue={value("brand")} required />
          </Field>
          <Field name="model" label="모델명" state={state}>
            <Input id="model" name="model" defaultValue={value("model")} required />
          </Field>
          <Field name="category" label="카테고리" state={state}>
            <NativeSelect
              id="category"
              name="category"
              defaultValue={value("category") || CATEGORIES[0]}
              className={SELECT_CLASS}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {CATEGORY_LABELS[category]}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field name="condition" label="상태 등급" state={state}>
            <NativeSelect
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
            </NativeSelect>
          </Field>
          <Field name="status" label="판매 상태" state={state}>
            <NativeSelect
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
            </NativeSelect>
          </Field>
          <Field
            name="slug"
            label="URL 주소 (slug)"
            hint="비워두면 상품명으로 자동 생성됩니다"
            state={state}
          >
            <Input id="slug" name="slug" defaultValue={value("slug")} placeholder="자동" />
          </Field>
        </div>
      </Section>

      <Section title="가격">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="price" label="판매가 ($)" state={state}>
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
            label="정가 ($)"
            hint="취소선으로 표시됩니다. 할인이 없으면 비워두세요"
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
          특가 상품으로 표시 (리본 + 특가 필터)
        </label>
      </Section>

      <Section title="사양">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field name="capacity" label="용량 (kg / L)" state={state}>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              step="0.5"
              min={0}
              defaultValue={value("capacity")}
            />
          </Field>
          <Field name="energyRating" label="에너지 등급 (별 개수)" state={state}>
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
          <Field name="warrantyMonths" label="보증 기간 (개월)" state={state}>
            <Input
              id="warrantyMonths"
              name="warrantyMonths"
              type="number"
              step={1}
              min={1}
              defaultValue={value("warrantyMonths")}
            />
          </Field>
          <Field name="widthCm" label="너비 (cm)" state={state}>
            <Input
              id="widthCm"
              name="widthCm"
              type="number"
              step={1}
              min={1}
              defaultValue={value("widthCm")}
            />
          </Field>
          <Field name="heightCm" label="높이 (cm)" state={state}>
            <Input
              id="heightCm"
              name="heightCm"
              type="number"
              step={1}
              min={1}
              defaultValue={value("heightCm")}
            />
          </Field>
          <Field name="depthCm" label="깊이 (cm)" state={state}>
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

      <Section title="사진 및 설명">
        <Field name="imageFiles" label="사진 업로드" state={state}>
          <ImageDropzone
            name="imageFiles"
            hint={`자동으로 크기가 조정됩니다. 저장 1회당 최대 ${MAX_UPLOAD_MB}MB, 아래 이미지 URL 뒤에 추가됩니다`}
          />
        </Field>
        <Field
          name="images"
          label="이미지 URL"
          hint="한 줄에 하나씩 입력하며, 첫 번째 이미지가 대표 사진입니다. 업로드한 사진은 저장 후 여기에 표시되고, 줄을 지우면 삭제됩니다"
          state={state}
        >
          <Textarea id="images" name="images" rows={3} defaultValue={value("images")} />
        </Field>
        <Field name="description" label="상품 설명" state={state}>
          <Textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={value("description")}
            required
          />
        </Field>
      </Section>

      <Section title="관리자 메모">
        <Field
          name="note"
          label="메모"
          hint="관리자 화면에서만 보이며 쇼핑몰에는 표시되지 않습니다"
          state={state}
        >
          <Textarea id="note" name="note" rows={2} defaultValue={value("note")} />
        </Field>
      </Section>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "저장 중…" : product ? "변경사항 저장" : "상품 등록"}
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href="/admin">취소</Link>
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
