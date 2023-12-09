import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Preparat',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nume',
      type: 'localizedString',
    }),
    defineField({
      name: 'price',
      title: 'Pret',
      type: 'number',
    }),
    defineField({
      name: 'ingredientsDetails',
      title: 'Detalii Ingrediente',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'ingredientEntryDetails',
        }),
      ],
    }),
    defineField({
      name: 'alcoholAndQuantity',
      title: 'Alcool si cantitate',
      type: 'alcoholAndQuantityWithAuto',
    }),
    defineField({
      name: 'computeAllergens',
      title: 'Calculeaza alergeni automat',
      type: 'boolean',
    }),
    defineField({
      name: 'allergens',
      title: 'Alergeni',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'allergen'}]})],
      hidden: ({parent}) => parent.computeAllergens,
    }),
    defineField({
      name: 'computeDiet',
      title: 'Calculeaza dieta automat',
      type: 'boolean',
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
      hidden: ({parent}) => parent.computeDiet,
    }),
    defineField({
      name: 'computeFrozen',
      title: 'Calculeaza congelat automat',
      type: 'boolean',
    }),
    defineField({
      name: 'frozen',
      title: 'Congelat',
      type: 'boolean',
      hidden: ({parent}) => parent.computeFrozen,
    }),
    defineField({
      name: 'description',
      title: 'Descriere',
      type: 'localizedString',
    }),
  ],
  initialValue: {
    computeDiet: true,
    computeFrozen: true,
    computeAllergens: true,
    frozen: false,
  },
  preview: {
    select: {
      title: 'name.ro',
    },
  },
})
