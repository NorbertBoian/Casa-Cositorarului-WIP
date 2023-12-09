import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'allergen',
  title: 'Alergen',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nume',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name.ro',
    },
  },
})
