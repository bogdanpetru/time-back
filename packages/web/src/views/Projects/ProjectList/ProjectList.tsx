import { useState, useEffect, MouseEvent } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { getAllProjects } from '@app/data/projects'
import { t } from '@app/data/intl'
import {
  List,
  ListItem,
  PlayIcon,
  EditIcon,
  Spacer,
  Loader,
  TransparentButton,
  useDocumentTitle,
  Button,
} from '@app/components'
import { Project } from '@app/data/projects'
import DefaultView from '../../../components/DefaultView'

const ActionButton = styled(TransparentButton)`
  padding: 0 10px;
  height: 100%;
  svg {
    cursor: pointer;
  }
`

const ProjectListInner = styled(List)`
  min-height: 130px;
`

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useDocumentTitle(t('Project List'))
  const history = useHistory()
  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const projects = await getAllProjects()
      setProjects(projects)
      setIsLoading(false)
    })()
  }, [setProjects])

  const handleEdit = (projectId: string) => (event: MouseEvent) => {
    event.stopPropagation()
    history.push(`/project/${projectId}`)
  }

  const handlePlay = (projectId: string) => () => {
    history.push(`/strawberry/${projectId}`)
  }

  const newProject = () => {
    history.push(`/new`)
  }

  return (
    <DefaultView
      title={t('strawberries')}
      footer={
        <Button onClick={newProject} primary>
          {t('new project')}
        </Button>
      }
    >
      {isLoading && <Loader />}
      <ProjectListInner>
        {projects.map((project) => (
          <ListItem key={project.id} onClick={handlePlay(project.id)}>
            {project.name}
            <Spacer />
            <ActionButton
              title={t('edit project')}
              onClick={handleEdit(project.id)}
            >
              <EditIcon />
            </ActionButton>
            <ActionButton
              title={t('start project')}
              onClick={handlePlay(project.id)}
            >
              <PlayIcon />
            </ActionButton>
          </ListItem>
        ))}
      </ProjectListInner>
    </DefaultView>
  )
}

export default ProjectList
