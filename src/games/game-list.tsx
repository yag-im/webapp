// Used from Games Catalog page -> List of games

'use client';

type GameListProps = React.PropsWithChildren;

export function GameList({ children }: GameListProps) {
  return (
    <ul className="xs:grid-cols-1 grid sm:grid-cols-3 md:grid-cols-5 gap-y-3 gap-x-4">
      {children}
    </ul>
  );
}
