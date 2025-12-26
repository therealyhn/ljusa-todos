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
    ],
}