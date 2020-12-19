import React from 'react'
import { MdNaturePeople } from 'react-icons/md';

const translation = {
  communications: 'תקשורת',
  highTech: 'הייטק',
  food: 'מזון',
  vehicle: 'רכב',
  textile: 'טקסטיל',
  electronics: 'אלקטרוניקה',
  natureResources: 'משאבי טבע'
}

const IndustryIcons = ({ type }) => {
  const value = Object.keys(translation).find(v => translation[v] === type);

  if (!type) {
    return null;
  }

  switch (value) {
    case ('communications'): return <MdNaturePeople fontSize={24} />;
    case ('food'): return <MdNaturePeople fontSize={24} />;
    case ('vehicle'): return <MdNaturePeople fontSize={24} />;
    case ('textile'): return <MdNaturePeople fontSize={24} />;
    case ('electronics'): return <MdNaturePeople fontSize={24} />;
    case ('natureResources'): return <MdNaturePeople fontSize={24} />;
    case ('highTech'): return <MdNaturePeople fontSize={24} />;
    default: return null;
  }

}

export default IndustryIcons
