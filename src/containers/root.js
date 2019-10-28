import React from 'react'

import { Module } from './module'
import { Screen } from './screen'

const { ipcRenderer } = window.require('electron')

export const Root = (props) => {
  const [project, setProject] = React.useState({name: 'New Project', modules: []});
  const [pageMode, setPageMode] = React.useState({mode: 'module', id: 0, moduleId: undefined});
  registerListener()

  function registerListener() {
    ipcRenderer.on('refresh-project', (event, project) => {
      console.log('Refresh Project...')

      console.log(project)
      setProject(project)
    })
  }

  function Routing() {
    console.log('Page Mode: ' + pageMode.mode + ' ' + pageMode.id + ' ' + pageMode.moduleId)
    if (pageMode.mode === 'module') {
      return <Module project={project} pageMode={pageMode} setPageMode={setPageMode}/>
    } else if(pageMode.mode === 'screen') {
      return <Screen project={project} pageMode={pageMode} setPageMode={setPageMode}/>
    }
  }

  return (
    <Routing/>
  );
}
