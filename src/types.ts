import React from 'react';

export interface Character {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  isUnlocked: boolean;
}

export interface Feature {
  title: string;
  desc: string;
}

export interface Project {
  id: string;
  title: string;
  titleZh: string;
  navTitle: string;
  navTitleZh: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  video: string;
  characters: Character[];
  features: Feature[];
}
