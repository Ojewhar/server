const BASE_URL_CLIENT =
  process.env.NODE_ENV === "production"
    ? "https://www.patient.certnow.com.au"
    : "http://localhost:3000";

// server url
const BASE_URL_SERVER =
  process.env.NODE_ENV === "production"
    ? "https://server-psi-eight-67.vercel.app"
    : "http://localhost:5000";
module.exports = { BASE_URL_SERVER, BASE_URL_CLIENT };
