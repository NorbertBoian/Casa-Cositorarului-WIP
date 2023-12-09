import {defineArrayMember, defineField, defineType} from 'sanity'

export const ingredientDetails = defineType({
  name: 'ingredientDetails',
  title: 'Detalii Ingredient',
  type: 'object',
  fields: [
    defineField({
      name: 'ingredient',
      title: 'Ingredient',
      type: 'reference',
      to: [{type: 'ingredient'}],
    }),
    defineField({
      name: 'alcoholAndQuantity',
      title: 'Alcool si cantitate',
      type: 'alcoholAndQuantity',
    }),
  ],
  preview: {
    select: {
      title: 'ingredient.name.ro',
    },
  },
})

export const ingredientEntryDetails = defineType({
  name: 'ingredientEntryDetails',
  title: 'Detalii ingredient preparat',
  type: 'object',
  fields: [
    defineField({
      name: 'or',
      title: 'Sau',
      type: 'boolean',
    }),
    defineField({
      name: 'ingredientDetails',
      title: 'Detalii ingredient',
      type: 'ingredientDetails',
      hidden: ({parent}) => parent.or,
    }),

    defineField({
      name: 'orIngredientDetails',
      title: 'Detalii ingrediente preparat (Sau)',
      type: 'array',
      of: [defineArrayMember({type: 'ingredientDetails'})],
      hidden: ({parent}) => !parent.or,
    }),
  ],
  initialValue: {
    or: false,
  },
  preview: {
    select: {
      title: 'ingredientDetails.ingredient.name.ro',
      subtitle: 'ingredientDetails.alcoholAndQuantity.quantity',
    },
  },
})
