import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects } from '@app/data/projects'

const ProjectList = () => {
  const [projects, setProjects] = useState<any>([])

  useEffect(() => {
    ;(async () => {
      const projects = await getAllProjects()
      setProjects(projects)
    })()
  }, [setProjects])

  return (
    <ul>
      {projects.map((project: any) => (
        <li>
          <Link key={project.id} to={`/p/${project.id}`}>
            {project.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ProjectList
