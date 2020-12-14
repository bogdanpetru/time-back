import {
  Input,
  Button,
  Title,
} from '@app/components';
import { t } from "@app/data/intl";

const noop = () => {};


const Create = () => {
  return (
  <div>
    <Title center>Create Project</Title>
    <Input label={t('project name')} onChange={noop} />
    <Input label={t('strawberry length')} onChange={noop} />
    <Input label={t('break length')} onChange={noop} />
    <Input label={t('long break')} onChange={noop} />
    <Input label={t('long break after')} onChange={noop} />

    <Button primary onClick={noop}>save</Button>
  </div>
  );
};

export default Create;