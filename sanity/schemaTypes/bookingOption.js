// import { defineType, defineField } from 'sanity'

// export default defineType({
//     name: 'bookingOption',
//     title: 'Booking Option',
//     type: 'document',
//     fields: [
//         defineField({
//             name: 'title',
//             title: 'Title',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'description',
//             title: 'Description',
//             type: 'text',
//             rows: 3,
//         }),
//         defineField({
//             name: 'features',
//             title: 'Features',
//             type: 'array',
//             of: [{ type: 'string' }],
//         }),
//         defineField({
//             name: 'priceRange',
//             title: 'Price Range',
//             type: 'string',
//         }),
//         defineField({
//             name: 'duration',
//             title: 'Duration',
//             type: 'string',
//         }),
//         defineField({
//             name: 'order',
//             title: 'Display Order',
//             type: 'number',
//         }),
//         defineField({
//             name: 'isPopular',
//             title: 'Most Popular',
//             type: 'boolean',
//             initialValue: false,
//         }),
//     ],
// })
