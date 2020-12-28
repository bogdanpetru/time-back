import { t } from '@app/data/intl'

export const isRequired = (value: any) => (Boolean(value) ? '' : t('required'))

export const isNumber = (value: any) =>
  Boolean(value) ? '' : t('input must be number')
