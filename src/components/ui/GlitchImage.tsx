"use client";

import React from 'react';
import Image from 'next/image';

interface GlitchProps {
    url?: string;
    svgImage?: string;
}

const GlitchImage: React.FC<GlitchProps> = ({ url, svgImage }) => {
    return (
        <div className="relative glitch" data-text="Glitch Image">

            {svgImage && (<Image src={svgImage} alt="Glitch Image" layout="fill" objectFit="contain" className="glitch-img" />)}
            {url &&(<Image src={url} alt="Glitch Image" layout="fill" objectFit="contain" className="glitch-img" />)}
        </div>
    );
};

export default GlitchImage;
