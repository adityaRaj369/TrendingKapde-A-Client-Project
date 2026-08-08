import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="py-32 text-center label text-ash">Loading shop…</div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
