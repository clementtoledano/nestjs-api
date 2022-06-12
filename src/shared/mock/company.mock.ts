import userMock from './user.mock';
import codeNafMock from './codeNaf.mock';
import { CompanyEntity } from '../../modules/company/entities/company.entity';

const companyMock: CompanyEntity = {
    // id: faker.datatype.uuid(),
    id: "654987654",
    label: 'Brasserie Malpest',
    description: 'Production de bière artisanale',
    siretNumber: '84777094800028',
    address: '18 rue de la gare',
    city: 'Béziers',
    region: 'Herault',
    zipcode: '34500',
    country: 'France',
    phone: '0651532351',
    // email: faker.internet.email(),
    email: 'aze@aze.azze',
    website: 'www.google.fr',
    facebook: 'www.facebook.fr',
    instagram: 'www.instagram.fr',
    linkedin: 'www.linkedin.fr',
    user: userMock,
    codeNaf: codeNafMock,
};

export default companyMock;