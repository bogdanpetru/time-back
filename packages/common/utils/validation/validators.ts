import { t } from '@app/data/intl'

export const isRequired = (value: any) => (Boolean(value) ? '' : t('required'))

export const isNumber = (value: any) =>
  !isNaN(value) && typeof value === 'number' ? '' : t('input must be number')
