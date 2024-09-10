import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Article from '../components/Article';
import Header from '../components/Header';  // Import the Header component
import Info from '../components/Info';  // Import the Header component
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  date: string;
  contentHtml: string;
  excerpt: string;
  imageUrl: string;
}

async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');

      const { data, content } = matter(fileContents);

      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();

      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title,
        date: data.date,
        contentHtml,
        excerpt: data.excerpt || '',
        imageUrl: data.imageUrl || '/default-image.jpg',
      };
    })
  );

  return posts;
}

export default async function ArticlesPage() {
  const posts = await getPosts();
  const [mainPost, ...morePosts] = posts;

  return (
    <div>
      <Info className="relative top-0 left-0 right-0 z-10 invert" />
      {/* Header Component for Light Theme */}
      <div className="pt-8"> {/* Adjust the padding-top value as needed */}
        {/* Header Component for Light Theme */}
        <Header isDarkMode={false} />  {/* Pass isDarkMode as false for light theme */}
      </div>
      
      {/* Main Content */}
      <div className=" bg-white rounded-sm container mx-auto px-4 py-16">
        <h1 className="text-5xl font-extrabold text-left mb-12 text-black">
          Articles.
        </h1>
        <div className="grid gap-8">
          <div className="mb-16 flex flex-col md:flex-row items-start">
            <Link href={`/articles/${mainPost.slug}`} className="block w-full md:w-1/2 shadow-lg rounded-lg overflow-hidden">
              <img
                src={mainPost.imageUrl}
                alt={mainPost.title}
                className="w-full h-auto object-cover mb-6 md:mb-0"
              />
            </Link>
            <div className="md:w-1/2 md:pl-8">
              <Link href={`/articles/${mainPost.slug}`}>
                <h2 className="text-4xl font-bold text-black mb-4">
                  {mainPost.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {mainPost.date}
                </p>
                <p className="text-lg text-black">
                  {mainPost.excerpt}
                </p>
              </Link>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-black mb-8">
            More Stories
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            {morePosts.map((post) => (
              <Article
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
