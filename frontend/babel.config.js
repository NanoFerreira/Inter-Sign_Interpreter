module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'react-native-iconify/babel',
      {
        icons: [
          'mdi:map-marker-outline',
          'mdi:heart-outline',
          'material-symbols-light:star-outline',
          'material-symbols-light:map-outline',
          'ep:arrow-down',
          'material-symbols-light:star',
          
          // Add more icons here
        ],
      },
    ],
  ],
};