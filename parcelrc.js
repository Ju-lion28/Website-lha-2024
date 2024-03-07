// Parcel Config File

module.exports = {
    extends: '@parcel/config-default',

    entries: ['index.html'],
    defaultTargetOptions: {
      distDir: 'dist',
      sourceMaps: false,
    },
  
    optimizers: {
      '*.{jpg,jpeg,png,gif}': ['sharp'],
      '*.svg': ['@parcel/optimizer-svgo'], 
    },
  
    compressors: {
      '*.{html,css,js,svg,map}': [
        '@parcel/compressor-gzip',
        '@parcel/compressor-brotli',
      ],
    }
}