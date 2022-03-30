import { Card } from "./components/card/Card";
import { ICard } from "./models/ICard";

const sampleCard: ICard = {
  title: 'Tesla',
  ranks: [7, 10, 4, 9]
}

function App() {
  return (
    <Card card={sampleCard} />
  );
}

export default App;
