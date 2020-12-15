import { useState } from "react";
import { Input, Button, Title } from "@app/components";
import { t } from "@app/data/intl";
import { createProject } from "@app/data/projects";

const noop = () => {};

interface EditCreateProjectProps {
  id?: string;
}

interface UseFormInterface {
  initialValues: {
    [index: string]: string;
  };
  onSubmit: (values: any) => void;
}

interface FormInterface {
  [key: string]: {
    value: any;
    onChange: (value: any) => void
  }
}

const useForm = ({ initialValues, onSubmit }: UseFormInterface): FormInterface => {
  const fieldsKeys = Object.keys(initialValues).sort() || [];
  return fieldsKeys.reduce(
    (
      acc: { [key: string]: { value: string; onChange: (value: any) => any } },
      key: string
    ) => {
      const [value, setValue] = useState<any>(initialValues[key]);
      acc[key] = {
        value,
        onChange: setValue,
      };

      return acc;
    },
    {}
  );
};

const EditCreateProject = (props: EditCreateProjectProps) => {
  const isNew = Boolean(props.id);
  const form = useForm({
    initialValues: {
      projectName: "",
      description: "",
      numberOfStrawberries: "",
      strawberrySize: "",
      breakSize: "",
    },
    onSubmit: () => {},
  });

  const addProject = () => {
    const values = Object.entries(form).reduce((acc: any, [key,  field]) => {
      acc[key] = field.value;
      return acc
    }, {});

    createProject({ projectDetails: values});
  };

  return (
    <div>
      <Title center>{t("Create Project")}</Title>
      <Input value={form.projectName.value} onChange={form.projectName.onChange} label={t("project name")}  />
      <Input value={form.strawberrySize.value} onChange={form.strawberrySize.onChange} label={t("strawberry size")} />
      <Input value={form.numberOfStrawberries.value} onChange={form.numberOfStrawberries.onChange} label={t("number of strawberries")} />
      <Input value={form.breakSize.value} onChange={form.breakSize.onChange} label={t("break size")} />
      <Input value={form.description.value} onChange={form.description.onChange} label={t("description")} />
      <Button primary onClick={addProject}>
        {t(isNew ? "edit" : "save")}
      </Button>
    </div>
  );
};

export default EditCreateProject;
