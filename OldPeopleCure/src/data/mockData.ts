export type Article = {
  id: string;
  title: string;
  category: string;
  preview: string;
  thumbnail: string;
  content: string;
};

export type Video = {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  category?: string;
};

export type Game = {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  routeName: string;
};

export const mockArticles = [
  {
    id: '1',
    title: '5 Ways to Improve Joint Health',
    category: 'Health',
    preview: 'Learn simple stretches and nutrition tips to keep your joints healthy.',
    thumbnail: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=800&q=80',
    content: 'Keeping your joints healthy is very important as we age. Simple stretches can make a big difference.\n\nFirst, make sure to walk for at least 15 minutes a day. Walking keeps the joints lubricated.\n\nSecond, eat foods rich in Omega-3, like salmon or walnuts. They help reduce inflammation.\n\nFinally, always consult your doctor before starting any new exercise routine. Staying active is the key to feeling good!',
  },
  {
    id: '2',
    title: 'The History of the Telephone',
    category: 'History',
    preview: 'How a simple invention changed the way we communicate forever.',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: 'The telephone was invented by Alexander Graham Bell in 1876. Before the phone, people used telegraphs, which required learning Morse code.\n\nThe first spoken words over a phone were: "Mr. Watson, come here, I want to see you."\n\nTelephones evolved from large wooden boxes to rotary dials, to the smartphones we use today. Communication has never been easier!',
  },
  {
    id: '3',
    title: 'Fun Facts About Space',
    category: 'Science',
    preview: 'Did you know the sun makes up 99% of the solar system?',
    thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=800&q=80',
    content: 'Space is full of amazing wonders.\n\nDid you know that the Sun accounts for 99.86% of the mass in the solar system?\n\nAlso, one million Earths could fit inside the Sun.\n\nAnother fun fact is that the footprints left by astronauts on the Moon will stay there for millions of years because there is no wind to blow them away.',
  },
];

export const mockVideos = [
  {
    id: '1',
    title: 'The Beauty of the Swiss Alps',
    thumbnail: 'https://img.youtube.com/vi/linlz7-Pnvw/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=linlz7-Pnvw',
    category: 'Nature',
  },
  {
    id: '2',
    title: 'The Colors of Costa Rica (4K)',
    thumbnail: 'https://img.youtube.com/vi/LXb3EKWsInQ/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    category: 'Nature',
  },
  {
    id: '3',
    title: 'How Trees Talk to Each Other',
    thumbnail: 'https://img.youtube.com/vi/Un2yBgIAxYs/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=Un2yBgIAxYs',
    category: 'Science',
  },
  {
    id: '4',
    title: 'The Secrets of Deep Sleep',
    thumbnail: 'https://img.youtube.com/vi/5MuIMqhT8DM/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=5MuIMqhT8DM',
    category: 'Health',
  },
  {
    id: '5',
    title: 'Classic Classical Music: Mozart',
    thumbnail: 'https://img.youtube.com/vi/Rb0UmrCXxVA/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=Rb0UmrCXxVA',
    category: 'Arts',
  },
];

export const mockGames: Game[] = [
  {
    id: 'game-1',
    title: 'Sudoku',
    thumbnail: 'https://it.mathworks.com/help/examples/optim/win64/SudokuExample_01.png',
    category: 'Logic',
    routeName: 'Sudoku',
  },
  {
    id: 'game-2',
    title: 'Memory Game',
    thumbnail: 'https://www.calendarclub.ca/cdn/shop/files/689196507342_2.jpg?v=1725971971&width=2048',
    category: 'Memory',
    routeName: 'MemoryGame',
  }
];