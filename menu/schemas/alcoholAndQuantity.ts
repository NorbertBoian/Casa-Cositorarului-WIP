import {defineField, defineType} from 'sanity'

export const alcoholAndQuantity = defineType({
  title: 'Alcool si cantitate',
  name: 'alcoholAndQuantity',
  type: 'object',
  fields: [
    defineField({
      name: 'hideAlcohol',
      title: 'Ascunde alcool',
      type: 'boolean',
    }),
    defineField({
      name: 'alcohol',
      title: 'Alcool',
      type: 'string',
      hidden: ({parent}) => parent?.hideAlcohol,
    }),
    defineField({
      name: 'hideQuantity',
      title: 'Ascunde cantitatea',
      type: 'boolean',
    }),
    defineField({
      name: 'unit',
      title: 'Unitate',
      type: 'string',
      options: {
        list: [
          {title: 'Grame', value: 'grams'},
          {title: 'Mililitri', value: 'mililiters'},
          {title: 'Bucati', value: 'pieces'},
          {title: 'Alta', value: 'other'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => parent?.hideQuantity,
    }),
    defineField({
      name: 'customUnit',
      title: 'Alta unitate',
      type: 'localizedString',
      hidden: ({parent}) => parent?.hideQuantity || parent?.unit !== 'other',
    }),
    defineField({
      name: 'quantity',
      title: 'Cantitate',
      type: 'string',
      hidden: ({parent}) => parent?.hideQuantity,
    }),
  ],
  initialValue: {
    hideAlcohol: true,
    hideQuantity: false,
  },
})
