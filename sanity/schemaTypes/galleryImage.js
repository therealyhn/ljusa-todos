export default {
    name: 'galleryImage',
    title: 'Gallery Item',
    type: 'document',
    fields: [
        {
            name: 'mediaType',
            title: 'Media Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Image', value: 'image' },
                    { title: 'Video', value: 'video' },
                ],
                layout: 'radio',
            },
            initialValue: 'image',
            validation: (R) => R.required(),
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            hidden: ({ document }) => document?.mediaType !== 'image',
            validation: (R) =>
                R.custom((value, context) => {
                    if (context.document?.mediaType === 'image' && !value) return 'Image is required'
                    return true
                }),
        },
        {
            name: 'video',
            title: 'Video',
            type: 'file',
            options: { accept: 'video/*' },
            hidden: ({ document }) => document?.mediaType !== 'video',
            validation: (R) =>
                R.custom((value, context) => {
                    if (context.document?.mediaType === 'video' && !value) return 'Video is required'
                    return true
                }),
        },
        {
            name: 'videoThumbnail',
            title: 'Video Thumbnail',
            type: 'image',
            options: { hotspot: true },
            hidden: ({ document }) => document?.mediaType !== 'video',
            description: 'Optional. If empty, the first frame of the video is used automatically.',
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'caption',
            title: 'Caption',
            type: 'string',
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Lower = first. Leave empty to sort by upload date.',
        },
    ],
    preview: {
        select: {
            title: 'title',
            mediaType: 'mediaType',
            image: 'image',
            videoThumbnail: 'videoThumbnail',
        },
        prepare({ title, mediaType, image, videoThumbnail }) {
            return {
                title: title || 'Untitled',
                subtitle: mediaType === 'video' ? '▶ Video' : 'Image',
                media: mediaType === 'video' ? videoThumbnail : image,
            }
        },
    },
}
