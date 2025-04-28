export const Map = () => {
    return (
      <div className="flex justify-center mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27212.707979887724!2d74.31377532855317!3d31.520370804419387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190484cc0ef9b9%3A0x5d857b2e8a363c80!2sNew%20Muslim%20Town%2C%20Lahore!5e0!3m2!1sen!2s!4v1714144854142!5m2!1sen!2s"
          width="500"
          height="200"
          className="rounded-lg shadow-lg max-w-5xl"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  };
  