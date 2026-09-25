import logoMicrosoft from '../assets/logo-microsoft.png'
import logoGoogle from '../assets/logo-google.png'
import logoUpitdc from '../assets/logo-upitdc.jpg'
import logoCivilService from '../assets/logo-civilservice.png'

export type Certification = {
  name: string
  issuer: string
  date: string
  expiry?: string
  url?: string
  note?: string
  logo: string
  featured?: boolean
}

export const certifications: Certification[] = [
  {
    name: 'Microsoft Certified: Data Analyst Associate',
    issuer: 'Microsoft',
    date: 'July 2026',
    expiry: 'August 2027',
    url: 'https://learn.microsoft.com/en-us/users/edwardjonarquiza-2722/transcript/d4rjka0nno1g1yj',
    logo: logoMicrosoft,
    featured: true,
  },
  {
    name: 'Google Data Analytics Professional Certificate',
    issuer: 'Coursera',
    date: 'August 2026',
    url: 'https://www.credly.com/badges/57e34b29-a7ca-423d-b81e-1bbbcbb25092/linked_in_profile',
    logo: logoGoogle,
    featured: true,
  },
  {
    name: 'C# Programming using Microsoft .NET',
    issuer: 'UP System Information Technology Foundation',
    date: 'February 2015',
    logo: logoUpitdc,
  },
  {
    name: 'Career Service Professional Eligibility',
    issuer: 'Civil Service Commission',
    date: 'October 2015',
    expiry: 'January 2036',
    logo: logoCivilService,
  },
]

export const education = {
  school: 'Batangas State University',
  location: 'Batangas, Philippines',
  degree: 'Bachelor of Science in Computer Science',
  year: '2015',
  note: 'Member of Student Council Union as Secretary',
}
