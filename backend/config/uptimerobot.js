/**
 * Internal Uptime Robot
 * Pings the server automatically to prevent it from going to sleep on free hosting tiers (like Render or Koyeb).
 */
import https from "https";
import http from "http";

export const startUptimeRobot = (url) => {
  if (!url) return;

  // Choose http or https based on the URL
  const client = url.startsWith("https") ? https : http;

  // Ping exactly every 14 minutes (Render sleeps after 15 mins)
  const INTERVAL = 14 * 60 * 1000; 

  console.log(`🤖 UptimeRobot initialized. Pinging ${url} every 14 minutes.`);

  setInterval(() => {
    client.get(url, (res) => {
      console.log(`[UptimeRobot] Pinged ${url} - Status: ${res.statusCode}`);
    }).on("error", (err) => {
      console.error(`[UptimeRobot] Error pinging server: ${err.message}`);
    });
  }, INTERVAL);
};
