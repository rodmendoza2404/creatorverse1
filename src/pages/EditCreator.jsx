import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../client";

export default function EditCreator() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", url: "", description: "", imageURL: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
      if (error) setErr(error.message);
      else {
        setForm({
          name: data.name ?? "",
          url: data.url ?? "",
          description: data.description ?? "",
          imageURL: data.imageURL ?? "",
        });
      }
      setLoading(false);
    })();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setSaving(true);
    const updates = {
      name: form.name.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      imageURL: form.imageURL.trim() || null,
    };
    const { error } = await supabase.from("creators").update(updates).eq("id", id);
    setSaving(false);
    if (error) setErr(error.message);
    else nav(`/creators/${id}`);
  }

  async function handleDelete() {
  if (!confirm("Delete this creator? This cannot be undone.")) return;
  const { error } = await supabase.from("creators").delete().eq("id", id);
  if (error) alert(error.message);
  else nav("/");
}

  if (loading) return <p>Loading…</p>;

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <h2>Edit Creator</h2>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        URL
        <input name="url" type="url" value={form.url} onChange={handleChange} required />
      </label>
      <label>
        Description
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </label>
      <label>
        Image URL (optional)
        <input name="imageURL" type="url" value={form.imageURL} onChange={handleChange} />
      </label>

      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <div style={{ display: "flex", gap: 12 }}>
  <button type="submit"
    aria-busy={saving}
    style={{ width: "100%" }}
    disabled={saving}
  >
    {saving ? "Saving…" : "Save changes"}
  </button>

  <button
    type="button"
    onClick={handleDelete}
    style={{ width: "100%" }}
  >
    Delete
  </button>
        

        <Link to={`/creators/${id}`}>Cancel</Link>
      </div>
    </form>


  );
}
