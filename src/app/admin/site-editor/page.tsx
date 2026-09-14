import { getSiteContent } from '@/app/actions/cms';
import SiteEditorForm from './SiteEditorForm';

export default async function SiteEditorPage() {
  const data = await getSiteContent();
  
  // Provide defaults if null
  const initialData = data || {
    header: { phone: '' },
    footer: { aboutText: '', email: '', phone: '', address: '' },
    pages: {
      home: {
        hero: { title1: '', title2: '', subtitle: '', image: '' }
      }
    }
  };

  return <SiteEditorForm initialData={initialData} />;
}
