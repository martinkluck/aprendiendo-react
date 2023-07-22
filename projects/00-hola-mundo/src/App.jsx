import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';
export function App() {
  // const [name, setName] = useState('midudev');

  const users = [
    {
      userName: 'mgkluck',
      name: 'Martin Gustavo Kluck',
      isFollowing: true,
    },
    {
      userName: 'midudev',
      name: 'Miguel Angel Duran',
      isFollowing: false,
    },
    {
      userName: 'guilloleoz',
      name: 'Guillermo Leoz',
      isFollowing: false,
    },
  ];

  return (
    <section className='App'>
      {users.map((user) => {
        return (
          <TwitterFollowCard
            key={user.userName}
            userName={user.userName}
            initialIsFollowing={user.isFollowing}
          >
            {user.name}
          </TwitterFollowCard>
        );
      })}
    </section>
  );
}
