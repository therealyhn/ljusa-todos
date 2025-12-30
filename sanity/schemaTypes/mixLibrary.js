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
                            name: 'youtubeUrl',
                            title: 'YouTube URL',
                            type: 'url',
                        },
                        {
                            name: 'filters',
                            title: 'Filters',
                            type: 'array',
                            of: [{ type: 'reference', to: [{ type: 'mixFilter' }] }],
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
