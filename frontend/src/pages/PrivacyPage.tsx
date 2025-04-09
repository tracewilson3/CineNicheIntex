import CineNicheHeader from "../components/CineNicheHeader";
import "../css/PrivacyPage.css";

const PrivacyPolicy = () => {
  return (
    <div className="container">
      <CineNicheHeader />
      <div className="privacy-page d-flex align-items-center justify-content-center">
        <div className="text-center px-3 py-5" style={{ maxWidth: "900px" }}>
          <h1 className="mb-3">Privacy Policy</h1>
          <p className="mb-5 fst-italic">Last updated: April 7, 2025</p>

          <p>
            At <strong>CineNiche</strong>, we are committed to protecting your personal data and
            your right to privacy. This policy explains what information we collect, how we use it,
            your rights under data protection laws including the General Data Protection Regulation
            (GDPR), and how you can contact us with any questions.
          </p>

          <h2 className="mt-5">1. Who We Are</h2>
          <p>
            CineNiche is a streaming service offering curated, hard-to-find content including cult
            classics, indie films, international cinema, and niche documentaries. We are based in
            Provo, Utah, and serve a global audience.
          </p>

          <h2 className="mt-5">2. What Data We Collect</h2>
          <ul className="text-start mx-auto" style={{ maxWidth: "700px" }}>
            <li>
              <strong>Account Information:</strong> Name, email, and password (encrypted)
            </li>
            <li>
              <strong>Usage Data:</strong> Viewing history, search queries, interaction with UI
            </li>
            <li>
              <strong>Device Info:</strong> IP address, browser type, device model, OS
            </li>
            <li>
              <strong>Payment Data:</strong> If applicable, billing info (handled by secure third
              parties)
            </li>
            <li>
              <strong>Cookies & Tracking:</strong> Session info, preferences, optional analytics
              (with consent)
            </li>
          </ul>

          <h2 className="mt-5">3. How We Use Your Data</h2>
          <ul className="text-start mx-auto" style={{ maxWidth: "700px" }}>
            <li>To deliver and improve our streaming service</li>
            <li>To personalize your experience with recommendations</li>
            <li>To provide customer support and respond to inquiries</li>
            <li>To detect, prevent, or investigate security breaches or fraud</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="mt-5">4. Legal Basis for Processing (GDPR)</h2>
          <ul className="text-start mx-auto" style={{ maxWidth: "700px" }}>
            <li>
              <strong>Consent:</strong> For optional cookies and marketing communication
            </li>
            <li>
              <strong>Contract:</strong> To fulfill our agreement when you sign up for an account
            </li>
            <li>
              <strong>Legitimate Interests:</strong> Improving our services and ensuring security
            </li>
            <li>
              <strong>Legal Obligations:</strong> Compliance with tax, fraud, and regulatory laws
            </li>
          </ul>

          <h2 className="mt-5">5. Data Sharing and Third Parties</h2>
          <p>
            We do not sell your personal data. We may share data with trusted third parties
            including:
          </p>
          <ul className="text-start mx-auto" style={{ maxWidth: "700px" }}>
            <li>Cloud hosting and storage providers</li>
            <li>Analytics tools (e.g., Google Analytics — only with consent)</li>
            <li>Payment processors</li>
            <li>Customer support platforms</li>
            <li>Authorities, if required by law</li>
          </ul>

          <h2 className="mt-5">6. International Data Transfers</h2>
          <p>
            CineNiche operates in the United States. If you access our services from the EU or other
            regions with data protection laws, we ensure safeguards (e.g., Standard Contractual
            Clauses) for any cross-border data transfers.
          </p>

          <h2 className="mt-5">7. Your Rights Under GDPR</h2>
          <ul className="text-start mx-auto" style={{ maxWidth: "700px" }}>
            <li>Access the data we hold about you</li>
            <li>Correct or update your data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent at any time</li>
            <li>Restrict or object to certain processing</li>
            <li>Port your data to another provider</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a className="privacy-link" href="mailto:privacy@cineniche.dev">
              privacy@cineniche.dev
            </a>
          </p>

          <h2 className="mt-5">8. Cookies</h2>
          <p>
            We use essential cookies for site functionality and optional cookies for analytics and
            personalization. You will be prompted for consent on your first visit. You can change
            your cookie settings at any time in your browser.
          </p>

          <h2 className="mt-5">9. Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary to fulfill the purposes outlined
            in this policy or as required by law. Inactive accounts may be deleted after a set
            period.
          </p>

          <h2 className="mt-5">10. Security</h2>
          <p>
            We implement reasonable technical and organizational safeguards to protect your data,
            including encryption, access control, and monitoring systems.
          </p>

          <h2 className="mt-5">11. Contact Information</h2>
          <p>
            If you have questions, concerns, or complaints regarding your privacy or this policy,
            contact us at:
          </p>
          <p>
            <strong>CineNiche Privacy Team</strong>
            <br />
            Email:{" "}
            <a className="privacy-link" href="mailto:privacy@cineniche.dev">
              privacy@cineniche.dev
            </a>
            <br />
            Location: Provo, Utah, USA
          </p>

          <a href="/" className="btn btn-danger mt-4">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
