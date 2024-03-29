export const dnsTypes = [
  'A',
  'AAAA',
  'CERT',
  'CNAME',
  'DNSKEY',
  'DS',
  'HTTPS',
  'LOC',
  'MX',
  'NAPTR',
  'NS',
  'SMIMEA',
  'SRV',
  'SSHFP',
  'SVCB',
  'TLSA',
  'TXT',
  'URI',
];

export const ttlOptions = {
  '1': {
    'en-US': 'auto', 
    'pt-BR': 'auto',
  },
  '60': {
    'en-US': '1 min',
    'pt-BR': '1 min'
  },
  '120': {
    'en-US': '2 min',
    'pt-BR': '2 min'
  },
  '300': {
    'en-US': '5 min',
    'pt-BR': '5 min'
  },
  '600': {
    'en-US': '10 min',
    'pt-BR': '10 min'
  },
  '900': {
    'en-US': '15 min',
    'pt-BR': '15 min'
  },
  '1800': {
    'en-US': '30 min',
    'pt-BR': '30 min'
  },
  '3600': {
    'en-US': '1 hr',
    'pt-BR': '1 hr'
  },
  '7200': {
    'en-US': '2 hr',
    'pt-BR': '2 hr'
  },
  '18000': {
    'en-US': '5 hr',
    'pt-BR': '5 hr'
  },
  '43200': {
    'en-US': '12 hr',
    'pt-BR': '12 hr'
  },
  '86400': {
    'en-US': '1 day',
    'pt-BR': '1 dia'
  },
}

export const protocolSRV = [
  {
    value: '_tcp',
    label: 'TCP'
  },
  {
    value: '_udp',
    label: 'UDP'
  },
  {
    value: '_tls',
    label: 'TLS'
  }
];

export const digestTypeds = [
  {
    value: '1',
    label: '1 - SHA-1',
  },
  {
    value: '2',
    label: '2 - SHA-256',
  },
  {
    value: '3',
    label: '3 - GOST R 34,11-94',
  },
  {
    value: '4',
    label: '4 - SHA-384',
  }
];

export const directionLat = [
  {
    value: 'N',
    label: 'North'
  },
  {
    value: 'S',
    label: 'South'
  }
];

export const directionLong = [
  {
    value: 'E',
    label: 'East'
  },
  {
    value: 'W',
    label: 'West'
  }
];