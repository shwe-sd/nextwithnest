import api, { withSSRHeaders } from "./client";

// Add an optional second arg for SSR cookies
export const getProductsApi = (params: any, reqCookies?: string) => {
  const fullUrl = api.getUri({ url: "/products", params });
  console.log("[getProductsApi] GET", fullUrl);

  return api.get("/products", {
    params,
    ...withSSRHeaders(reqCookies),
  });
};
