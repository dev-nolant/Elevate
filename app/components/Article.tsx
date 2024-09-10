import Link from 'next/link';

interface ArticleProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}

const Article = ({ slug, title, date, excerpt, imageUrl }: ArticleProps) => {
  return (
    <Link href={`/articles/${slug}`} legacyBehavior>
      <a className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-60 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-semibold text-black mb-2">
            {title}
          </h2>
          <p className="text-gray-600 mb-4">
            {new Date(date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-gray-700">{excerpt}</p>
        </div>
      </a>
    </Link>
  );
};

export default Article;
