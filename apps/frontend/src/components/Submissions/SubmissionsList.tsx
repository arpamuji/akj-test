import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import type { Submission, CompletenessResult } from '@/types';
import { AlertCircle, RefreshCw, User } from 'lucide-react';

interface SubmissionWithScore extends Submission {
  completeness?: CompletenessResult;
}

export function SubmissionsList() {
  const [submissions, setSubmissions] = React.useState<SubmissionWithScore[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchSubmissions = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.submissions.findAll();

      if (!Array.isArray(data)) {
        setSubmissions([]);
        return;
      }

      const submissionsWithScores = await Promise.all(
        data.map(async (submission: Submission) => {
          try {
            const completeness = await api.submissions.getScore(submission.id);
            return { ...submission, completeness };
          } catch {
            return { ...submission, completeness: undefined };
          }
        })
      );

      setSubmissions(submissionsWithScores);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getWorkTypeBadgeVariant = (
    type: string
  ): 'default' | 'secondary' | 'outline' | 'destructive' => {
    switch (type) {
      case 'remote':
        return 'default';
      case 'hybrid':
        return 'secondary';
      case 'onsite':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Work Type</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-2 w-24 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            <div className="flex items-center justify-between mt-2">
              <span>{error}</span>
              <Button variant="outline" size="sm" onClick={fetchSubmissions}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="w-full max-w-6xl">
        <Alert>
          <User className="h-4 w-4" />
          <AlertTitle>No Submissions</AlertTitle>
          <AlertDescription>
            No career profiles have been submitted yet. Be the first to submit your profile!
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Submitted Profiles</h2>
          <p className="text-muted-foreground">
            {submissions.length} {submissions.length === 1 ? 'submission' : 'submissions'} received
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchSubmissions}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Work Type</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead className="text-right">Completeness</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  <Avatar>
                    <AvatarFallback>{getInitials(submission.fullName)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  <div>{submission.fullName}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(submission.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </TableCell>
                <TableCell>{submission.targetRole}</TableCell>
                <TableCell>
                  <span className="text-sm">
                    {submission.yearsExperience}{' '}
                    {submission.yearsExperience === 1 ? 'year' : 'years'}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {submission.location}
                </TableCell>
                <TableCell>
                  <Badge variant={getWorkTypeBadgeVariant(submission.preferredWorkType)}>
                    {submission.preferredWorkType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {submission.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {submission.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{submission.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {submission.completeness && (
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={submission.completeness.score} className="w-24 h-2" />
                      <span
                        className={`text-sm font-medium ${getScoreColor(submission.completeness.score)}`}
                      >
                        {submission.completeness.score}%
                      </span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {submissions.some((s) => s.completeness && s.completeness.score < 60) && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Incomplete Profiles</AlertTitle>
          <AlertDescription>
            Some profiles have a completeness score below 60%. Consider following up with these
            candidates.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default SubmissionsList;
