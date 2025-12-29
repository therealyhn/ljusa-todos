export default {
    name: 'galleryCategory',
    title: 'Gallery',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Lower number appears first',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        },
        {
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'item',
                    fields: [
                        { name: 'title', title: 'Title', type: 'string' },
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: { hotspot: true },
                        },
                        { name: 'alt', title: 'Alt Text', type: 'string' },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'coverImage',
        },
        prepare({ title, media }) {
            return {
                title: title || 'Gallery Category',
                media,
            };
        },
    },
}
