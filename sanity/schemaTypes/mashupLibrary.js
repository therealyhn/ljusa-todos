export default {
    name: 'mashupLibrary',
    title: 'Mashups',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Mashups Title',
            type: 'string',
        },
        {
            name: 'items',
            title: 'Mashups',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'mashup',
                    fields: [
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'artist', title: 'Artist', type: 'string' },
                        {
                            name: 'order',
                            title: 'Order',
                            type: 'number',
                            initialValue: 0,
                            description: 'Kada ubacujes nov Mashup, uvek stavljaj broj 1 da bi bio prvi',
                        },
                        {
                            name: 'audioFile',
                            title: 'Audio File',
                            type: 'file',
                            options: { accept: 'audio/*' },
                        },
                        {
                            name: 'tags',
                            title: 'Tags',
                            type: 'array',
                            of: [{ type: 'string' }],
                            description: 'Tehno, House, Drum and Bass, etc. (Drag to reorder tags)',
                        },
                    ],
                },
            ],
            description: 'Drag to reorder mashups',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'Mashup Library',
            };
        },
    },
}
