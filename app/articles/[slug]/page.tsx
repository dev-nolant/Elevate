import { getPost } from '../../../lib/posts';
import BackOverlay from '../../components/BackOverlay';
import NextOverlay from '../../components/NextOverlay';
import VantaBackground from '../../components/VantaBackground';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { post, nextSlug } = await getPost(params.slug);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Vanta.js Halo Background */}
      <VantaBackground />

      {/* Back Overlay */}
      <BackOverlay />

      {/* Next Overlay */}
      {nextSlug && <NextOverlay nextArticleSlug={nextSlug} />}

      {/* Content */}
      <div className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 max-w-3xl mx-auto">
        {/* Sidebar Key */}
        <div className="mb-8 p-4 bg-blue-100 text-blue-900 rounded-md shadow-md">
          <p className="text-lg font-semibold">Navigation Tips:</p>
          <ul className="list-disc ml-4">
            <li>
              <strong>Left Sidebar:</strong> Hover on the left side to go back to the article selection page.
            </li>
            <li>
              <strong>Right Sidebar:</strong> Hover on the right side to move to the next article.
            </li>
          </ul>
        </div>

        {/* Article Content */}
        <div>
          {/* Featured Image */}
          <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-t-xl mb-8" />

          {/* Centered Post Title */}
          <h1 className="text-4xl font-bold mb-4 text-center">{post.title}</h1>

          {/* Centered Post Date */}
          <p className="text-gray-500 mb-8 text-center">{new Date(post.date).toLocaleDateString()}</p>

          {/* Post Content */}
          <div className="prose prose-lg mx-auto">
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>
        </div>
      </div>
    </div>
  );
}
