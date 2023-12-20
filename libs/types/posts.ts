import type { BlogPostFormat, Prisma } from '@prisma/client';
import type { Language } from '$lib/types/languages';

export type Post = {
	id: number;
	enabled: boolean;
	category: Category;
	templateId?: string;
	date: Date;
	modified: Date;
	authors: Author[];
	tags: string[];
	languages: {
		[key: Language["iso"]]: PostTranslation;
	};
};

export type PostTranslation = {
	path: string;
	title: string;
	description: string;
	header: {
		blob: string;
		name: string;
		caption: string;
	};
	keywords: string;
	content?: string | { [key: string]: any }[];
	faq?: Prisma.JsonValue;
	toc?: { [key: string]: any }[];
	places?: {
		items: {
			id: string;
			name: { [x: string]: string };
			coordinates: { lat: number; lon: number };
			type: string;
		}[];
		center: { lat: number; lng: number };
		zoom: number;
	};
	format: 'Markdown' | 'JSON' | 'Unknown' | BlogPostFormat;
};

export type Category = {
	id: string;
	languages: {
		[key: Language["iso"]]: CategoryTranslation;
	};
};

export type CategoryTranslation = {
	path: string;
	name: string;
	description: string;
};

export type Author = {
	id: number;
	name: string;
	url?: string;
};
