import type { MetadataRoute } from "next";

const BASE = "https://jjfilms.studio";

const routes = [
  { url: "/",                    priority: 1.0,  changeFrequency: "monthly"  },
  { url: "/real-estate",         priority: 0.9,  changeFrequency: "monthly"  },
  { url: "/wedding-films",       priority: 0.9,  changeFrequency: "monthly"  },
  { url: "/product-photography", priority: 0.9,  changeFrequency: "monthly"  },
  { url: "/about",               priority: 0.8,  changeFrequency: "monthly"  },
  { url: "/gallery",             priority: 0.8,  changeFrequency: "weekly"   },
  { url: "/journal",             priority: 0.6,  changeFrequency: "weekly"   },
  { url: "/contact",             priority: 0.7,  changeFrequency: "yearly"   },
  { url: "/privacy",             priority: 0.3,  changeFrequency: "yearly"   },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
