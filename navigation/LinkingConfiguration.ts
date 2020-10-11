import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          logged: {
            screens: {
              project: {
                path: 'ps'
              },
              projects: 'ps',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
