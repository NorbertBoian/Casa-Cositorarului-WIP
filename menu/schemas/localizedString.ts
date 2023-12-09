import {defineType} from 'sanity'

export const localizedString = defineType({
  title: 'Localized string',
  name: 'localizedString',
  type: 'object',
  fields: [
    {
      title: 'Romana',
      name: 'ro',
      type: 'string',
    },
    {
      title: 'Engleza',
      name: 'en',
      type: 'string',
    },
  ],
})
