import {defineField, defineType} from 'sanity'

export const parkingZone = defineType({
  title: 'Parking Zone',
  name: 'parkingZone',
  type: 'object',
  fields: [
    {
      title: 'Hourly Price',
      name: 'hourlyPrice',
      type: 'number',
    },
    {
      title: 'Daily Price',
      name: 'dailyPrice',
      type: 'number',
    },
  ],
})

export const timeInterval = defineType({
  title: 'Time Interval',
  name: 'timeInterval',
  type: 'object',
  fields: [
    {
      title: 'Start',
      name: 'start',
      type: 'string',
    },
    {
      title: 'End',
      name: 'end',
      type: 'string',
    },
  ],
})

export const parkingSchedule = defineType({
  title: 'Parking Schedule',
  name: 'parkingSchedule',
  type: 'object',
  fields: [
    {
      title: 'Monday',
      name: 'monday',
      type: 'timeInterval',
    },
    {
      title: 'Tuesday',
      name: 'tuesday',
      type: 'timeInterval',
    },
    {
      title: 'Wednesday',
      name: 'wednesday',
      type: 'timeInterval',
    },
    {
      title: 'Thursday',
      name: 'thursday',
      type: 'timeInterval',
    },
    {
      title: 'Friday',
      name: 'friday',
      type: 'timeInterval',
    },
    {
      title: 'Saturday',
      name: 'saturday',
      type: 'timeInterval',
    },
    {
      title: 'Sunday',
      name: 'sunday',
      type: 'timeInterval',
    },
  ],
})

export default defineType({
  name: 'crawled',
  title: 'Crawled',
  type: 'document',
  fields: [
    defineField({
      name: 'doubleRegularPrice',
      title: 'Double Regular Price',
      type: 'number',
    }),
    defineField({
      name: 'doubleSuperiorPrice',
      title: 'Double Superior Price',
      type: 'number',
    }),
    defineField({
      name: 'familySuperiorPrice',
      title: 'Family Superior Price',
      type: 'number',
    }),
    defineField({
      name: 'breakfastPrice',
      title: 'Breakfast Price',
      type: 'number',
    }),
    defineField({
      name: 'zoneA',
      title: 'Zone A',
      type: 'parkingZone',
    }),
    defineField({
      name: 'zoneB',
      title: 'Zone B',
      type: 'parkingZone',
    }),
    defineField({
      name: 'zoneC',
      title: 'Zone C',
      type: 'parkingZone',
    }),
    defineField({
      title: 'Schedule',
      name: 'schedule',
      type: 'parkingSchedule',
    }),
  ],
})
