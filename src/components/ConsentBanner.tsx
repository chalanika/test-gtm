interface ConsentBannerProps {
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

export function ConsentBanner({
  onAcceptAll,
  onRejectAll,
}: ConsentBannerProps) {
  return (
    <div className="consent-banner">
      <div className="consent-content">
        <div className="consent-text">
          <h3>🍪 Cookie Consent</h3>
          <p>
            We use cookies to enhance your browsing experience, analyze site
            traffic, and personalize content. By clicking "Accept All", you
            consent to our use of cookies.
          </p>
          <p className="consent-details">
            <strong>Necessary:</strong> Essential for website functionality
            <br />
            <strong>Statistics:</strong> Help us understand how you use our site
            <br />
            <strong>Marketing:</strong> Used to deliver relevant advertisements
          </p>
        </div>
        <div className="consent-buttons">
          <button className="btn-reject" onClick={onRejectAll}>
            Reject All
          </button>
          <button className="btn-accept" onClick={onAcceptAll}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
