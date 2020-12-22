import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getProject, Project } from '@app/data/projects'
import { t } from '@app/data/intl'
import { Loader, useToast } from '@app/components'
import CreateProject from './CreateProject'

const EditProject = () => {
  const params = useParams<{ projectId: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [project, setProject] = useState<Project>(null)
  const history = useHistory()
  const toast = useToast()

  useEffect(() => {
    ;(async () => {
      try {
        setProject(await getProject(params.projectId))
        setIsLoading(false)
      } catch (error) {
        toast({
          children: <>{t(`Cannot find project with ${params.projectId}.`)}</>,
        })
        history.push('/')
      }
    })()
  }, [params.projectId])

  return <>{isLoading ? <Loader /> : <CreateProject project={project} />}</>
}

export default EditProject
