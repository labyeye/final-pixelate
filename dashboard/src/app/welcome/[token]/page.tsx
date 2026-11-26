import { openWelcome, BRAND } from "@/lib/welcome";

export const dynamic = "force-dynamic";
export const metadata = { title: "Your Welcome Card | Pixelate Nest", robots: "noindex" };

const LOGO = "/assets/images/Logo_Color_Name_Large.png";

// Public page: pure-CSS animation (checkbox toggle) so it needs no client JS.
export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const w = openWelcome((await params).token);
  if (!w)
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "sans-serif", padding: 24, textAlign: "center" }}>
        <p>This card has expired. Please ask Pixelate Nest to resend it.</p>
      </main>
    );
  return (
    <main className="wc">
      <style>{css}</style>
      <input id="open" type="checkbox" />
      <div className="env">
        <label htmlFor="open" className="tap" aria-label="Open your card" />
        <div className="flap" />
        <div className="body" />
        <div className="seal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Pixelate Nest" />
        </div>
        <div className="card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="clogo" src={LOGO} alt="Pixelate Nest" />
          <p className="k">WELCOME TO {w.product.toUpperCase()}</p>
          <h1>Hello {w.name},</h1>
          <p className="sub">Your account is ready. Here are your details:</p>
          <div className="box">
            {w.company && (<><span>Company</span><b>{w.company}</b></>)}
            {w.phone && (<><span>Phone</span><b>{w.phone}</b></>)}
            <span>Login</span>
            <b>{w.email}</b>
            <span>Password</span>
            <b>{w.password}</b>
          </div>
          {w.web && (
            <a className="btn" href={w.web}>
              Go to the app &amp; sign in
            </a>
          )}
          {w.play && (
            <a className="play" href={w.play} aria-label="Get it on Google Play">
              <svg width="26" height="28" viewBox="0 0 26 28" aria-hidden="true">
                <path d="M1 1.5v25c0 .6.6.9 1.1.6l22-12.5c.5-.3.5-.9 0-1.2L2.1.9C1.6.6 1 .9 1 1.5z" fill="#fff" />
                <path d="M1 1.5l14 12.5L1 26.5z" fill="#34a853" />
                <path d="M1 1.5L15 14l4-4L2.1.9C1.6.6 1 .9 1 1.5z" fill="#4285f4" />
                <path d="M1 26.5L15 14l4 4L2.1 27.1c-.5.3-1.1 0-1.1-.6z" fill="#ea4335" />
                <path d="M19 10l5.1 2.8c.5.3.5.9 0 1.2L19 18l-4-4z" fill="#fbbc04" />
              </svg>
              <span><small>GET IT ON</small>Google Play</span>
            </a>
          )}
          <small className="note">Please change your password after your first login.</small>
        </div>
        <div className="hint">Tap the envelope to open</div>
      </div>
    </main>
  );
}

const { blue, navy, orange } = BRAND;
const css = `
.wc{min-height:100vh;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 30%,${blue} 0%,${navy} 70%);font-family:Helvetica,Arial,sans-serif;padding:24px;overflow-x:hidden}
.wc input{display:none}
.tap{position:absolute;inset:0;z-index:6;cursor:pointer}
#open:checked~.env .tap{display:none}
.env{position:relative;width:min(380px,92vw);height:240px;perspective:1000px;transition:transform .9s ease}
.body{position:absolute;inset:0;background:#fff;border-radius:6px;z-index:3;clip-path:polygon(0 0,50% 52%,100% 0,100% 100%,0 100%);box-shadow:0 20px 40px #0005}
.flap{position:absolute;top:0;left:0;right:0;height:125px;background:${blue};transform-origin:top;clip-path:polygon(0 0,100% 0,50% 100%);z-index:4;transition:transform .7s,z-index 0s .35s}
.seal{position:absolute;left:50%;top:138px;transform:translateX(-50%);z-index:5;background:#fff;padding:8px 14px;border-radius:6px;transition:opacity .3s}
.seal img{display:block;width:150px;height:auto}
.card{position:absolute;left:5%;right:5%;bottom:20px;background:#fff;border-radius:8px;border-top:5px solid ${orange};padding:20px 22px 18px;z-index:2;color:#1a2233;opacity:0;transition:bottom 1s .55s ease,opacity .4s .5s;box-shadow:0 14px 34px #0006}
.clogo{display:block;width:150px;height:auto;margin:0 auto 10px}
.card .k{margin:0;font-size:11px;letter-spacing:2px;color:${orange};font-weight:bold;text-align:center}
.card h1{margin:6px 0 2px;font-size:23px;color:${blue};text-align:center}
.card .sub{margin:0 0 4px;font-size:13px;color:#667;text-align:center}
.box{background:#f2f6fc;border:1px solid #d6e0f2;border-radius:6px;padding:8px 12px;margin:10px 0;font-size:13px;word-break:break-all}
.box span{display:block;font-size:10px;color:#7a869a;letter-spacing:1px;text-transform:uppercase;margin-top:6px}
.box span:first-child{margin-top:0}
.btn{display:block;text-align:center;background:${blue};color:#fff;text-decoration:none;font-weight:bold;padding:12px;border-radius:6px;margin-top:4px}
.play{display:flex;align-items:center;justify-content:center;gap:10px;background:#000;color:#fff;text-decoration:none;padding:8px 14px;border-radius:7px;margin-top:10px;border:1px solid #666}
.play span{font-size:17px;font-weight:bold;line-height:1.05}.play small{display:block;font-size:9px;letter-spacing:1px;font-weight:normal;margin:0}
.card .note{display:block;margin-top:10px;font-size:11px;color:#8a93a5;text-align:center}
.hint{position:absolute;bottom:-44px;width:100%;text-align:center;color:#c7d6f3;font-size:13px;letter-spacing:.5px;transition:opacity .3s}
#open:checked~.env{transform:translateY(max(110px,calc(615px - 50vh)))}
#open:checked~.env .flap{transform:rotateX(180deg);z-index:1}
#open:checked~.env .card{bottom:195px;opacity:1}
#open:checked~.env .hint{opacity:0}
`;
