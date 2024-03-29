import { useState } from 'react'
import {
  Input,
  Button,
  Loader,
  useDocumentTitle,
  Footer,
} from '@app/components'
import DefaultView from '@app/web/components/DefaultView'
import { useHistory } from 'react-router-dom'
import { t } from '@app/data/intl'
import { Project, ProjectDescription } from '@app/data/interface'
import useData from '@app/data/management/useData'
import useForm from '@app/components/Form/useForm'
import { MINUTE_UNIT } from '@app/utils'

import { isRequired, isNumber } from '@app/utils/validation'
import { FunctionComponent } from 'react'

interface CreateProjectProps {
  project?: Project
}

const CreateProject: FunctionComponent<CreateProjectProps> = (props) => {
  const data = useData()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const history = useHistory()
  const form = useForm<ProjectDescription>(
    [
      {
        name: 'name',
        isValid: [isRequired],
        initialValue: props.project?.name,
      },
      {
        name: 'strawberrySize',
        isValid: [isRequired, isNumber],
        type: 'number',
        initialValue: props.project?.strawberrySize / MINUTE_UNIT || 20,
      },
      {
        name: 'numberOfStrawberries',
        type: 'number',
        initialValue: props.project?.numberOfStrawberries || 4,
      },
      {
        name: 'breakSize',
        initialValue: props.project?.breakSize / MINUTE_UNIT || 10,
        type: 'number',
        isValid: [isRequired, isNumber],
      },
      { name: 'description', initialValue: props.project?.description },
    ],

    async (values) => {
      const projectId = props?.project?.id || void 0
      const projectToSave = {
        ...values,
        strawberrySize: values.strawberrySize * MINUTE_UNIT,
        breakSize: values.breakSize * MINUTE_UNIT,
      }

      if (projectId) {
        await data.updateProject({
          ...projectToSave,
          id: projectId,
        })
        history.push(`/strawberry/${projectId}`)
      } else {
        setIsSaving(true)
        const { id } = await data.createProject(projectToSave)
        setIsSaving(false)
        history.push(`/strawberry/${id}`)
      }
    }
  )

  const title =
    form?.inputs?.name?.value || props.project?.name || t('Create Project')

  useDocumentTitle(title)

  const onDelete = async () => {
    setIsSaving(true)
    data.deleteProject(props.project?.id)
    history.push('/')
  }

  return (
    <DefaultView title={title}>
      <form onSubmit={form.onSubmit}>
        <Input autofocus {...form.inputs.name} label={t('name')} />
        <Input
          {...form.inputs.strawberrySize}
          label={t('interval size (minutes)')}
        />
        <Input
          {...form.inputs.numberOfStrawberries}
          type="number"
          label={t('how many to complete in a day')}
        />
        <Input {...form.inputs.breakSize} label={t('break size (minutes)')} />
        <Input
          {...form.inputs.description}
          type="text"
          label={t('description')}
        />

        <Footer>
          <Button type="submit" primary>
            {t(props.project ? 'edit' : 'save')}
          </Button>

          {props.project && (
            <Button onClick={onDelete} type="submit">
              {t('delete')}
            </Button>
          )}
        </Footer>
      </form>
      {isSaving && <Loader />}
    </DefaultView>
  )
}

export default CreateProject
