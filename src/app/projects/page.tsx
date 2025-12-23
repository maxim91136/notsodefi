import { Card, CardContent, CardHeader } from '@/components/ui';
import { ProjectTable } from '@/components/projects';
import { getProjectsByScore } from '@/lib/data';

export const metadata = {
  title: 'Projects - NotSoDeFi',
  description: 'Compare decentralization scores across blockchain projects.',
};

export default function ProjectsPage() {
  const projects = getProjectsByScore('totalScore', 'desc');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-white/60 max-w-2xl">
          Decentralization scores for major blockchain projects. Click any project
          to see detailed breakdown by criterion.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Leaderboard</h2>
            <span className="text-sm text-white/50">
              {projects.length} projects
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ProjectTable projects={projects} />
        </CardContent>
      </Card>

      <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10">
        <h3 className="font-semibold text-white mb-2">Methodology</h3>
        <p className="text-sm text-white/60">
          Scores are calculated using 10 criteria across 3 categories. Data is
          collected from public sources and updated periodically. This is an
          educational tool, not financial advice.
        </p>
      </div>
    </div>
  );
}
