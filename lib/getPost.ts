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
}

export async function getPost(slug: string): Promise<Post> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title,
    date: data.date,
    contentHtml,
    imageUrl: data.imageUrl || '/default-image.jpg',
  };
}
