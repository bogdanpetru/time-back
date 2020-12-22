import { useParams } from 'react-router-dom'
import CreateProject from './CreateProject'
import { Loader } from '@app/components'
import useProject from '../useProject'

const EditProject = () => {
  const params = useParams<{ projectId: string }>()
  const { loading, project } = useProject(params.projectId)

  return <>{loading ? <Loader /> : <CreateProject project={project} />}</>
}

export default EditProject
