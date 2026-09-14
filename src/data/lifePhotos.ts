export type LifePhoto = {
  src: string;
  alt: string;
};

// Rendered in the "A Life in Balance" gallery on the About page.
// New entries can be appended by the automated photo-import route
// (src/app/api/photo-import/route.ts) — it inserts a placeholder alt
// text that should be edited to actually describe the photo before
// the resulting PR is merged.
export const lifePhotos: LifePhoto[] = [
  { src: '/IMG_9655.JPEG', alt: 'Jett and his wife' },
  { src: '/IMG_0304.JPEG', alt: 'Snowmobiling in the Utah mountains' },
  { src: '/IMG_6716.JPEG', alt: 'Jett and his wife at Lake Como, Italy' },
  { src: '/IMG_4027.JPEG', alt: 'Fishing on the river' },
  { src: '/IMG_0089.JPEG', alt: 'Skiing in the Utah mountains' },
  { src: '/IMG_0208.JPEG', alt: 'Cooking class in Rome' },
  { src: '/123_1 3.JPEG', alt: 'Mountain lake with rainbow' },
  { src: '/Fishing Wind Rivers.JPEG', alt: 'Fishing in the Wind Rivers' },
  { src: '/IMG_7344.JPEG', alt: 'Argentina soccer match' },
  { src: '/IMG_0478.jpeg', alt: 'On a cliff overlook above the river' },
  { src: '/IMG_3219.jpeg', alt: 'Holding a fish at sunset' },
  { src: '/High School Golf.JPEG', alt: 'High school golf' },
  { src: '/IMG_1642.JPEG', alt: 'Jett and his wife hanging out' },
  { src: '/IMG_0490.JPEG', alt: 'Juggling a soccer ball in the Naples gallery' },
  { src: '/IMG_7393.JPEG', alt: 'Couple selfie at the LDS temple' },
  { src: '/IMG_7086.JPEG', alt: 'Wife with her plant display at home' },
  { src: '/fishing-pond-golden.jpg', alt: 'Fishing a still pond at golden hour with the dog' },
  { src: '/fishing-sunset-silhouette.jpg', alt: 'Fishing the lake under a burning sunset' },
  { src: '/couple-forest-hillside.jpg', alt: 'On a wooded hillside with wife and dog' },
  { src: '/snowbasin-summer-dog.jpg', alt: 'At Snowbasin in summer with the dog' },
  { src: '/IMG_4976.JPEG', alt: 'Walking through the sagebrush near the old barn' },
  { src: '/IMG_4872.JPEG', alt: 'At the Grand Teton National Park entrance with the dog' },
  { src: '/IMG_2282.jpg', alt: 'Hiking along the shore of Jenny Lake with the dog' },
  { src: '/IMG_4881.jpg', alt: 'Wife holding the dog with the Tetons behind them' },
  { src: '/IMG_4879.jpg', alt: 'Wife laughing with the dog tucked against her shoulder' },
  { src: '/IMG_5154.jpg', alt: 'A bison herd grazing below the Teton peaks' },
  { src: '/IMG_5152.jpg', alt: 'Bison grazing in the sagebrush flats below the mountains' },
  { src: '/IMG_5094.jpg', alt: 'Sunset glow on the peaks above the Mormon Row barn' },
  { src: '/IMG_5093.jpg', alt: 'Looking up at the glowing peaks above the historic barn' },
  { src: '/IMG_5085.jpg', alt: 'Wife and the dog riding with the windows down at sunset' },
  { src: '/IMG_5080.jpg', alt: 'Snapping a photo of the No Camping sign at sunrise' },
  { src: '/IMG_5071.jpg', alt: 'Wrapped in a blanket walking toward the barn at dusk' },
  { src: '/IMG_5072.jpg', alt: 'Walking through the sage as the barn glows at dusk' },
  { src: '/IMG_5036.jpg', alt: 'Alpenglow lighting up the peaks above Mormon Row' },
  { src: '/IMG_5045.jpg', alt: 'Wife wrapped in a blanket heading toward the barn at dusk' },
  { src: '/IMG_5044.jpg', alt: 'Heading toward Mormon Row as the peaks catch the last light' },
  { src: '/IMG_5043.jpg', alt: 'Photographers gathered for sunset at the Mormon Row barn' },
  { src: '/IMG_5034.jpg', alt: 'Pink clouds over the valley at sunset' },
  { src: '/IMG_4985.jpg', alt: 'Cheek to cheek in front of the old barn' },
  { src: '/IMG_4875.jpg', alt: 'Another shot at the park entrance sign with the dog' },
];
