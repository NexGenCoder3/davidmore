import type { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'CTO, TechStartup Inc.',
    relationship: 'Client',
    quote: 'David delivered a security audit that uncovered critical vulnerabilities we had missed for months. His attention to detail and clear communication made the entire process seamless.',
  },
  {
    id: '2',
    name: 'Sarah Okonkwo',
    role: 'Lead Developer, SecureNet',
    relationship: 'Colleague',
    quote: 'Working with David on the API Gateway project was exceptional. His Go expertise and security-first mindset resulted in a system handling 50k req/s with zero downtime.',
  },
  {
    id: '3',
    name: 'Michael Torres',
    role: 'Product Manager, CloudOps',
    relationship: 'Client',
    quote: 'The DevOps toolkit David built transformed our deployment pipeline. What used to take hours now takes minutes. Highly recommend for any infrastructure work.',
  },
  {
    id: '4',
    name: 'Amina Bello',
    role: 'Security Researcher',
    relationship: 'CTF Teammate',
    quote: 'David\'s approach to problem-solving in CTF competitions is impressive. He combines deep technical knowledge with creative thinking that consistently puts our team ahead.',
  },
];
