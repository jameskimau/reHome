"use client";

import { useState, useTransition } from "react";

import { deleteProduct } from "@/actions/admin/application/delete-product";
import { Button } from "@/components/ui/button";

// Two-step confirm in place of window.confirm(): the first click arms, the second deletes.
const DeleteProductButton = ({ id }: { id: string }) => {
  const [armed, setArmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    if (!armed) {
      setArmed(true);
      return;
    }
    startTransition(async () => {
      // Redirects to /admin on success, so only failures come back.
      const result = await deleteProduct({ id });
      setError(result.message);
      setArmed(false);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button type="button" variant="destructive" disabled={pending} onClick={handleClick}>
        {pending ? "삭제 중…" : armed ? "한 번 더 누르면 삭제됩니다" : "상품 삭제"}
      </Button>
      {armed && !pending && (
        <Button type="button" variant="ghost" onClick={() => setArmed(false)}>
          취소
        </Button>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default DeleteProductButton;
