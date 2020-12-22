import { Switch, Route } from 'react-router-dom'
import { CreateProject, EditProject } from './Project'
import ProjectList from './ProjectList'

const Projects = () => {
  return (
    <Switch>
      <Route exact path="/" component={ProjectList} />
      <Route exact path="/new" component={CreateProject} />
      <Route path="/p/:projectId" component={EditProject} />
    </Switch>
  )
}

export default Projects
