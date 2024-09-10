import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import Header from '../../components/Header';
import Info from '../../components/Info';
import Footer from '../../components/Footer';
import { FaShieldAlt } from 'react-icons/fa';
import '../../globals.css';

export default async function PrivacyPage() {
  // Reading and processing the markdown file on the server side
  const filePath = path.join(process.cwd(), 'public', 'privacy-policy.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const processedContent = await remark().use(html).process(fileContents);
  const content = processedContent.toString();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 z-0"></div>

      {/* Header and Info */}
      <Info className="relative top-0 left-0 right-0 z-10 invert" />
      <Header isDarkMode={false} />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden mt-20 mb-32">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white text-center">
            <h1 className="text-4xl md:text-5xl font-semibold flex items-center justify-center">
              <FaShieldAlt className="mr-3" /> Privacy Policy
            </h1>
          </div>
          <div className="prose lg:prose-xl px-8 py-12">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
