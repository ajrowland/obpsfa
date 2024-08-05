import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dashboardTool } from "@sanity/dashboard";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { table } from "@sanity/table";
import { structure, defaultDocumentNode } from "./structure";
import { schemaTypes } from "./schemas/schema";
import { deployVercelWidget } from "./plugins/dashboard-widget-deploy-vercel";

export default defineConfig({
  name: "obpsfa",
  title: "OBPSFA",
  projectId: "7caqi88y",
  dataset: "production",
  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    dashboardTool({ widgets: [deployVercelWidget()] }),
    visionTool(),
    colorInput(),
    table(),
  ],
  schema: {
    types: schemaTypes,
  },
  /*
  parts: [
    {
      implements: "part:@sanity/production-preview/resolve-production-url",
      path: "./resolveProductionUrl.js",
    },
  ],
  */
});
