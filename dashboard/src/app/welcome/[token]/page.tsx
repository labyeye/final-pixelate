import { openWelcome } from "@/lib/welcome";

export const dynamic = "force-dynamic";
export const metadata = { title: "Your Welcome Card | Pixelate Nest", robots: "noindex" };

// Public page: pure-CSS animation (checkbox toggle) so it needs no client JS.
export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const w = openWelcome((await params).token);
  if (!w)
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "sans-serif" }}>
        <p>This card has expired. Please ask Pixelate Nest to resend it.</p>
      </main>
    );
  return (
    <main className="wc">
      <style>{css}</style>
      <input id="open" type="checkbox" />
      <label htmlFor="open" className="env">
        <div className="flap" />
        <div className="body" />
        <div className="card">
          <p className="k">WELCOME TO {w.product.toUpperCase()}</p>
          <h1>Hello {w.name},</h1>
          <p>Your account is ready. Sign in with:</p>
          <div className="box">
            <span>Login</span>
            <b>{w.email}</b>
            <span>Password</span>
            <b>{w.password}</b>
          </div>
          {w.loginUrl && (
            <a href={w.loginUrl} onClick={(e) => e.stopPropagation()}>
              Sign in to {w.product}
            </a>
          )}
          <small>Please change your password after your first login.</small>
        </div>
        <div className="hint">Tap the envelope to open</div>
      </label>
    </main>
  );
}

const css = `
.wc{min-height:100vh;display:grid;place-items:center;background:#1a1a1a;font-family:Helvetica,Arial,sans-serif;padding:20px}
.wc input{display:none}
.env{position:relative;width:min(340px,90vw);height:230px;cursor:pointer;perspective:900px;margin-top:240px}
.body{position:absolute;inset:0;background:#f3d9a4;border-radius:6px;z-index:3;clip-path:polygon(0 0,50% 55%,100% 0,100% 100%,0 100%)}
.flap{position:absolute;top:0;left:0;right:0;height:130px;background:#e6c27c;transform-origin:top;clip-path:polygon(0 0,100% 0,50% 100%);z-index:4;transition:transform .7s,z-index 0s .35s}
.card{position:absolute;left:5%;right:5%;top:8px;background:#fff;border-radius:6px;padding:22px;z-index:2;color:#1a1a1a;transition:transform 1s .6s ease;box-shadow:0 10px 30px #0006}
.card .k{margin:0;font-size:11px;letter-spacing:2px;color:#ff640d;font-weight:bold}
.card h1{margin:6px 0;font-size:22px}.card p{margin:4px 0;font-size:14px;color:#555}
.box{background:#f6f7f9;border:1px solid #ddd;border-radius:4px;padding:10px 12px;margin:12px 0;font-size:13px;word-break:break-all}
.box span{display:block;font-size:10px;color:#888;letter-spacing:1px;text-transform:uppercase;margin-top:4px}
.card a{display:block;text-align:center;background:#1a1a1a;color:#fff;text-decoration:none;font-weight:bold;padding:11px;border-radius:4px;margin-top:6px}
.card small{display:block;margin-top:10px;font-size:11px;color:#999}
.hint{position:absolute;bottom:-40px;width:100%;text-align:center;color:#aaa;font-size:13px;transition:opacity .3s}
#open:checked~.env .flap{transform:rotateX(180deg);z-index:1}
#open:checked~.env .card{transform:translateY(-250px)}
#open:checked~.env .hint{opacity:0}
`;
