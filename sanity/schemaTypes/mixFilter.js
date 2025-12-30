export default {
    name: 'mixFilter',
    title: 'Mix Filter',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Lower number appears first',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'Mix Filter',
            };
        },
    },
}
