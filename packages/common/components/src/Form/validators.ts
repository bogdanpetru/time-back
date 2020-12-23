import { t } from '@app/data/intl'

export const isRequired = (value: any) => (Boolean(value) ? '' : t('required'))
