import { useLocation } from 'react-router-dom';
import { pageManifest } from '@/content/siteContent';
import { AboutTemplate, CapabilityDetailTemplate, CapabilityHubTemplate, ContactTemplate, HomeTemplate, InsightArticleTemplate, InsightsHubTemplate, SelectedWorkTemplate, UtilityTemplate } from '@/components/public/templates/PublicTemplates';

const templates={home:HomeTemplate,'capability-hub':CapabilityHubTemplate,capability:CapabilityDetailTemplate,about:AboutTemplate,'insights-hub':InsightsHubTemplate,article:InsightArticleTemplate,work:SelectedWorkTemplate,contact:ContactTemplate,utility:UtilityTemplate};
export default function PublicPage(){const {pathname}=useLocation();const key=pathname==='/'?'/':pathname.endsWith('/')?pathname:`${pathname}/`;const page=pageManifest[key];const Template=templates[page.template];return <Template page={page}/>}
