export default {
    name: 'about',
    title: 'XTY Duo / About Section',
    type: 'document',
    fields: [
        {
            name: 'heading',
            title: 'Main title',
            type: 'string',
            description: 'Used as the large Duo title in xty-v2. Example: XTY',
        },
        {
            name: 'subheading',
            title: 'Eyebrow / duo label',
            type: 'string',
            description: 'Used above the title and over the image. Example: YHN x TODOS',
        },
        {
            name: 'description',
            title: 'Duo description',
            type: 'text',
            rows: 5,
        },
        {
            name: 'imageFront',
            title: 'Main duo image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'stats',
            title: 'Duo statistics',
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
    preview: {
        select: {
            title: 'heading',
            subtitle: 'subheading',
            media: 'imageFront',
        },
    },
}
