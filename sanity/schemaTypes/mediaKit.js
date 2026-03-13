export default {
    name: 'mediaKit',
    title: 'Media Kit',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'text',
            rows: 2,
        },
        {
            name: 'bioPrimary',
            title: 'Biography Primary',
            type: 'text',
            rows: 5,
        },
        {
            name: 'stats',
            title: 'Stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Label', type: 'string' },
                        { name: 'value', title: 'Value', type: 'string' },
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            subtitle: 'value',
                        },
                    },
                },
            ],
        },
        {
            name: 'pressPhotos',
            title: 'Press Photos',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'alt', title: 'Alt Text', type: 'string' },
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: { hotspot: true },
                        },
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            media: 'image',
                        },
                    },
                },
            ],
            description: 'Postavi minimum 3 fotografije (prva je glavna).',
        },
        {
            name: 'techRider',
            title: 'Tech Rider',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'detail', title: 'Detail', type: 'text', rows: 2 },
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'detail',
                        },
                    },
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'subtitle',
        },
        prepare({ title, subtitle }) {
            return {
                title: title || 'XTY Media Kit',
                subtitle: subtitle || 'Media kit content',
            };
        },
    },
}
