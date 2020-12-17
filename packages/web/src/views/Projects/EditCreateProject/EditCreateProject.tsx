import { Input, Button, Title } from '@app/components'
import { t } from '@app/data/intl'
import { saveProject } from '@app/data/projects'
import useForm from '@app/components/form/useForm'
import { isRequired } from '@app/components/form/validators'

interface EditCreateProjectProps {
  id?: string
}

const EditCreateProject = (props: EditCreateProjectProps) => {
  const isNew = Boolean(props.id)

  const addProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = Object.entries(form).reduce((acc: any, [key, field]) => {
      acc[key] = field.value
      return acc
    }, {})

    saveProject({ projectDetails: values })
  }

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      numberOfStrawberries: '',
      strawberrySize: '',
      breakSize: '',
    },
    validators: {
      name: isRequired,
      strawberrySize: isRequired,
    },
    onSubmit: addProject,
  })

  return (
    <form onSubmit={form.onSubmit}>
      <Title center>{t('Create Project')}</Title>
      <Input
        required
        error={form.name.error}
        value={form.name.value}
        onChange={form.name.onChange}
        label={t('project name')}
      />
      <Input
        value={form.strawberrySize.value}
        error={form.strawberrySize.error}
        onChange={form.strawberrySize.onChange}
        label={t('strawberry size')}
      />
      <Input
        value={form.numberOfStrawberries.value}
        error={form.numberOfStrawberries.error}
        onChange={form.numberOfStrawberries.onChange}
        label={t('number of strawberries')}
      />
      <Input
        value={form.breakSize.value}
        error={form.breakSize.error}
        onChange={form.breakSize.onChange}
        label={t('break size')}
      />
      <Input
        value={form.description.value}
        error={form.description.error}
        onChange={form.description.onChange}
        label={t('description')}
      />
      <Button type="submit" primary>
        {t(isNew ? 'edit' : 'save')}
      </Button>
    </form>
  )
}

export default EditCreateProject
