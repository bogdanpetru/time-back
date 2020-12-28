import { useState } from 'react'
import { Input, Button, Loader, useDocumentTitle } from '@app/components'
import DefaultView from '@app/web/components/DefaultView'
import { useHistory } from 'react-router-dom'
import { t } from '@app/data/intl'
import { saveProject, Project, deleteProject } from '@app/data/projects'
import useForm from '@app/components/src/Form/useForm'
import { MINUTE_UNIT } from '@app/utils'

import { isRequired, isNumber } from '@app/components/src/Form/validators'

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
        isValid: [isRequired, isNumber],
        initialValue: props.project?.strawberrySize / MINUTE_UNIT || 20,
      },
      {
        name: 'numberOfStrawberries',
        initialValue: props.project?.numberOfStrawberries || 4,
      },
      {
        name: 'breakSize',
        initialValue: props.project?.breakSize / MINUTE_UNIT || 10,
      },
      { name: 'description', initialValue: props.project?.description },
    ],
    async (values: any) => {
      setIsSaving(true)
      const projectId = props?.project?.id || void 0
      const savedProjectId = await saveProject({
        projectId,
        projectDetails: {
          ...values,
          strawberrySize: values.strawberrySize * MINUTE_UNIT,
          breakSize: values.breakSize * MINUTE_UNIT,
        },
      })
      setIsSaving(false)

      if (!projectId) {
        history.push(`/strawberry/${savedProjectId}`)
      }
    }
  )

  const title =
    form?.inputs?.name?.value || props.project?.name || t('Create Project')

  useDocumentTitle(title)

  const onDelete = async () => {
    setIsSaving(true)
    await deleteProject(props.project.id)
    history.push('/')
  }

  return (
    <DefaultView
      title={title}
      footer={
        <>
          <Button onClick={form.onSubmit} type="submit" primary>
            {t(props.project ? 'edit' : 'save')}
          </Button>

          {props.project && (
            <Button onClick={onDelete} type="submit">
              {t('delete')}
            </Button>
          )}
        </>
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
