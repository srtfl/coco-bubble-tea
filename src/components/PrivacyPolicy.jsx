// src/components/PrivacyPolicy.js
import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="p-8 pt-24 max-w-3xl mx-auto text-black bg-white">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        We are committed to protecting your privacy. This policy explains how we handle your data.
      </p>
      <h2 className="text-xl font-semibold mt-6">Data Collection</h2>
      <p className="mb-4">
        We collect data to process orders and improve services. This includes email, name, and order history.
      </p>
      <h2 className="text-xl font-semibold mt-6">Your Rights</h2>
      <p className="mb-4">
        Under GDPR, you can request access to your data or ask us to delete it at any time.
      </p>
      <h2 className="text-xl font-semibold mt-6">Cookies</h2>
      <p className="mb-4">
        We use essential cookies to run the site and optional ones for analytics only with your consent.
      </p>
      <p>
        For any questions, email us at <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a>.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
