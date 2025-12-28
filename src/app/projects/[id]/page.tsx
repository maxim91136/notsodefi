import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, Badge } from '@/components/ui';
import { ScoreSummary, CriterionRow } from '@/components/scores';
import { NetworkData } from '@/components/data';
import { getProjectById, projects } from '@/lib/data';
import { getCriteriaByCategory } from '@/lib/framework';
import { formatDate } from '@/lib/utils';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.name} - NotSoDeFi.com`,
    description: `Decentralization analysis for ${project.name}. Total Score: ${project.scores.totalScore}/10`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const chainCriteria = getCriteriaByCategory('chain');
  const controlCriteria = getCriteriaByCategory('control');
  const fairnessCriteria = getCriteriaByCategory('fairness');

  const getScoreForCriterion = (criterionId: string) => {
    return project.scores.criterionScores.find((s) => s.criterionId === criterionId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/projects"
          className="text-sm text-white/50 hover:text-white mb-4 inline-block"
        >
          &larr; Back to Projects
        </Link>
        <div className="flex items-start gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">{project.name}</h1>
              {project.symbol && <Badge>{project.symbol}</Badge>}
            </div>
            <p className="mt-2 text-white/60 max-w-2xl">{project.description}</p>
            <p className="mt-2 text-sm text-white/40">
              Last updated: {formatDate(project.lastUpdated)}
            </p>
          </div>
        </div>
      </div>

      {/* Score Summary */}
      <Card className="mb-8">
        <CardContent className="py-8">
          <ScoreSummary scores={project.scores} />
        </CardContent>
      </Card>

      {/* Network Data */}
      <div className="mb-4">
        <NetworkData projectId={project.id} />
      </div>

      {/* Notes */}
      {project.notes && project.notes.length > 0 && (
        <Card className="mb-8 border-yellow-500/20">
          <CardHeader>
            <h2 className="font-semibold text-yellow-400">Notes</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.notes.map((note, i) => (
                <li key={i} className="text-sm text-white/70 flex gap-2">
                  <span className="text-yellow-500">*</span>
                  {note}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chain Score */}
        <Card className="border-blue-500/30">
          <CardHeader>
            <h2 className="font-semibold text-blue-400">Chain Score</h2>
            <p className="text-sm text-white/50">
              Technical/economic decentralization
            </p>
          </CardHeader>
          <CardContent className="space-y-2 p-2">
            {chainCriteria.map((criterion) => (
              <CriterionRow
                key={criterion.id}
                criterion={criterion}
                score={getScoreForCriterion(criterion.id)}
              />
            ))}
          </CardContent>
        </Card>

        {/* Control Score */}
        <Card className="border-purple-500/30">
          <CardHeader>
            <h2 className="font-semibold text-purple-400">Control Score</h2>
            <p className="text-sm text-white/50">Power and control structures</p>
          </CardHeader>
          <CardContent className="space-y-2 p-2">
            {controlCriteria.map((criterion) => (
              <CriterionRow
                key={criterion.id}
                criterion={criterion}
                score={getScoreForCriterion(criterion.id)}
              />
            ))}
          </CardContent>
        </Card>

        {/* Fairness Score */}
        <Card className="border-green-500/30">
          <CardHeader>
            <h2 className="font-semibold text-green-400">Fairness Score</h2>
            <p className="text-sm text-white/50">
              Launch and distribution fairness
            </p>
          </CardHeader>
          <CardContent className="space-y-2 p-2">
            {fairnessCriteria.map((criterion) => (
              <CriterionRow
                key={criterion.id}
                criterion={criterion}
                score={getScoreForCriterion(criterion.id)}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sources */}
      {project.sources && project.sources.length > 0 && (
        <Card className="mt-12">
          <CardHeader>
            <h2 className="font-semibold text-white">Sources</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.sources.map((source, i) => (
                <li key={i}>
                  <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 break-all"
                  >
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
