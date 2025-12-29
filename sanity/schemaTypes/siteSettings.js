export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Site Title',
            type: 'string',
        },
        {
            name: 'heroTitle',
            title: 'Hero Title (Top Line)',
            type: 'string',
            description: 'e.g. ELEVATE',
        },
        {
            name: 'heroSubtitle',
            title: 'Hero Subtitle (Bottom Line)',
            type: 'string',
            description: 'e.g. THE VIBE',
        },
        {
            name: 'heroDescription',
            title: 'Hero Description',
            type: 'text',
        },
        {
            name: 'galleryCategories',
            title: 'Gallery Categories',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Title', type: 'string' },
                        {
                            name: 'slug',
                            title: 'Slug',
                            type: 'slug',
                            options: { source: 'title' },
                        },
                    ],
                },
            ],
            description: 'Drag to order filters',
        }
    ],
}
