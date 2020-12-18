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

  const addProject = (values: any) => {
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
        error={form.errors.name}
        value={form.values.name}
        onChange={form.changeHandlers.name}
        label={t('project name')}
      />
      <Input
        error={form.errors.strawberrySize}
        value={form.values.strawberrySize}
        onChange={form.changeHandlers.strawberrySize}
        label={t('strawberry size')}
      />
      <Input
        error={form.errors.numberOfStrawberries}
        value={form.values.numberOfStrawberries}
        onChange={form.changeHandlers.numberOfStrawberries}
        label={t('number of strawberries')}
      />
      <Input
        error={form.errors.breakSize}
        value={form.values.breakSize}
        onChange={form.changeHandlers.breakSize}
        label={t('break size')}
      />
      <Input
        error={form.errors.description}
        value={form.values.description}
        onChange={form.changeHandlers.description}
        label={t('description')}
      />
      <Button type="submit" primary>
        {t(isNew ? 'edit' : 'save')}
      </Button>
    </form>
  )
}

export default EditCreateProject
