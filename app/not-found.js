import Link from "next/link";

export default function NotFound() {
  return (
    <main id="top">
      <section className="hero">
        <div className="hero-main">
          <h1>Page not found</h1>
          <p className="hero-role">That page doesn’t exist, or it has moved.</p>
          <p className="hero-links">
            <Link href="/">Back to home</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
