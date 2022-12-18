const title = 'liismaiil dashboard - Solution Ludique | memorisation groupe | apprentissage ludique   ';
const description = 'Solution ludique pour apprendre facillement';

const seoConfig = {
  title,
  description,
  canonical: 'https://liismaiil.com/',
  openGraph: {
    url: 'https://liismaiil.com',
    title,
    description,
    images: [
      {
        url: 'https://liismaiil.com/images/og1.jpg',
        width: 800,
        height: 600,
        alt: title,
      },
      {
        url: 'https://liismaiil.com/images/og2.jpg',
        width: 900,
        height: 800,
        alt: title,
      },
    ],
    site_name: 'liismaiil',
  },
  twitter: {
    handle: '@liismaiil',
    site: '@liismaiil',
    cardType: 'summary_large_image',
  },
};
export default seoConfig;
