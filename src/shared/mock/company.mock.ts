import userMock from './user.mock';
import companyTypeMock from './company-type.mock';
import { CompanyEntity } from '../../core/company/entities/company.entity';

const companyMock: CompanyEntity = {
    id: '98755642',
    label: 'Brasserie Malpest',
    description: 'Production de bière artisanale',
    siretNumber: '84777094800028',
    address: '18 rue de la gare',
    city: 'Béziers',
    region: 'Herault',
    zipcode: '34500',
    country: 'France',
    phone: '0651532351',
    email: 'malpest@gmail.com',
    website: 'www.google.fr',
    facebook: 'www.facebook.fr',
    instagram: 'www.instagram.fr',
    linkedin: 'www.linkedin.fr',
    user: userMock,
    companyType: companyTypeMock,    
};

export default companyMock;