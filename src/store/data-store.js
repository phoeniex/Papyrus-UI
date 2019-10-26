const Store = require('electron-store')
const path = require('path')
const electron = require('electron')
const { app } = electron
const fs = require('fs')

const schema = {
  version: { type: 'string' },
	project: {
    type: 'object',
		properties: {
      name: { type: 'string' },
      icon: { type: 'string' },
      languages: { type: 'array', items: { type: 'string' } },
      modules: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            screens: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  image: { type: 'string' },
                  localizes: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        key: { type: 'string' },
                        values: { type: 'array', items: { type: 'string' } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

class DataStore extends Store {
  constructor() {
    console.log('Construct...')
    super({schema: schema, name: 'Data Store', fileExtension: 'papyrus'})

    this.savePath = null
  }

  loadProjectFromPath(fullPath) {
    fs.readFile(require.resolve(fullPath), (err, data) => {
      if (err) {
        console.log(err)
      } else {
        this.store = JSON.parse(data)
        this.savePath = fullPath
      }
    })
  }

  exportPapyrus(fullPath) {
    console.log('Save to: ' + fullPath)
    fs.writeFile(fullPath, JSON.stringify(this.store), (err) => {
      if (err) {
        console.log(err)
      } else {
        this.savePath = fullPath
      }
    })
  }

  clear() {
    this.clear()
  }

  addEmptyModule(moduleName) {
    var emptyModule = {name: moduleName, screens: []}
    var modules = this.get('project.modules');
    if (modules) {
      this.set('project.modules', modules.concat(emptyModule));
    } else {
      this.set('project.modules', [emptyModule]);
    }
  }

  addDummyModule() {
    var testModules = {
      name: 'Dummy',
      screens: [{
        name: 'Test',
        'image': '',
        'localizes': [
            {key: 'test_key_1', values: ['Value']},
        ]
      }]
    }

    var modules = this.get('project.modules');
    if (modules) {
      this.set('project.modules', modules.concat(testModules));
    } else {
      this.set('project.modules', [testModules]);
    }
  }

  getProject() {
    return this.get('project') || []
  }

  getModules() {
    return this.get('project.modules') || []
  }
}

module.exports = DataStore
