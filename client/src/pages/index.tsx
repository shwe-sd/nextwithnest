// pages/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getProductsApi } from "@/api/products";
import { Product } from "@/types/products";
import SelectField from "@/components/ui/SelectField";
import ProductCard from "@/components/ui/ProductCard";

// Keep the same filter shape (required fields; "" = All)
type Filters = {
  shop_name: string;
  shop_type: "mall" | "preferred" | "";
  sort_type: "latest_updated" | "high_commission" | "";
  country:
    | "Malaysia"
    | "Singapore"
    | "Indonesia"
    | "Thailand"
    | "Vietnam"
    | "Philippines"
    | "Taiwan"
    | "";
};

// const DEFAULT_FILTERS: Filters = {
//   shop_name: "",
//   shop_type: "",
//   sort_type: "",
//   country: "",
// };

type PageProps = {
  products: Product[];
  filters: Filters;
};

export default function ProductFeedPage(PageProps: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  // Build a safe initial filters object even if props are missing
  const initialFilters = useMemo<Filters>(() => {
    return {
      shop_name: PageProps.filters?.shop_name ?? "",
      shop_type: (PageProps.filters?.shop_type as Filters["shop_type"]) ?? "",
      sort_type: (PageProps.filters?.sort_type as Filters["sort_type"]) ?? "",
      country: (PageProps.filters?.country as Filters["country"]) ?? "",
    };
  }, [PageProps.filters]);

  // Local state mirrors SSR props for controlled inputs
  const [localFilters, setLocalFilters] = useState<Filters>(initialFilters);

  // Keep local state in sync when SSR filters change (e.g., after URL updates)
  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const next = { ...localFilters, [name]: value } as Filters;
    setLocalFilters(next);
    // Push query -> triggers SSR with new filters
    router.push(
      { pathname: router.pathname, query: next },
      undefined,
      { shallow: false }
    );
  };

  return (
    <>
      <Head>
        <title>Product Feed</title>
      </Head>

      <h1 className="text-4xl font-bold text-center mb-8">Product Feed</h1>

      {/* Filter Section (UI unchanged) */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Shop Name</label>
          <input
            type="text"
            name="shop_name"
            value={localFilters.shop_name}
            onChange={handleFilterChange}
            placeholder="e.g., Mobile"
            className="appearance-none border rounded-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <SelectField
          label="Shop Type"
          name="shop_type"
          value={localFilters.shop_type}
          onChange={handleFilterChange}
          options={[
            { value: "", label: "All" },
            { value: "mall", label: "Mall" },
            { value: "preferred", label: "Preferred" },
          ]}
        />

        <SelectField
          label="Sort By"
          name="sort_type"
          value={localFilters.sort_type}
          onChange={handleFilterChange}
          options={[
            { value: "", label: "All" },
            { value: "high_commission", label: "High Commission" },
            { value: "latest_updated", label: "Latest Updated" },
          ]}
        />

        <SelectField
          label="Country"
          name="country"
          value={localFilters.country}
          onChange={handleFilterChange}
          options={[
            { value: "", label: "All" },
            { value: "Malaysia", label: "Malaysia" },
            { value: "Singapore", label: "Singapore" },
            { value: "Indonesia", label: "Indonesia" },
            { value: "Thailand", label: "Thailand" },
            { value: "Vietnam", label: "Vietnam" },
          ]}
        />

        {/* <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
          <select
            name="country"
            value={localFilters.country}
            onChange={handleFilterChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">All</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Singapore">Singapore</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Thailand">Thailand</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Philippines">Philippines</option>
            <option value="Taiwan">Taiwan</option>
          </select>
        </div> */}
      </div>

      {/* Products grid (UI unchanged) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PageProps.products.length ? (
          PageProps.products.map((product) => (
            <ProductCard key={product.shop_id} product={product} />
          ))
        ) : (
          <div className="text-center mt-8 text-gray-500">No products found.</div>
        )}
      </div>
    </>
  );
}

// ---- Full SSR for every request & filter change ----
export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req,
  res,
  query,
}) => {
  // Auth guard via cookie (consistent with your 'token' cookie name)
  const cookieHeader = req.headers.cookie ?? "";
  const isAuthed = /(^|;\s*)token=/.test(cookieHeader);
  if (!isAuthed) {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }

  // for SSR, disabling caching data
  res.setHeader("Cache-Control", "no-store");

  // Helper to coerce query values to strings with "" fallback
  const toStr = (v: string | string[] | undefined) =>
    (Array.isArray(v) ? v[0] : v) ?? "";

  // Parse filters from query with safe fallbacks (always defined)
  const filters: Filters = {
    shop_name: toStr(query.shop_name),
    shop_type: (toStr(query.shop_type) as Filters["shop_type"]) || "",
    sort_type: (toStr(query.sort_type) as Filters["sort_type"]) || "",
    country: (toStr(query.country) as Filters["country"]) || "",
  };

  // Server-side fetch using your existing API (single-arg signature)
  const apiRes = await getProductsApi(filters, req.headers.cookie);
  const products: Product[] = apiRes?.data?.data?.data ?? [];

  return { props: { products, filters } };
};
