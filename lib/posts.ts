import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface Post {
  title: string;
  date: string;
  contentHtml: string;
  imageUrl: string;
  slug: string;
}

export async function getPost(slug: string): Promise<{ post: Post; nextSlug: string | null }> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const postIndex = filenames.findIndex((filename) => filename.replace(/\.md$/, '') === slug);
  const nextFilename = filenames[postIndex + 1] || null;
  const nextSlug = nextFilename ? nextFilename.replace(/\.md$/, '') : null;

  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    post: {
      slug,
      title: data.title,
      date: data.date,
      contentHtml,
      imageUrl: data.imageUrl || '/default-image.jpg',
    },
    nextSlug,
  };
}
