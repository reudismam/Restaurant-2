import Comment from './Comments';

interface Dish {
    _id: number,
    name: string,
    description: string,
    image: string,
    category: string,
    label: string,
    price: number,
    featured: boolean,
    comments: Comment[]
}

export default Dish;