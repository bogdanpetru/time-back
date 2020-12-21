import { useState } from 'react'
import { Input, Button, Title, Loader, DefaultView } from '@app/components'
import { useHistory } from 'react-router-dom'
import { t } from '@app/data/intl'
import { saveProject } from '@app/data/projects'
import useForm from '@app/components/form/useForm'

import { isRequired } from '@app/components/form/validators'

interface CreateProjectProps {
  project?: {
    [key: string]: any
  }
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
        history.push(`/p/${savedProjectId}`)
      }
    }
  )

  return (
    <DefaultView>
      <form onSubmit={form.onSubmit}>
        <Title center>
          {form?.inputs?.name?.value ||
            props.project?.name ||
            t('Create Project')}
        </Title>
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
        <Button type="submit" primary>
          {t(props.project ? 'edit' : 'save')}
        </Button>
      </form>
      {isSaving && <Loader />}
    </DefaultView>
  )
}

export default CreateProject
