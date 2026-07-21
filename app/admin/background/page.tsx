import { requireAdmin } from '@/lib/auth/requireAdmin';
import { PageHeader } from '@/components/admin/PageHeader';
import { BackgroundManager } from './BackgroundManager';
import type { WorkHistory } from '@/lib/types';

export default async function BackgroundAdminPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from('mad_work_history')
    .select('*')
    .order('order_index');

  return (
    <>
      <PageHeader
        title="Background"
        description="The career timeline. Each entry becomes a circle with its year range, role and company logos."
      />
      <BackgroundManager entries={(data as WorkHistory[]) ?? []} />
    </>
  );
}
