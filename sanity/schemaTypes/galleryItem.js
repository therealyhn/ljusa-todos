export default {
    name: 'galleryItem',
    title: 'Gallery Item',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'caption',
            title: 'Caption',
            type: 'string',
        },
        {
            name: 'categories',
            title: 'Categories (slugs)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Use slugs from Site Settings > Gallery Categories',
        },
    ],
}
