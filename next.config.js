/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/list',
  '@fullcalendar/timeline'
]);

const nextConfig = withTM({
  reactStrictMode: true,
  images: {
    domains: [
      'via.placeholder.com',
      'res.cloudinary.com',
      'imageflag.s3.eu-west-1.amazonaws.com',
      'profile-back.s3.eu-central-1.amazonaws.com'
    ]
  }
});

module.exports = nextConfig;
