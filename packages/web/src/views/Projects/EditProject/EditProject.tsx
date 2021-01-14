import { useParams } from 'react-router-dom'
import CreateProject from './CreateProject'
import { Loader } from '@app/components'
import useData from '@app/data/management/useData'
import { FunctionComponent } from 'react'

const EditProject: FunctionComponent = () => {
  const params = useParams<{ projectId: string }>()
  const data = useData()
  const [project, loading] = data.getProject(params.projectId)

  return <>{loading ? <Loader /> : <CreateProject project={project} />}</>
}

export default EditProject
