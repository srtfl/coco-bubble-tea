import React from 'react';

function ContactSection() {
  return (
    <section className="py-16 bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>

        {/* Address */}
        <p className="text-xl mb-6">
          10 Meadow Row, Buckingham, MK18 1PU
        </p>

        {/* Map Embed */}
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2456.3378296397827!2d-0.988372823652156!3d52.00072172454574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876e2be6321308b%3A0x74fd2a9afbc5bc80!2sMeadow%20Row%2C%20Buckingham%20MK18%201PU!5e0!3m2!1sen!2suk!4v1745696926032!5m2!1sen!2suk"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
