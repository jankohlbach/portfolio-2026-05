import { getCollection } from 'astro:content';

const globalsSiteData = await getCollection('globalsSiteData');
const globalsHeader = await getCollection('globalsHeader');
const globalsFooter = await getCollection('globalsFooter');
const globalsPage404 = await getCollection('globalsPage404');

export const siteData = globalsSiteData[0].data;
export const header = globalsHeader[0].data;
export const footer = globalsFooter[0].data;
export const page404 = globalsPage404[0].data;
