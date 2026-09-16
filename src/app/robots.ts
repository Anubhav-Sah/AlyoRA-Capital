import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/contentChange/", "/api/"],
      },
    ],
    sitemap: "https://www.alyoracapital.in/sitemap.xml",
  };
}
