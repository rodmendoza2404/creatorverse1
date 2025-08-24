import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

export default function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single(); // expects exactly one row
      if (error) setErr(error.message);
      else setCreator(data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (err) return <p style={{ color: "crimson" }}>Error: {err}</p>;
  if (!creator) return <p>Creator not found.</p>;

  return (
    <article style={{ display: "grid", gap: 12 }}>
      <h2 style={{ marginBottom: 0 }}>{creator.name}</h2>
      <a href={creator.url} target="_blank" rel="noreferrer">Visit channel</a>
      <p>{creator.description}</p>
      {creator.imageURL ? (
        <img
          src={creator.imageURL}
          alt={`${creator.name} preview`}
          style={{ width: "100%", maxWidth: 640, borderRadius: 8 }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      ) : null}
      <div style={{ display: "flex", gap: 12 }}>
        <Link to={`/creators/${id}/edit`}>Edit</Link>
        <Link to="/">Back</Link>
      </div>
    </article>
  );
}
