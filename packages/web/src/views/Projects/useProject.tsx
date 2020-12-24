import { useEffect, useState } from 'react'
import { getProject, Project } from '@app/data/projects'
import { useHistory, useParams } from 'react-router-dom'
import { t } from '@app/data/intl'
import { useToast } from '@app/components'

const useProject = (
  projectId: string
): {
  loading: boolean
  project: Project
} => {
  const [loading, setLoading] = useState<boolean>(true)
  const [project, setProject] = useState<Project>(null)
  const toast = useToast()
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      try {
        setProject(await getProject(projectId))
        setLoading(false)
      } catch (error) {
        toast({
          children: <>{t(`Cannot find project with ${projectId}.`)}</>,
        })
        history.push('/')
      }
    })()
  }, [projectId])

  return {
    loading,
    project,
  }
}

export default useProject
