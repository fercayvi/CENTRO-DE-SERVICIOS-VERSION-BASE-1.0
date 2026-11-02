import React, { useState } from 'react';
import { NewsItem } from '../types';

interface NewsCoverImageProps {
  news: NewsItem;
  alt?: string;
  className?: string;
}

export function NewsCoverImage({ news, alt = '', className = '' }: NewsCoverImageProps) {
  const [mediaAspect, setMediaAspect] = useState<number | null>(null);
  const frameAspect = 16 / 9;
  const zoom = Math.max(1, (news.imageZoom ?? 100) / 100);
  const baseWidth = mediaAspect && mediaAspect >= frameAspect ? (frameAspect / mediaAspect) * 100 : 100;
  const baseHeight = mediaAspect && mediaAspect < frameAspect ? (frameAspect / mediaAspect) * 100 : 100;
  const cropWidth = baseWidth / zoom;
  const cropHeight = baseHeight / zoom;
  const cropX = ((news.imagePositionX ?? 50) / 100) * Math.max(0, baseWidth - cropWidth);
  const cropY = ((news.imagePositionY ?? 50) / 100) * Math.max(0, baseHeight - cropHeight);
  const translateX = (baseWidth / 2 - cropX - cropWidth / 2) * zoom;
  const translateY = (baseHeight / 2 - cropY - cropHeight / 2) * zoom;

  return (
    <div className={`relative w-full aspect-video overflow-hidden bg-slate-100 ${className}`}>
      <img
        src={news.imageUrl}
        alt={alt}
        draggable={false}
        onLoad={(event) => {
          const image = event.currentTarget;
          if (image.naturalWidth && image.naturalHeight) {
            setMediaAspect(image.naturalWidth / image.naturalHeight);
          }
        }}
        className="absolute left-1/2 top-1/2 max-w-none max-h-none"
        style={{
          width: mediaAspect && mediaAspect >= frameAspect ? `${(mediaAspect / frameAspect) * 100}%` : '100%',
          height: mediaAspect && mediaAspect < frameAspect ? `${(frameAspect / mediaAspect) * 100}%` : '100%',
          transform: `translate(calc(-50% + ${translateX}%), calc(-50% + ${translateY}%)) scale(${zoom})`,
          transformOrigin: 'center',
          visibility: mediaAspect ? 'visible' : 'hidden',
        }}
      />
    </div>
  );
}
