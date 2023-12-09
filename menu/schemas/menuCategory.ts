import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'menuCategory',
  title: 'Categorie Meniu',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nume',
      type: 'localizedString',
    }),
    defineField({
      name: 'menuCategoryItems',
      title: 'Preparatele categoriei',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'menuItem'}]})],
    }),
    defineField({
      title: 'Timp mediu de preparare',
      name: 'averagePreparationTime',
      type: 'number',
    }),
    defineField({
      title: 'Descriere',
      name: 'description',
      type: 'localizedString',
    }),
  ],
  preview: {
    select: {
      title: 'name.ro',
    },
  },
})
