import { useState } from 'react'
import { Input, Button, Title, Loader } from '@app/components'
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
      { name: 'strawberrySize', isValid: [isRequired], initialValue: 20 },
      { name: 'numberOfStrawberries' },
      { name: 'breakSize' },
      { name: 'breakSize' },
      { name: 'description' },
    ],
    async (values: any) => {
      setIsSaving(true)
      const docId = await saveProject({ projectDetails: values })
      setIsSaving(false)
      // TODO: add error handling
      history.push(`/${docId}`)
    }
  )

  if (isSaving) {
    return <Loader />
  }

  return (
    <form onSubmit={form.onSubmit}>
      <Title center>{props.project?.name || t('Create Project')}</Title>
      <Input {...form.inputs.name} label={t('project name')} />
      <Input {...form.inputs.strawberrySize} label={t('strawberry size')} />
      <Input
        {...form.inputs.numberOfStrawberries}
        label={t('number of strawberries')}
      />
      <Input {...form.inputs.breakSize} label={t('break size')} />
      <Input {...form.inputs.description} label={t('description')} />
      <Button type="submit" primary>
        {t(props.project ? 'edit' : 'save')}
      </Button>
    </form>
  )
}

export default CreateProject
