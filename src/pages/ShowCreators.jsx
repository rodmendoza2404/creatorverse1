import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("id", { ascending: true });
      if (error) setErr(error.message);
      else setCreators(data || []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading creators…</p>;
  if (err) return <p style={{ color: "crimson" }}>Error: {err}</p>;
  if (!creators.length) {
    return (
      <section style={{ display: "grid", gap: 12 }}>
        <p>No creators yet. Add your first one!</p>
        <Link to="/new">+ Add Creator</Link>
      </section>
    );
  }

  return (
    <section style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {creators.map((c) => (
          <CreatorCard key={c.id} creator={c} />
        ))}
      </div>
    </section>
  );
}
