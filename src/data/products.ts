export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: 79.99,
    image: 'https://picsum.photos/id/1080/300/300',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 149.99,
    image: 'https://picsum.photos/id/119/300/300',
  },
  {
    id: 3,
    name: 'Noise Cancelling Headphones',
    price: 199.99,
    image: 'https://picsum.photos/id/1084/300/300',
  },
  {
    id: 4,
    name: '4K Action Camera',
    price: 299.99,
    image: 'https://picsum.photos/id/250/300/300',
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 89.99,
    image: 'https://picsum.photos/id/1060/300/300',
  },
];
