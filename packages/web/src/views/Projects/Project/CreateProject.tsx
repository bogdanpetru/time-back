import { useState } from 'react'
import { Input, Button, Loader, useDocumentTitle } from '@app/components'
import DefaultView from '../../../components/DefaultView' // TODO: add alias or move to components
import { useHistory } from 'react-router-dom'
import { t } from '@app/data/intl'
import { saveProject, Project } from '@app/data/projects'
import useForm from '@app/components/Form/useForm'

import { isRequired } from '@app/components/Form/validators'

interface CreateProjectProps {
  project?: Project
}

const CreateProject = (props: CreateProjectProps) => {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const history = useHistory()
  const form = useForm(
    [
      {
        name: 'name',
        isValid: [isRequired],
        initialValue: props.project?.name,
      },
      {
        name: 'strawberrySize',
        isValid: [isRequired],
        initialValue: props.project?.strawberrySize || 20,
      },
      {
        name: 'numberOfStrawberries',
        initialValue: props.project?.numberOfStrawberries || 4,
      },
      {
        name: 'breakSize',
        initialValue: props.project?.breakSize || 10,
      },
      { name: 'description', initialValue: props.project?.description },
    ],
    async (values: any) => {
      setIsSaving(true)
      const projectId = props?.project?.id || void 0
      const savedProjectId = await saveProject({
        projectId,
        projectDetails: values,
      })

      if (!projectId) {
        history.push(`/project/${savedProjectId}`)
      }
    }
  )

  const title =
    form?.inputs?.name?.value || props.project?.name || t('Create Project')

  useDocumentTitle(title)

  return (
    <DefaultView
      title={title}
      footer={
        <Button onClick={form.onSubmit} type="submit" primary>
          {t(props.project ? 'edit' : 'save')}
        </Button>
      }
    >
      <form onSubmit={form.onSubmit}>
        <Input {...form.inputs.name} label={t('project name')} />
        <Input {...form.inputs.strawberrySize} label={t('strawberry size')} />
        <Input
          {...form.inputs.numberOfStrawberries}
          label={t('number of strawberries')}
          type="number"
        />
        <Input
          {...form.inputs.breakSize}
          type="number"
          label={t('break size')}
        />
        <Input
          {...form.inputs.description}
          type="text"
          label={t('description')}
        />
      </form>
      {isSaving && <Loader />}
    </DefaultView>
  )
}

export default CreateProject
