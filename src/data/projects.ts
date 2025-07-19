export interface KeyMetric {
  metric: string;
  value: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  tags: string[];
  caseStudyUrl: string;
  order: number;
  featured: boolean;
  // Extended metadata from case studies
  client?: string;
  role?: string;
  duration?: string;
  team?: string;
  technologies?: string[];
  problemStatement?: string;
  outcome?: string;
  keyMetrics?: KeyMetric[];
  research?: boolean;
  userTesting?: boolean;
  visualDesign?: boolean;
  implementation?: boolean;
}

export const projects: Project[] = [
  {
    id: 'tailorbird',
    title: 'Tailorbird: Demand Generation System',
    subtitle: 'Plan of Record System',
    description: 'A comprehensive Plan of Record system that streamlines the process of planning, tracking, and implementing robotic systems in Amazon fulfillment centers worldwide.',
    thumbnail: '/images/tailorbirdlaptop.svg',
    thumbnailAlt: 'Tailorbird Demand Generation Platform thumbnail',
    tags: ['UX Design', 'Demand Generation', 'Enterprise Software'],
    caseStudyUrl: '/case-studies/tailorbird',
    order: 1,
    featured: true,
    client: 'Amazon Robotics',
    role: 'Lead UX Designer',
    duration: '6 months (Dec 2024 - June 2025)',
    team: '3 Software Engineers, 1 Product Manager, 1 Technical Program Manager, 3 Business Stakeholders',
    technologies: ['Figma', 'Figjam', 'Chime', 'React', 'TypeScript'],
    problemStatement: 'Amazon Robotics faces significant challenges in planning and implementing robotic systems across its global network of fulfillment centers. The current process for creating and managing Plans of Record (PORs) is fragmented across organizations, leading to delays, errors, and communication gaps.',
    outcome: 'Delivered a unified POR management system that achieved 100% task success rate in usability testing, unified 5 fragmented systems, and established scalable foundations for future cross-organizational integration.',
    keyMetrics: [
      { metric: '100%', value: 'task success rate', description: 'in usability testing' },
      { metric: '5', value: 'systems unified', description: 'into single platform' },
      { metric: '75%', value: 'reduction in manual work', description: 'through bulk operations' }
    ],
    research: true,
    userTesting: true,
    visualDesign: true,
    implementation: true
  },
  {
    id: 'egret',
    title: 'Egret: An Operational Planning Application',
    subtitle: 'Operational Planning Platform',
    description: 'A complete UX redesign of an operational planning management tool used to capture forecasted headcount and discretionary spend for organizations within Amazon Robotics.',
    thumbnail: '/images/Egret/laptop.svg',
    thumbnailAlt: 'Egret Operational Planning Platform thumbnail',
    tags: ['UX Design', 'Enterprise Software', 'Operational Planning'],
    caseStudyUrl: '/case-studies/egret',
    order: 2,
    featured: true,
    client: 'Amazon Robotics',
    role: 'Lead UX Designer',
    duration: '8 weeks (2024)',
    team: '3 Software Developers, 1 Business Intelligence Engineer, 2 Product Managers',
    technologies: ['Figma', 'Figjam', 'Chime', 'React', 'AG-Grid'],
    problemStatement: 'In 2023, Egret was launched as a minimum viable product (MVP) to address pressing pain points that were identified during an operational planning (OP) retrospective. However, feedback revealed serious usability issues, with the tool receiving a 2.5 out of 5 net promoter score.',
    outcome: 'Through methodical UX testing and iterative design, we achieved a 76% increase in customer satisfaction (from 2.5 to 4.5), a 22% improvement in task completion times, a 70% decrease in misclicks, and a 10-15% development efficiency gain.',
    keyMetrics: [
      { metric: '76%', value: 'increase in CSAT', description: 'from 2.5 to 4.5' },
      { metric: '22%', value: 'faster task completion', description: 'from 1:49 to 1:25' },
      { metric: '70%', value: 'fewer misclicks', description: 'from 10.44 to 3.17 avg' }
    ],
    research: true,
    userTesting: true,
    visualDesign: true,
    implementation: true
  },
  {
    id: 'egret-2',
    title: 'Egret 2.0: From Workflows to Entities',
    subtitle: 'Entity-Based Redesign',
    description: 'A fundamental redesign of the operational planning tool, shifting from a task-based architecture to an entity-based system that aligns with how planners actually think about their work. (In Progress)',
    thumbnail: '/images/Egret2.0/hceditor2.svg',
    thumbnailAlt: 'Egret 2.0 Entity-Based Redesign thumbnail',
    tags: ['UX Redesign', 'Information Architecture', 'Enterprise Software'],
    caseStudyUrl: '/case-studies/egret-2',
    order: 3,
    featured: true
  },
  {
    id: 'cookie-io',
    title: 'Cookie.IO',
    subtitle: 'AI-Powered Engineering Tool',
    description: 'An AI-powered tool that helps physical systems engineers streamline their workflows through innovative data visualization, cutting months off the product development lifecycle.',
    thumbnail: '/images/cookie IO/laptop.svg',
    thumbnailAlt: 'Cookie.IO project thumbnail',
    tags: ['UX Design', 'Data Visualization', 'AI Integration'],
    caseStudyUrl: '/case-studies/cookie-io',
    order: 4,
    featured: true
  },
  {
    id: 'campus-connect',
    title: 'Campus Connect',
    subtitle: 'Network Monitoring Tool',
    description: 'A network topology and monitoring tool originally designed for a military initiative, now adapted for the UMass system, helping network administrators maintain situational awareness and ensure uninterrupted communication.',
    thumbnail: '/images/campus connect/campusconnectlaptop.svg',
    thumbnailAlt: 'Campus Connect project thumbnail',
    tags: ['UX Design', 'Data Visualization', 'Network Monitoring'],
    caseStudyUrl: '/case-studies/campus-connect',
    order: 5,
    featured: true
  }
];

export const getFeaturedProjects = () => projects.filter(p => p.featured).sort((a, b) => a.order - b.order);
export const getProjectById = (id: string) => projects.find(p => p.id === id);
