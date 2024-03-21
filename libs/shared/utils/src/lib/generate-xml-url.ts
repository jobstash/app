export const generateXmlUrl = (loc: string, lastmod?: string) =>
  `<url>
		<loc>${loc}</loc>
		${lastmod ? `<lastmod>${lastmod}</lastmod><changefreq>daily</changefreq>` : ''}
		<priority>1.0</priority>
	</url>`;
