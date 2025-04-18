import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          fa: `${baseUrl}/fa`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/about`,
          fa: `${baseUrl}/fa/about`,
        },
      },
    },
    {
      url: `${baseUrl}/how-to-play`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/how-to-play`,
          fa: `${baseUrl}/fa/how-to-play`,
        },
      },
    },
    {
      url: `${baseUrl}/play`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/play`,
          fa: `${baseUrl}/fa/play`,
        },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog`,
          fa: `${baseUrl}/fa/blog`,
        },
      },
    },
  ];
}
