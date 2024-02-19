// next.config.js
module.exports = {
    images: {
        minimumCacheTTL: 31536000,
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
};
