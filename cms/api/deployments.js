// Vercel Serverless Function: proxies the Vercel deployments list so the
// Vercel API token stays server-side and is never bundled into the Studio's
// client-side JavaScript.
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    console.error("VERCEL_TOKEN is not configured");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  try {
    const response = await fetch(
      "https://api.vercel.com/v6/deployments?limit=5",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      console.error("Vercel API error", response.status, await response.text());
      return res
        .status(502)
        .json({ error: "Failed to fetch deployments from Vercel" });
    }

    const json = await response.json();
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ deployments: json.deployments ?? [] });
  } catch (error) {
    console.error("Failed to fetch deployments", error);
    return res.status(502).json({ error: "Failed to fetch deployments" });
  }
}
