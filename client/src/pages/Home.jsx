import Card from '../components/Card';
import { posts } from '../data';


const Home = () => {
  return (
    <div className="home">
        {posts.map(p => (
            <Card key={p.id} post={p} />
        ))}
    </div>
  )
}

export default Home
