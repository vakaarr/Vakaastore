export async function onRequestGet({ env }) {
  const hasDb = Boolean(env.DB);
  let database = "not_configured";
  if (hasDb) {
    try {
      await env.DB.prepare("SELECT 1").first();
      database = "connected";
    } catch (error) {
      database = "binding_present_but_query_failed";
    }
  }
  return Response.json({
    ok: hasDb && database === "connected",
    service: "Jean Stores API",
    database
  }, {
    status: hasDb && database === "connected" ? 200 : 503,
    headers: { "Cache-Control": "no-store" }
  });
}
