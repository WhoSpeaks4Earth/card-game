import { Card } from "./components/card/Card";
import { ICard } from "./models/ICard";

const sampleCard: ICard = {
  title: 'Tesla',
  ranks: [7, 6, 10, 3]
}

function App() {
  return (
    <>
      <Card card={sampleCard} />
    </>
  );
}

export default App;
