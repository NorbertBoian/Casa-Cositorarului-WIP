import {defineArrayMember, defineField, defineType} from 'sanity'

export const ingredientsOr = defineType({
  name: 'ingredientsOr',
  title: 'Ingrediente (Sau)',
  type: 'document',
  fields: [
    defineField({
      name: 'firstOption',
      title: 'Prima optiune',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'ingredientDetails'}]})],
    }),
    defineField({
      name: 'secondOption',
      title: 'A doua optiune',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'ingredientDetails'}]})],
    }),
  ],
})
