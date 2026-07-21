import { requireAdmin } from '@/lib/auth/requireAdmin';
import { PageHeader } from '@/components/admin/PageHeader';
import { ProjectsManager } from './ProjectsManager';
import type { Project } from '@/lib/types';

export default async function ProjectsAdminPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from('mad_projects')
    .select('*')
    .order('order_index');

  return (
    <>
      <PageHeader
        title="Projects"
        description="The card grid on your homepage. Reorder with the arrows; hidden projects stay in this list but disappear from the site."
      />
      <ProjectsManager projects={(data as Project[]) ?? []} />
    </>
  );
}
