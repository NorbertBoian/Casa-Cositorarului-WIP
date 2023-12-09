import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nume',
      type: 'localizedString',
    }),
    defineField({
      name: 'allergens',
      title: 'Alergeni',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'allergen'}]})],
    }),
    defineField({
      name: 'diet',
      title: 'Dieta',
      type: 'string',
      options: {
        list: [
          {title: 'Vegan', value: 'vegan'},
          {title: 'Vegetarian', value: 'vegetarian'},
          {title: 'Niciuna', value: 'none'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'frozen',
      title: 'Congelat',
      type: 'boolean',
    }),
  ],
  initialValue: {
    frozen: false,
  },
  preview: {
    select: {
      title: 'name.ro',
    },
  },
})
