import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProject } from '@app/data/projects'
import { Loader } from '@app/components'
import CreateProject from './CreateProject'

const EditProject = () => {
  const params = useParams<{ projectId: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [project, setProject] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    ;(async () => {
      const data = await getProject(params.projectId)
      setProject(data)
      setIsLoading(false)
    })()
  }, [params.projectId])

  return <>{isLoading ? <Loader /> : <CreateProject project={project} />}</>
}

export default EditProject
