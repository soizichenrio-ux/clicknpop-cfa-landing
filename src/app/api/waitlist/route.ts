import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SOURCE_LEAD = "placeholder_cfa_landing";

// Segmentation acteurs formation 17/05/2026 — schema commercial_leads
// CHECK refactor : 3 segments distincts CFA / OF alternance / CCI-CMA.
// Mapping label UI → code SQL :
const TYPE_STRUCTURE_MAP: Record<string, string> = {
  "CFA classique": "cfa",
  "Organisme de formation alternance": "of_alternance",
  "CCI / Chambre consulaire": "cci_cma",
};

// Rate limit in-memory : 5 requêtes / IP / 60s.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const ipHits = new Map<string, number[]>();

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const window = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (window.length >= RATE_MAX) {
    ipHits.set(ip, window);
    return true;
  }
  window.push(now);
  ipHits.set(ip, window);
  return false;
}

export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "missing_env" }, { status: 500 });
  }

  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anon";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    prenom?: string;
    nom_structure?: string;
    raison_sociale?: string;
    nom_cfa?: string;
    type_structure?: string;
  };

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // Validation type_structure obligatoire (3 segments CFA / OF / CCI).
  const typeLabel = (body.type_structure ?? "").trim();
  const typeLead = TYPE_STRUCTURE_MAP[typeLabel];
  if (!typeLead) {
    return NextResponse.json({ ok: false, error: "invalid_type_structure" }, { status: 400 });
  }

  const prenom = body.prenom?.trim().slice(0, 50) || null;
  // Le nom de la structure est stocké dans la colonne raison_sociale.
  // On accepte les anciens noms de champ pour rétrocompat (nom_cfa legacy).
  const orgName =
    (body.nom_structure ?? body.raison_sociale ?? body.nom_cfa)
      ?.trim()
      .slice(0, 120) || null;

  const sb = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { error } = await sb.from("commercial_leads").insert({
    email,
    prenom,
    raison_sociale: orgName,
    source_lead: SOURCE_LEAD,
    type_lead: typeLead,
  });

  if (error && /unique|duplicate|23505/i.test(error.message)) {
    return NextResponse.json({ ok: true });
  }

  if (error) {
    console.error(`[waitlist:${SOURCE_LEAD}] insert error:`, error.message);
    return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
