import Link from 'next/link';
import { Card, CardContent } from '@/components/ui';
import { ProjectTable } from '@/components/projects';
import { ApiStatusCard } from '@/components/data';
import { getProjectsByScore } from '@/lib/data';

export const metadata = {
  title: 'Projects - NotSoDeFi.com',
  description: 'Compare decentralization scores across blockchain projects.',
};

export default function ProjectsPage() {
  const projects = getProjectsByScore('totalScore', 'desc');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <p className="text-white/60 max-w-2xl mb-8">
        Decentralization scores for major blockchain projects. Scores are calculated
        using 14 criteria across 3 categories: Chain (technical), Control (governance),
        and Fairness (premine, token concentration, governance control). Projects with admin kill-switches are capped at 1.0.
        Click any project to see the detailed breakdown. This is an educational tool, not financial advice.
      </p>

      <Card>
        <CardContent className="p-0">
          <ProjectTable projects={projects} />
        </CardContent>
      </Card>

      <div className="mt-8">
        <ApiStatusCard />
      </div>
    </div>
  );
}
