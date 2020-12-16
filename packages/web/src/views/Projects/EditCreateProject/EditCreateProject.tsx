import { useState } from "react";
import { Input, Button, Title } from "@app/components";
import { t } from "@app/data/intl";
import { saveProject } from "@app/data/projects";

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
      name: "",
      description: "",
      numberOfStrawberries: "",
      strawberrySize: "",
      breakSize: "",
    },
    onSubmit: () => {},
  });

  const addProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.entries(form).reduce((acc: any, [key,  field]) => {
      acc[key] = field.value;
      return acc
    }, {});

    saveProject({ projectDetails: values});
  };

  return (
    <form onSubmit={addProject}>
      <Title center>{t("Create Project")}</Title>
      <Input required value={form.name.value} onChange={form.name.onChange} label={t("project name")}  />
      <Input value={form.strawberrySize.value} onChange={form.strawberrySize.onChange} label={t("strawberry size")} />
      <Input value={form.numberOfStrawberries.value} onChange={form.numberOfStrawberries.onChange} label={t("number of strawberries")} />
      <Input value={form.breakSize.value} onChange={form.breakSize.onChange} label={t("break size")} />
      <Input value={form.description.value} onChange={form.description.onChange} label={t("description")} />
      <Button type="submit" primary>
        {t(isNew ? "edit" : "save")}
      </Button>
    </form>
  );
};

export default EditCreateProject;
