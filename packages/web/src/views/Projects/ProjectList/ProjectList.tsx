import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAllProjects } from '@app/data/projects'
import { t } from '@app/data/intl'
import {
  List,
  ListItem,
  PlayIcon,
  EditIcon,
  Spacer,
  Loader,
} from '@app/components'
import { Project } from '@app/data/projects'
import DefaultView from '../../../components/DefaultView'

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const projects = await getAllProjects()
      setProjects(projects)
      setIsLoading(false)
    })()
  }, [setProjects])

  const handleItemClick = (projectId: string) => () => {
    history.push(`/p/${projectId}`)
  }

  return (
    <DefaultView title={t('strawberries')}>
      {isLoading && <Loader />}
      <List>
        {projects.map((project) => (
          <ListItem key={project.id} onClick={handleItemClick(project.id)}>
            {project.name}
            <Spacer />
            <PlayIcon />
            <EditIcon />
          </ListItem>
        ))}
      </List>
    </DefaultView>
  )
}

export default ProjectList
