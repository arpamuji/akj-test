import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submissionSchema } from '@akj-test/shared';
import type { SubmissionInput } from '@akj-test/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';

export function SubmissionForm() {
  const navigate = useNavigate();
  const [bioLength, setBioLength] = React.useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      fullName: '',
      targetRole: '',
      yearsExperience: 0,
      skills: [],
      shortBio: '',
      location: '',
      preferredWorkType: 'remote',
    },
  });

  const onSubmit = async (data: SubmissionInput) => {
    try {
      await api.submissions.create(data);
      navigate('/submissions');
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Career Profile Intake</CardTitle>
        <CardDescription>Tell us about your professional background</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="John Doe" {...register('fullName')} />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          {/* Target Role */}
          <div className="space-y-2">
            <Label htmlFor="targetRole">Target Role</Label>
            <Input
              id="targetRole"
              placeholder="Senior Frontend Developer"
              {...register('targetRole')}
            />
            {errors.targetRole && (
              <p className="text-sm text-destructive">{errors.targetRole.message}</p>
            )}
          </div>

          {/* Years of Experience */}
          <div className="space-y-2">
            <Label htmlFor="yearsExperience">Years of Experience</Label>
            <Input
              id="yearsExperience"
              type="number"
              min={0}
              max={50}
              {...register('yearsExperience', { valueAsNumber: true })}
            />
            {errors.yearsExperience && (
              <p className="text-sm text-destructive">{errors.yearsExperience.message}</p>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              placeholder="React, TypeScript, Node.js (comma-separated)"
              onChange={(e) => {
                const skills = e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean);
                setValue('skills', skills);
              }}
            />
            {errors.skills && <p className="text-sm text-destructive">{errors.skills.message}</p>}
          </div>

          {/* Short Bio */}
          <div className="space-y-2">
            <Label htmlFor="shortBio">Short Bio</Label>
            <Textarea
              id="shortBio"
              placeholder="Tell us about yourself..."
              maxLength={500}
              {...register('shortBio')}
              onChange={(e) => {
                setBioLength(e.target.value.length);
                register('shortBio').onChange(e);
              }}
              className="min-h-30"
            />
            <p className="text-xs text-muted-foreground text-right">{bioLength}/500 characters</p>
            {errors.shortBio && (
              <p className="text-sm text-destructive">{errors.shortBio.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Jakarta, Indonesia" {...register('location')} />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location.message}</p>
            )}
          </div>

          {/* Preferred Work Type */}
          <div className="space-y-2">
            <Label>Preferred Work Type</Label>
            <Select
              onValueChange={(value: string | null) => {
                if (value) setValue('preferredWorkType', value as 'remote' | 'hybrid' | 'onsite');
              }}
              defaultValue={watch('preferredWorkType')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select work type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="onsite">Onsite</SelectItem>
              </SelectContent>
            </Select>
            {errors.preferredWorkType && (
              <p className="text-sm text-destructive">{errors.preferredWorkType.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default SubmissionForm;
