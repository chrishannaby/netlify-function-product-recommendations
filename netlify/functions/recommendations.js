const { builder } = require("@netlify/functions");
const pathPrefix = /^.+\/recommendations\/?/;

const recommendations = {
  "classic-netlify-sweatshirt": [
    {
      title: "Netlify Rainbow Tee",
      id: "netlify-rainbow-tee",
      href: "/product/netlify-rainbow-tee",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0578/8490/1573/products/Image17_651ae277-d698-45cb-bda5-2f3b2732521f.png?v=1623858526",
    },
    {
      title: "Jamstack Jammies",
      id: "jamjammies",
      href: "/product/jamjammies",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0578/8490/1573/products/Image29.png?v=1623858511",
    },
    {
      title: "Netlify Argyle Socks",
      id: "netlify-socks",
      href: "/product/netlify-socks",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0578/8490/1573/products/Image18_8299875a-5fb1-412e-b614-9db8a779036a.png?v=1623858517",
    },
  ],
  "netlify-mug": [
    {
      title: "Netlify Miir Travel Tumbler",
      id: "netlify-miir-travel-tumbler",
      href: "/product/netlify-miir-travel-tumbler",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0578/8490/1573/products/Image3.png?v=1623858524",
    },
    {
      title: "Gem Water Bottle",
      id: "gem-water-bottle",
      href: "/product/gem-water-bottle",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0578/8490/1573/products/Image1.png?v=1623858506",
    },
    {
      title: "Netlify Totes",
      id: "netlify-totes",
      href: "/product/netlify-totes",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0578/8490/1573/products/Image4.png?v=1623858532",
    },
  ],
};

function getSlug(rawUrl) {
  return rawUrl
    .replace(pathPrefix, "") // remove the function path prefix
    .replace(/\/$/, ""); // remove trailing slash if present
}

async function handler(event) {
  const slug = getSlug(event.rawUrl);
  console.log(slug);
  const recommendation = recommendations[slug];
  console.log(recommendation);
  if (recommendation) {
    return {
      body: JSON.stringify(recommendation),
      statusCode: 200,
      ttl: 60,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } else {
    return {
      body: "Not found",
      statusCode: 404,
      ttl: 60,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
}

exports.handler = builder(handler);
