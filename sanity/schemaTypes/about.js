export default {
    name: 'about',
    title: 'About Section',
    type: 'document',
    fields: [
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
            description: 'e.g. THE ENERGY',
        },
        {
            name: 'subheading',
            title: 'Subheading',
            type: 'string',
            description: 'e.g. THE PASSION.',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'imageFront',
            title: 'Front Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'imageBack',
            title: 'Back Image (Reveal)',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'value', type: 'string', title: 'Value (e.g. 500+)' },
                    { name: 'label', type: 'string', title: 'Label (e.g. Events)' }
                ]
            }]
        }
    ],
}