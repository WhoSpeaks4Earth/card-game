import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../components/card/Card';
import { ICard } from '../models/ICard';
import { CardRanks } from '../components/card/CardRanks';

const sampleCard: ICard = {
    title: 'Tesla',
    ranks: [8, 6, 7, 10],
    isPlayerCard: true
}

test('card renders a title', () => {
  render(<Card card={sampleCard} customStyle={null} />);
  const linkElement = screen.getByText(sampleCard.title);
  expect(linkElement).toBeInTheDocument();
});

test('card ranks render', () => {
    render(<CardRanks ranks={sampleCard.ranks} />);
    const topRank = screen.getByText(sampleCard.ranks[0].toString());
    const rightRank = screen.getByText(sampleCard.ranks[1].toString());
    const bottomRank = screen.getByText(sampleCard.ranks[2].toString());
    expect(topRank).toBeInTheDocument();
    expect(rightRank).toBeInTheDocument();
    expect(bottomRank).toBeInTheDocument();
    expect('A').toBeInTheDocument(); // rank of 10 sould render as 'A'
  });
