import CoursesIcon from './icons/courses.svg';
import {TopLevelCategory} from '../interfaces/page.interface';
import {FirstLevelMenuItem} from '../interfaces/menu.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
    {route: 'courses', name: 'Курсы', icon: <CoursesIcon/>, id: TopLevelCategory.Courses}
];

export const priceUSD = (price: number): string =>
    ('$ ').concat((Math.round(price / 58)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
