// Lightweight per-page SEO helper for the SPA (sets/updates <head> tags).

const SITE_URL = "https://dbnt.studio";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/dbnt-banner.png`;
const LINKEDIN_URL = "https://www.linkedin.com/in/deborahbaeten/";

const BASE_KEYWORDS = [
  "Deborah Baeten",
  "DBNT",
  "grafisch designer",
  "grafisch vormgever",
  "portfolio",
  "Grafisch Design",
  "Logo's ontwerpen",
  "logo ontwerp",
  "branding",
  "huisstijl",
  "visuele identiteit",
  "freelance grafisch designer",
  "Peer",
  "Limburg",
  "België",
];

const setNamedMeta = (name, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setPropMeta = (property, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  if (!href) return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export const stripHtml = (html, max = 160) => {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const text = (tmp.textContent || tmp.innerText || "").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max - 1).trimEnd() + "…" : text;
};

export const setArticleSEO = ({ title, description, keywords = [], image, url }) => {
  const fullTitle = title ? `${title} | DBNT — Design Beyond Normal Thinking` : "DBNT";
  const allKeywords = Array.from(new Set([...(keywords || []), ...BASE_KEYWORDS]));
  const desc =
    description ||
    "Grafisch design, logo's ontwerpen en branding door DBNT in Peer, Limburg, België.";

  document.title = fullTitle;
  setNamedMeta("description", desc);
  setNamedMeta("keywords", allKeywords.join(", "));
  setNamedMeta("author", "Deborah Baeten — DBNT");
  setNamedMeta(
    "robots",
    "index, follow, max-image-preview:large, max-snippet:-1"
  );

  const ogImage = image || DEFAULT_OG_IMAGE;

  // Open Graph
  setPropMeta("og:type", "article");
  setPropMeta("og:site_name", "DBNT — Design Beyond Normal Thinking");
  setPropMeta("og:title", fullTitle);
  setPropMeta("og:description", desc);
  setPropMeta("og:locale", "nl_BE");
  setPropMeta("og:image", ogImage);
  if (url) setPropMeta("og:url", url);

  // Twitter
  setNamedMeta("twitter:card", "summary_large_image");
  setNamedMeta("twitter:title", fullTitle);
  setNamedMeta("twitter:description", desc);
  setNamedMeta("twitter:image", ogImage);

  if (url) setCanonical(url);

  // JSON-LD structured data
  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: title || "DBNT",
    name: title || "DBNT",
    description: desc,
    image: [ogImage],
    keywords: allKeywords.join(", "),
    author: {
      "@type": "Person",
      name: "Deborah Baeten",
      url: SITE_URL,
      sameAs: [LINKEDIN_URL],
    },
    creator: { "@type": "Person", name: "Deborah Baeten" },
    publisher: {
      "@type": "Organization",
      name: "DBNT — Design Beyond Normal Thinking",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/dbnt-logo.png`,
      },
      areaServed: "Peer, Limburg, België",
      sameAs: [LINKEDIN_URL],
    },
    mainEntityOfPage: url || undefined,
    inLanguage: "nl-BE",
  };
  let script = document.getElementById("article-jsonld");
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "article-jsonld";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(ld);
};

export const setHomeSEO = () => {
  const title = "Deborah Baeten — Grafisch Designer & Branding | DBNT";
  const desc =
    "Portfolio van Deborah Baeten (DBNT), freelance grafisch designer uit Peer, Limburg (België). Logo's ontwerpen, huisstijl, branding en visuele identiteit — Design Beyond Normal Thinking.";
  const url =
    typeof window !== "undefined" ? `${window.location.origin}/` : "https://dbnt.studio/";

  document.title = title;
  setNamedMeta("description", desc);
  setNamedMeta("keywords", BASE_KEYWORDS.join(", "));
  setNamedMeta("author", "Deborah Baeten — DBNT");
  setNamedMeta(
    "robots",
    "index, follow, max-image-preview:large, max-snippet:-1"
  );
  setNamedMeta("geo.region", "BE-VLI");
  setNamedMeta("geo.placename", "Peer, Limburg, België");
  setNamedMeta("geo.position", "51.1306;5.4581");
  setNamedMeta("ICBM", "51.1306, 5.4581");

  setPropMeta("og:type", "website");
  setPropMeta("og:site_name", "DBNT — Design Beyond Normal Thinking");
  setPropMeta("og:title", title);
  setPropMeta("og:description", desc);
  setPropMeta("og:locale", "nl_BE");
  setPropMeta("og:url", url);
  setPropMeta("og:image", DEFAULT_OG_IMAGE);

  setNamedMeta("twitter:card", "summary_large_image");
  setNamedMeta("twitter:title", title);
  setNamedMeta("twitter:description", desc);
  setNamedMeta("twitter:image", DEFAULT_OG_IMAGE);

  setCanonical(url);

  const ld = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "DBNT — Deborah Baeten",
    alternateName: "DBNT",
    description: desc,
    url,
    logo: `${SITE_URL}/assets/dbnt-logo.png`,
    image: DEFAULT_OG_IMAGE,
    email: "deborah@dbnt.studio",
    slogan: "Design Beyond Normal Thinking",
    sameAs: [LINKEDIN_URL],
    areaServed: ["Peer", "Limburg", "België", "Vlaanderen"],
    geo: { "@type": "GeoCoordinates", latitude: 51.1306, longitude: 5.4581 },
    knowsAbout: [
      "Grafisch design",
      "Logo ontwerp",
      "Branding",
      "Huisstijl",
      "Visuele identiteit",
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Logo-ontwerp" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Huisstijl & branding" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Visuele identiteit" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Grafisch design (print & digitaal)" } },
    ],
    founder: {
      "@type": "Person",
      name: "Deborah Baeten",
      jobTitle: "Grafisch Designer",
      sameAs: [LINKEDIN_URL],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Peer",
        addressRegion: "Limburg",
        addressCountry: "BE",
      },
      email: "deborah@dbnt.studio",
    },
    inLanguage: "nl-BE",
  };
  let script = document.getElementById("article-jsonld");
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "article-jsonld";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(ld);
};

export const resetSEO = () => {
  document.title = "DBNT — Design Beyond Normal Thinking";
  setNamedMeta(
    "description",
    "Grafisch design, logo's ontwerpen en branding door DBNT in Peer, Limburg, België."
  );
  setNamedMeta("keywords", BASE_KEYWORDS.join(", "));
  const script = document.getElementById("article-jsonld");
  if (script) script.remove();
};
