import { Link } from "react-router-dom";

export default function CreatorCard({ creator }) {
  const { id, name, url, description, imageURL } = creator;

  return (
    <article style={{
      border: "1px solid #eee", borderRadius: 12, padding: 16, display: "grid", gap: 12
    }}>
      {imageURL ? (
        <img
          src={imageURL}
          alt={`${name} preview`}
          style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8 }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      ) : null}
      <div>
        <h3 style={{ margin: "0 0 8px" }}>
          <Link to={`/creators/${id}`} style={{ textDecoration: "none" }}>{name}</Link>
        </h3>
        <p style={{ margin: "0 0 8px" }}>{description}</p>
        <a href={url} target="_blank" rel="noreferrer">Visit channel</a>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Link to={`/creators/${id}/edit`}>Edit</Link>
      </div>
    </article>
  );
}
