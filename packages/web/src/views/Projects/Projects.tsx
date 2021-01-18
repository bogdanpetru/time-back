import { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import useData from '@app/data/management/useData'
import { CreateProject, EditProject } from './EditProject'
import Strawberry from './Strawberry'
import ProjectList from './ProjectList'
import { FunctionComponent } from 'react'

const Projects: FunctionComponent = () => {
  const data = useData()

  useEffect(() => {
    data.initializeData()
  }, [])

  return (
    <Switch>
      <Route exact path="/" component={ProjectList} />
      <Route exact path="/new" component={CreateProject} />
      <Route path="/project/:projectId" component={EditProject} />
      <Route path="/strawberry/:projectId" component={Strawberry} />
    </Switch>
  )
}

export default Projects
