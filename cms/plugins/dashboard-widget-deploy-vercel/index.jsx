import { DashboardWidgetContainer } from "@sanity/dashboard";
import React, { useState, useEffect, useRef } from "react";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
const DeployVercel = () => {
  const [deploying, setDeploying] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [deployments, setDeployments] = useState([]);
  const updateList = () => {
    // https://vercel.com/docs/api?query=api#endpoints/deployments/list-deployments
    fetch("https://api.vercel.com/v5/now/deployments?limit=5", {
      headers: {
        Authorization: `Bearer ${process.env.SANITY_STUDIO_VERCEL_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((json) => setDeployments(json.deployments));
  };
  useEffect(() => {
    updateList();
  }, []); // update the list initially
  useInterval(() => {
    if (!jobId) {
      return;
    }
    updateList();
  }, 5000);
  const deploy = () => {
    setDeploying(true);
    // https://vercel.com/docs/v2/more/deploy-hooks?query=deploy%20hoo#triggering-a-deploy-hook
    fetch(process.env.SANITY_STUDIO_VERCEL_DEPLOY_HOOK, { method: "POST" })
      .then((res) => res.json())
      .then((json) => {
        setJobId(json.job.id);
        updateList();
      });
  };
  return (
    <DashboardWidgetContainer
      header="Deploy to vercel"
      footer={
        <button type="button" onClick={deploy} disabled={deploying}>
          {deploying ? "Deploying..." : "Deploy"}
        </button>
      }
    >
      <ol>
        {deployments &&
          deployments.map((deployment) => (
            <li key={deployment.uid}>
              <p>
                {new Date(deployment.created).toLocaleString()} (
                {deployment.state})
              </p>
            </li>
          ))}
      </ol>
    </DashboardWidgetContainer>
  );
};

export function deployVercelWidget(config = {}) {
  return {
    name: "Deploy site",
    component: DeployVercel,
    layout: config.layout ?? { width: "medium" },
  };
}
