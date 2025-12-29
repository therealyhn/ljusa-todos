export default {
    name: 'galleryCategory',
    title: 'Gallery',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Naslov Kategorije',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            description: 'Koristi se za SEO',
        },
        {
            name: 'order',
            title: 'Redosled',
            type: 'number',
            description: 'Nizi broj pojavljuje se prvo',
        },
        {
            name: 'description',
            title: 'Opis',
            type: 'text',
            rows: 3,
        },
        {
            name: 'coverImage',
            title: 'Thumbnail',
            type: 'image',
            options: { hotspot: true },
            description: 'Najbolji aspect ratio je 16:9 (1600x900)',
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
                        { name: 'title', title: 'Naslov', type: 'string' },
                        {
                            name: 'image',
                            title: 'Slika',
                            type: 'image',
                            options: { hotspot: true },
                            description: 'Bilo koja rezolucija',
                        },
                        { name: 'alt', title: 'Alt Tekst', type: 'string' },
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
                title: title || 'Gallery',
                media,
            };
        },
    },
}
