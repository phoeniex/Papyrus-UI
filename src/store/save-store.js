import { Store } from 'electron-store';

const path = require('path');
const schema = {
  version: { type: 'string' },
	project: {
    type: 'object',
		properties: {
      name: { type: 'string' },
      icon: { type: 'string' },
      languages: {type: ['string']},
      models: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          screens: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              image: { type: 'string' },
              localizes: {
                type: 'object',
                properties: {
                  key: { type: 'string' },
                  values: { type: ['string'] },
                },
              },
            },
          },
        },
      },
    },
  },
};

export class SaveStore {
  constructor(fullPath) {
    const pathName = path.parse(fullPath).dir;
    const name = path.parse(fullPath).name;
    const extension = path.parse(fullPath).ext;
    this.store = new Store({schema: schema, name: name, cwd: pathName, fileExtension: extension});
  }

  // get(key) {
  //   return this.store.get('version')
  // }

  // set(key, val) {
  //   this.store.set('version', '0.2')
  // }
}
