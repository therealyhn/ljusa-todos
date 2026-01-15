export default {
    name: 'mixLibrary',
    title: 'Mix Library',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Library Title',
            type: 'string',
        },
        {
            name: 'items',
            title: 'Mixes',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'mix',
                    fields: [
                        { name: 'title', title: 'Mix Name', type: 'string' },
                        { name: 'djName', title: 'DJ Name', type: 'string' },
                        {
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'YouTube', value: 'youtube' },
                                    { title: 'SoundCloud', value: 'soundcloud' },
                                    { title: 'Mixcloud', value: 'mixcloud' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'youtube',
                        },
                        {
                            name: 'mixUrl',
                            title: 'Mix URL',
                            type: 'url',
                            description: 'Paste the full URL from the selected platform',
                        },
                        {
                            name: 'filters',
                            title: 'Filters',
                            type: 'array',
                            of: [{ type: 'reference', to: [{ type: 'mixFilter' }] }],
                        },
                        {
                            name: 'thumbnail',
                            title: 'Thumbnail',
                            type: 'image',
                            options: { hotspot: true },
                            description: 'Use for SoundCloud/Mixcloud cards and modal',
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'Mix Library',
            };
        },
    },
}
