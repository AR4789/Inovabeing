"use client";

import { useEffect, useState } from "react";
import api from '../lib/api';


export default function WebhookSettings() {
  const [origin, setOrigin] = useState(null);  // ✅ no <string | null>

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const webhookUrl = origin
    ? `${origin}/api/webhooks/leads.ingest`
    : "https://inova-api-zdfnnfsjza-uc.a.run.app/api/webhooks/leads.ingest";

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl">Webhook Settings</h1>
      <div className="mt-4">
        <div className="mb-2">Webhook URL:</div>
        <div className="p-2 bg-white rounded border">{webhookUrl}</div>

        <div className="mt-4">Sample cURL:</div>
        <pre className="bg-gray-100 p-3 rounded mt-2">
          {`curl -X POST '${webhookUrl}' \\
  -H "Content-Type: application/json" \\
  -H "X-API-KEY: <your-webhook-key>" \\
  -d '{"campaignId":1,"email":"alice@example.com"}'`}
        </pre>
      </div>
    </div>
  );
}
