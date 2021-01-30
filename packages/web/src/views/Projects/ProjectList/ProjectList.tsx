import { MouseEvent, FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import useData from '@app/data/management/useData'
import { getTimeLeftRatio } from '@app/data/utils'
import { t } from '@app/data/intl'
import {
  List,
  ListItem,
  PlayIcon,
  PauseIcon,
  EditIcon,
  Spacer,
  Loader,
  TransparentButton,
  Button,
} from '@app/components'
import DefaultView from '@app/web/components/DefaultView'

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

const ProjectList: FunctionComponent = () => {
  const data = useData()
  const [projects, loading] = data.getProjects()

  const history = useHistory()

  const handleEdit = (projectId: string) => (event: MouseEvent) => {
    event.stopPropagation()
    history.push(`/project/${projectId}`)
  }

  const handlePlay = (projectId: string) => (event: MouseEvent) => {
    event.stopPropagation()
    const project = projects.find((project) => project.id === projectId)
    if (project?.currentStrawBerry?.running) {
      data.pauseStrawberry(projectId)
    } else {
      data.startStrawberry(projectId)
    }
  }

  const newProject = () => {
    history.push(`/new`)
  }

  const handleView = (projectId: string) => () => {
    history.push(`/strawberry/${projectId}`)
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
      {loading && <Loader />}
      <ProjectListInner>
        {Boolean(projects?.length) &&
          projects.map((project) => (
            <ListItem
              level={getTimeLeftRatio(project.currentStrawBerry)}
              key={project.id}
              onClick={handleView(project.id)}
            >
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
                {project?.currentStrawBerry?.running ? (
                  <PauseIcon />
                ) : (
                  <PlayIcon />
                )}
              </ActionButton>
            </ListItem>
          ))}
      </ProjectListInner>
    </DefaultView>
  )
}

export default ProjectList
