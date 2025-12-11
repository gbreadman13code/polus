export interface SceneConfig {
  id: string;
  panorama: string;
  name: string;
  thumbnail?: string; // NEW: thumbnail for modal
  defaultYaw?: string; // e.g. '1.2345rad'
  defaultPitch?: string; // e.g. '-0.1234rad'
  links: Array<{ nodeId: string; position: { yaw: number; pitch: number } }>;
  markers: Array<any>;
  audio?: string; // URL to audio track
  video?: string; // URL to video
  gallery?: string[]; // Array of image URLs
}

export interface VariantConfig {
  id: string;
  name: string;
  thumbnail: string;
  scenes: SceneConfig[];
}

export interface LocationGroup {
  id: string;
  name: string;
  icon: string; // SVG icon identifier
  scenes?: SceneConfig[]; // For backward compatibility / simple groups
  variants?: VariantConfig[]; // For groups with variants
  defaultVariantId?: string;
}

// Location groups for navigation
export const locationGroups: LocationGroup[] = [
  {
    id: 'vostochniy',
    name: 'Карьер «Восточный»',
    icon: 'courtyard',
    scenes: [
      {
        id: 'vostochniy_zoom',
        panorama: 'assets/rooms/vostochniy/vostochniy_zoom.jpg',
        name: 'Карьер «Восточный»',
        defaultYaw: '2.7029rad', 
        defaultPitch: '-0.1194rad',
        audio: 'assets/audio/vostochniy.mp3',
        links: [ { nodeId: 'vostochniy_burovaya', position: { yaw: 2.3397, pitch: -0.5473 } },
          { nodeId: 'doroga-s-samosvalami', position: { yaw: 2.1534, pitch: 0.0603 } },
          { nodeId: 'samosval', position: { yaw: 3.0775, pitch: -0.3529 } },
          { nodeId: 'zaboy', position: { yaw: 3.4947, pitch: -0.3371 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/vostochniy.png',
          },
          position: { yaw: 2.8780, pitch: 0.1310 }
        },
      ],
      },
      {
        id: 'vostochniy_burovaya',
        panorama: 'assets/rooms/vostochniy/vostochniy_burovaya.jpg',
        name: 'Буровой участок',
        defaultYaw: '6.1245rad', defaultPitch: '-0.3951rad',
        audio: 'assets/audio/burovaya.mp3',
        links: [ { nodeId: 'samosval', position: { yaw: 5.9877, pitch: -0.0974 } },
          { nodeId: 'zaboy', position: { yaw: 0.1027, pitch: -0.0760 } },
          { nodeId: 'doroga-s-samosvalami', position: { yaw: 4.5532, pitch: 0.2144 } },
          { nodeId: 'vostochniy_zoom', position: { yaw: 2.2544, pitch: 0.3422 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/burovaya.png',
          },
          position: { yaw: 6.1245, pitch: -0.3951 }
        }],
      },
      {
        id: 'samosval',
        panorama: 'assets/rooms/vostochniy/samosval.jpg',
        name: 'Карьерный автосамосвал',
        audio: 'assets/audio/samosval.mp3',
        defaultYaw: '6.2729rad', defaultPitch: '0.1892rad',
        links: [ { nodeId: 'zaboy', position: { yaw: 1.6687, pitch: -0.0341 } },
          { nodeId: 'vostochniy_burovaya', position: { yaw: 3.6131, pitch: 0.0324 } },
          { nodeId: 'doroga-s-samosvalami', position: { yaw: 4.3468, pitch: 0.1736 } },
          { nodeId: 'vostochniy_zoom', position: { yaw: 2.9022, pitch: 0.3611 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/samosval.png',
          },
          position: { yaw: 6.2729, pitch: 0.1892 }
        }],
      },
      {
        id: 'doroga-s-samosvalami',
        panorama: 'assets/rooms/vostochniy/doroga-s-samosvalami.jpg',
        name: 'Подъёмный участок',
        defaultYaw: '6.2384rad', defaultPitch: '-0.1465rad',
        gallery: ['assets/photos/doroga-s-samosvalami/1.png', 'assets/photos/doroga-s-samosvalami/2.png', 'assets/photos/doroga-s-samosvalami/3.png'],
        links: [ { nodeId: 'vostochniy_zoom', position: { yaw: 4.4692, pitch: -0.0052 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/podjemniy.png',
          },
          position: { yaw: 6.2384, pitch: -0.1465 }
        }],
      },
      {
        id: 'zaboy',
        panorama: 'assets/rooms/vostochniy/zaboy.jpg',
        name: 'Забой',
        audio: 'assets/audio/zaboy.mp3',
        defaultYaw: '0.2553rad', defaultPitch: '-0.4055rad',
        links: [ { nodeId: 'samosval', position: { yaw: 3.2730, pitch: -0.2589 } },
          { nodeId: 'vostochniy_burovaya', position: { yaw: 2.3852, pitch: -0.0934 } },
          { nodeId: 'doroga-s-samosvalami', position: { yaw: 3.0363, pitch: 0.1441 } },
          { nodeId: 'vostochniy_zoom', position: { yaw: 1.6953, pitch: 0.1724 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/zaboy.png',
          },
          position: { yaw: 0.2553, pitch: -0.4055 }
        }],
      },
    ],
  },
  {
    id: 'blagodatniy',
    name: 'Карьер «Благодатный»',
    icon: 'rooms',
    scenes: [
      {
        id: 'blagodatniy-1',
        panorama: 'assets/rooms/blagodatniy/blagodatniy.jpg',
        name: 'Карьер «Благодатный»',
        defaultYaw: '0.0330rad', defaultPitch: '-0.0111rad',
        links: [],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/blagodatniy.png',
          },
          position: { yaw: 0.0330, pitch: -0.0111 }
        }],
      },
    ],
  },
  {
    id: 'centre',
    name: 'Центр управления карьером',
    icon: 'views',
    scenes: [
      {
        id: 'centre-1',
        panorama: 'assets/rooms/centre/centre.jpg',
        name: 'Главный пункт управления',
        defaultYaw: '0.3068rad', defaultPitch: '0.0753rad',
        links: [ { nodeId: 'op-1', position: { yaw: 2.1322, pitch: 0.0368 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/centre.png',
          },
          position: { yaw: 0.3346, pitch: 0.2202 }
        }],
      },
      {
        id: 'op-1',
        panorama: 'assets/rooms/centre/op-1.jpg',
        name: 'Операторская 1',
        defaultYaw: '0.0316rad', defaultPitch: '0.0735rad',
        links: [ { nodeId: 'op-2', position: { yaw: 3.2376, pitch: 0.0241 } },
          { nodeId: 'op-3', position: { yaw: 1.6011, pitch: 0.0250 } },
          { nodeId: 'centre-1', position: { yaw: 0.9939, pitch: 0.0316 } }
         ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/op-1.png',
          },
          position: { yaw: 0.0316, pitch: 0.0735 }
        }],
      },
      {
        id: 'op-2',
        panorama: 'assets/rooms/centre/op-2.jpg',
        name: 'Операторская 2',
        defaultYaw: '4.5212rad', defaultPitch: '0.1023rad',
        links: [ { nodeId: 'op-1', position: { yaw: 1.3224, pitch: -0.1473 } },
          
         ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/op-2.png',
          },
          position: { yaw: 4.5212, pitch: 0.1023 }
        }],
      },
      {
        id: 'op-3',
        panorama: 'assets/rooms/centre/op-3.jpg',
        name: 'Операторская 3',
        defaultYaw: '2.2494rad', defaultPitch: '0.1907rad',
        links: [ { nodeId: 'op-1', position: { yaw: 4.6161, pitch: -0.0616 } },
          { nodeId: 'op-2', position: { yaw: 3.9988, pitch: -0.0313 } }
         ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/op-3.png',
          },
          position: { yaw: 2.2494, pitch: 0.1907 }
        }],
      },
    ],
  },
  {
    id: 'living-complex',
    name: 'Вахтовый жилой комплекс',
    icon: 'views',
    scenes: [
      {
        id: 'poselok',
        panorama: 'assets/rooms/living-complex/poselok.jpg',
        name: 'Поселок',
        gallery: ['assets/photos/poselok/poselok1.png', 'assets/photos/poselok/poselok2.png', 'assets/photos/poselok/poselok3.png'],
        audio: 'assets/audio/poselok.mp3',
        defaultYaw: '0.5631rad', 
        defaultPitch: '-0.1106rad',
        links: [ { nodeId: 'ksk', position: { yaw: 0.0685, pitch: 0.0514 } }, 
          { nodeId: 'stolovaya-1', position: { yaw: 0.0051, pitch: -0.5787 } },
          { nodeId: 'stolovaya-2', position: { yaw: 0.4315, pitch: -0.1068 } },
          { nodeId: 'pamyatnik', position: { yaw: 1.0536, pitch: -0.0510 } },
          
         ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/poselok.png',
          },
          position: { yaw: 0.6311, pitch: -0.4120 }
        }],
      },
      {
        id: 'ksk',
        panorama: 'assets/rooms/living-complex/ksk.jpg',
        name: 'Культурно спортивный комплекс',
        defaultYaw: '6.1887rad', defaultPitch: '-0.1754rad',
        links: [ { nodeId: 'sportzal', position: { yaw: 5.9055, pitch: -0.4681 } },
          { nodeId: 'poselok', position: { yaw: 4.6868, pitch: 0.0283 } }
         ],
        markers: [],
      },
      {
        id: 'sportzal',
        panorama: 'assets/rooms/living-complex/sportzal.jpg',
        name: 'Спортзал',
        audio: 'assets/audio/ksk.mp3',

        defaultYaw: '6.2702rad', defaultPitch: '-0.3748rad',
        gallery: ['assets/photos/poselok/zal1.png', 'assets/photos/poselok/zal2.png', 'assets/photos/poselok/zal3.png'],
        links: [ { nodeId: 'ksk', position: { yaw: 0.6865, pitch: -0.1667 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/zal.png',
          },
          position: { yaw: 6.2702, pitch: -0.3748 }
        }],
      },
      {
        id: 'stolovaya-1',
        panorama: 'assets/rooms/living-complex/stolovaya-1.jpg',
        name: 'Столовая 1',
        audio: 'assets/audio/stolovaya.mp3',
        defaultYaw: '6.1407rad', defaultPitch: '0.0856rad',
        gallery: ['assets/photos/poselok/stolovaya1.png', 'assets/photos/poselok/stolovaya2.png', 'assets/photos/poselok/stolovaya3.png'],
        links: [ { nodeId: 'poselok', position: { yaw: 1.2802, pitch: 0.0496 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/stolovaya.png',
          },
          position: { yaw: 6.1385, pitch: 0.1130 }
        }],
      },
      {
        id: 'stolovaya-2',
        panorama: 'assets/rooms/living-complex/stolovaya-2.jpg',
        name: 'Столовая 2',
        audio: 'assets/audio/stolovaya.mp3',
        defaultYaw: '5.8891rad', defaultPitch: '0.0966rad',
        gallery: ['assets/photos/poselok/stolovaya4.png', 'assets/photos/poselok/stolovaya5.png', 'assets/photos/poselok/stolovaya6.png'],
        links: [ { nodeId: 'poselok', position: { yaw: 0.6396, pitch: -0.0234 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/stolovaya.png',
          },
          position: { yaw: 5.8891, pitch: 0.0966 }
        }],
      },
      {
        id: 'pamyatnik',
        panorama: 'assets/rooms/living-complex/pamyatnik.jpg',
        name: 'Памятник',
        defaultYaw: '0.0948rad', defaultPitch: '-0.1752rad',
        links: [ { nodeId: 'poselok', position: { yaw: 1.5737, pitch: 0.1201 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/pamyatnik.png',
          },
          position: { yaw: 0.0948, pitch: -0.1752 }
        }],
      },
    ],
  },
  {
    id: 'zif',
    name: 'Золотоизвлекательная фабрика',
    icon: 'views',
    scenes: [
      {
        id: 'zif-1',
        panorama: 'assets/rooms/zif/zif.jpg',
        name: 'Отделение рудоподготовки',
        defaultYaw: '0.6650rad', defaultPitch: '-0.0185rad',
        gallery: ['assets/photos/zif/zif1.png', 'assets/photos/zif/zif2.png', 'assets/photos/zif/zif3.png'],
        links: [ { nodeId: 'bio', position: { yaw: 0.0880, pitch: -0.0273 } },
          { nodeId: 'plavilnoe', position: { yaw: 1.1942, pitch: 0.0400 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/zif.png',
          },
          position: { yaw: 0.6650, pitch: -0.0185 }
        }],
      },
      {
        id: 'bio',
        panorama: 'assets/rooms/zif/bio.jpg',
        name: 'Участок бактериального окисления',
        defaultYaw: '6.2023rad', defaultPitch: '-0.1498rad',
        gallery: ['assets/photos/zif/bio.png', 'assets/photos/zif/bio1.png'],
        links: [ { nodeId: 'zif-1', position: { yaw: 2.3397, pitch: -0.5473 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/bio.png',
          },
          position: { yaw: 6.2023, pitch: -0.1498 }
        }],
      },
      {
        id: 'plavilnoe',
        panorama: 'assets/rooms/zif/plavilnoe.jpg',
        name: 'Плавильное отделение',
        defaultYaw: '0.3497rad', defaultPitch: '-0.0144rad',
        gallery: ['assets/photos/zif/plavilniy1.png', 'assets/photos/zif/plavilniy2.png', 'assets/photos/zif/plavilniy3.png'],
        video: '/assets/videos/2.mp4',
        links: [ { nodeId: 'zif-1', position: { yaw: 1.4957, pitch: 0.0752 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/plavilniy.png',
          },
          position: { yaw: 0.3497, pitch: -0.0144 }
        }],
      },
    ],
  },
  {
    id: 'service',
    name: 'Сервисно-ремонтный комплекс',
    icon: 'views',
    scenes: [
      {
        id: 'service-1',
        panorama: 'assets/rooms/service/ps-ulica.jpg',
        name: 'Питстоп',
        defaultYaw: '0.0390rad', defaultPitch: '0.0867rad',
        links: [ { nodeId: 'moyka-2', position: { yaw: 0.7219, pitch: 0.0780 } },
          { nodeId: 'ps-2', position: { yaw: 5.6155, pitch: 0.0762 } },
          { nodeId: 'angar-3', position: { yaw: 3.4457, pitch: 0.0571 } }
         ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/pitstop.png',
          },
          position: { yaw: 5.8400, pitch: 0.2618 }
        }],
      },
      {
        id: 'ps-2',
        panorama: 'assets/rooms/service/ps-2.jpg',
        name: 'Станция оперативного обслуживания',
        gallery: ['assets/photos/pitstop/pitstop1.png', 'assets/photos/pitstop/pitstop2.png'],
        defaultYaw: '0.5171rad', defaultPitch: '0.1980rad',
        links: [ { nodeId: 'ps-1', position: { yaw: 1.2840, pitch: 0.0456 } },
          { nodeId: 'ps-3', position: { yaw: 0.0423, pitch: 0.0271 } },
          { nodeId: 'service-1', position: { yaw: 4.1903, pitch: -0.0514 } }
         ],
        markers: [],
      },
      {
        id: 'ps-1',
        panorama: 'assets/rooms/service/ps-1.jpg',
        name: 'Вид сзади',
        defaultYaw: '0.0610rad', defaultPitch: '0.4295rad',
        links: [ { nodeId: 'ps-2', position: { yaw: 5.2171, pitch: -0.0759 } } ],
        markers: [],
      },
      {
        id: 'ps-3',
        panorama: 'assets/rooms/service/ps-3.jpg',
        name: 'Вид сбоку',
        defaultYaw: '0.0192rad', defaultPitch: '0.4810rad',
        links: [ { nodeId: 'ps-2', position: { yaw: 1.0522, pitch: -0.1080 } } ],
        markers: [],
      },
      {
        id: 'moyka-2',
        panorama: 'assets/rooms/service/moyka-2.jpg',
        name: 'Моечно-обслуживающий комплекс',
        defaultYaw: '0.6304rad', defaultPitch: '0.1859rad',
        links: [ { nodeId: 'service-1', position: { yaw: 1.3383, pitch: 0.1347 } } ],
        markers: [],
      },
      {
        id: 'kabina',
        panorama: 'assets/rooms/service/kabina.jpg',
        name: 'Кабина',
        defaultYaw: '5.7024rad', defaultPitch: '0.4925rad',
        links: [ { nodeId: 'angar-3', position: { yaw: 6.1862, pitch: -0.3136 } } ],
        markers: [],
      },
      {
        id: 'angar-3',
        panorama: 'assets/rooms/service/angar-3.jpg',
        name: 'Сервисный ангар',
        defaultYaw: '6.1375rad', defaultPitch: '0.4295rad',
        video: '/assets/videos/1.mp4',
        links: [ { nodeId: 'kabina', position: { yaw: 5.7188, pitch: 0.4926 } },
          { nodeId: 'service-1', position: { yaw: 2.1327, pitch: 0.1971 } } ],
        markers: [{
          id: 'info-1',
          data: {
            type: 'info',
            image: 'assets/info/angar.png',
          },
          position: { yaw: 6.1375, pitch: 0.4295 }
        }],
      },
    ],
  },
];

// Default tour config (for backwards compatibility)
// We need to handle the case where the first group might be variant-based
const firstGroup = locationGroups[0];
export const tourConfig: SceneConfig[] = firstGroup.scenes || (firstGroup.variants ? firstGroup.variants[0].scenes : []);
