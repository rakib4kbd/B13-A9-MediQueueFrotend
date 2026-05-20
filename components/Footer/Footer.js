const Footer = () => {
  return (
    <div className="bg-base-300 pt-10">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-5 py-10 justify-between">
          <div className="flex flex-col gap-5 text-center md:text-start">
            <p className="text-xl font-semibold text-primary/75">MediQueue</p>
            <p className="text-sm text-muted-foreground">
              Dedicated to providing professional medical tutoring that bridges
              the gap between students and academic excellence.
            </p>
            <p className="sm">© 2024 MediQueue. Professional Tutoring.</p>
          </div>
          <div className="text-sm text-center flex flex-col md:flex-row gap-6 md:gap-15">
            <div>
              <h1 className="text-xl text-primary/75 mb-2">Services</h1>
              <ul className="flex flex-col gap-2">
                <li>Learning Service</li>
                <li>Book a Tutor</li>
                <li>Academic Support</li>
              </ul>
            </div>
            <div>
              <h1 className="text-xl text-primary/75 mb-2">Social</h1>
              <ul className="flex flex-col gap-2">
                <li>X</li>
                <li>Instagram</li>
                <li>LinkedIn</li>
              </ul>
            </div>
            <div>
              <h1 className="text-xl text-primary/75 mb-2">Legal</h1>
              <ul className="flex flex-col gap-2">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
