import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function AddCreator() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", url: "", description: "", imageURL: "" });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      imageURL: form.imageURL.trim() || null,
    };
    const { data, error } = await supabase.from("creators").insert([payload]).select().single();
    setSaving(false);
    if (error) setErr(error.message);
    else nav(`/creators/${data.id}`);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <h2>Add Creator</h2>
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
      <button disabled={saving}>{saving ? "Saving…" : "Save"}</button>
    </form>
  );
}
