import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { saveProject, getProject } from '@app/data/projects'
import { Loader } from '@app/components'
import CreateProject from './CreateProject'

const EditProject = (props: any) => {
  const params = useParams<{ projectId: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [project, setProject] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    ;(async () => {
      const project = await (await getProject(params.projectId)).data()
      setProject(project)
      setIsLoading(false)
    })()
  }, [params.projectId])

  if (isLoading) {
    return <Loader />
  }

  return <CreateProject project={project} />
}

export default EditProject
