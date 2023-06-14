/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'accueil',
        title: 'Accueil',
        type : 'basic',
        icon : 'feather:home',
        link : '/accueil'
    },
    {
        id: 'dashboards',
        title: 'Tableau de bord',
        type: 'basic',
        icon: 'heroicons_outline:view-grid',
        link: '/dashboards'
    },
    {
        id: 'collecte-donnee',
        title: 'Collecte de données',
        type: 'basic',
        icon: 'heroicons_outline:database',
        link: '/collecte-donnee',    
    },
    {
        id: 'gestion-etat',
        title: 'Gestion des etats',
        type: 'basic',
        icon: 'mat_solid:manage_search',
        link: '/gestion-etat',
    },
    {
        id: 'map',
        title: 'Map',
        type: 'basic',
        icon: 'heroicons_outline:map',
        link: '/map',
    },
    {
        id      : 'parametre',
        title   : 'Paramètre',
        type    : 'collapsable',
        icon    : 'feather:settings',
        children: [
            {
                id   : 'motif',
                title: 'Motif',
                type : 'basic',
                link : '/parametrage/motif'
            }
        ]
    },

];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
