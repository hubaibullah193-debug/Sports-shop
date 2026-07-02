module.exports = {
  siteUrl: process.env.SITE_URL || 'https://elitesports.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 50000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*', '/auth/*', '/dashboard/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/auth', '/dashboard'],
      },
    ],
  },
};
