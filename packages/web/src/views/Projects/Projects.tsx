import { Switch, Route } from 'react-router-dom'
import { CreateProject, EditProject } from './EditProject'
import Strawberry from './Strawberry'
import ProjectList from './ProjectList'

const Projects = () => {
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
